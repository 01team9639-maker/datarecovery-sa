"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const baseUrl = process.env.Z2O_TEST_URL;
const allowedOrigin = process.env.Z2O_TEST_ORIGIN;
const mailDirectory = process.env.Z2O_TEST_MAIL_DIR;
const mode = process.env.Z2O_TEST_MODE || "normal";

assert.ok(baseUrl && /^http:\/\/127\.0\.0\.1:\d+$/.test(baseUrl), "Z2O_TEST_URL must be a loopback HTTP origin");
assert.equal(allowedOrigin, baseUrl, "the browser test Origin must equal the loopback server origin");
assert.ok(mailDirectory && path.isAbsolute(mailDirectory), "Z2O_TEST_MAIL_DIR must be absolute");

const endpoint = `${baseUrl}/send.php`;
const validFields = {
  lang: "en",
  website: "",
  name: "Security Test",
  phone: "0500000000",
  email: "security@example.test",
  urgency: "Normal",
  device: "Hard drive (HDD)",
  issue: "Device not detected",
  tried: "No",
  details: "This is a valid automated end-to-end security test.",
};

function messages() {
  return fs.readdirSync(mailDirectory)
    .filter((name) => /^message\.[A-Za-z0-9]+\.eml$/.test(name))
    .sort();
}

async function post(fields, headers = {}) {
  return fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", ...headers },
    body: new URLSearchParams(fields).toString(),
  });
}

async function runNormal() {
  assert.equal(messages().length, 0, "normal integration test requires an empty inbox");

  let response = await post(validFields, { "Sec-Fetch-Site": "cross-site" });
  assert.equal(response.status, 403, "cross-site Fetch Metadata must be rejected");

  response = await post(validFields, { Origin: "https://attacker.example" });
  assert.equal(response.status, 403, "an Origin outside the fixed allowlist must be rejected");

  response = await post({ lang: "en", website: "bot-filled" });
  assert.equal(response.status, 200, "honeypot requests must receive a non-revealing success");

  response = await post({ lang: "en" });
  assert.equal(response.status, 422, "invalid form data must fail validation");

  response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: Buffer.from("lang=en&name=%FF", "ascii"),
  });
  assert.equal(response.status, 400, "invalid UTF-8 must be rejected even without mbstring");

  response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: Buffer.alloc(70_000, 0x61),
  });
  assert.equal(response.status, 413, "an oversized body must be rejected by the PHP and application limits");
  assert.equal(messages().length, 0, "rejected and honeypot requests must not send mail");

  response = await post(validFields, { Origin: allowedOrigin, "Sec-Fetch-Site": "same-origin" });
  assert.equal(response.status, 200, "a legitimate same-origin submission must succeed");
  assert.equal(response.headers.get("x-powered-by"), null, "the HTTP response must not disclose PHP");
  assert.equal(messages().length, 1, "one admitted submission must create exactly one message");

  response = await post(validFields, {
    Origin: allowedOrigin,
    "Sec-Fetch-Site": "same-origin",
    "X-Forwarded-For": "198.51.100.77",
  });
  assert.equal(response.status, 429, "a forged forwarding header must not bypass the REMOTE_ADDR cooldown");
  assert.match(response.headers.get("retry-after") || "", /^\d+$/, "a quota response must carry Retry-After");
  assert.equal(messages().length, 1, "a denied duplicate must not create another message");

  const raw = fs.readFileSync(path.join(mailDirectory, messages()[0]), "utf8");
  assert.doesNotMatch(raw, /^X-Mailer:/im, "mail must not disclose its PHP runtime");
  assert.match(raw, /^Content-Transfer-Encoding:\s*base64$/im, "mail body must use standard base64 MIME encoding");
  const parts = raw.split(/\r?\n\r?\n/, 2);
  assert.equal(parts.length, 2, "captured mail must contain headers and a body");
  const decoded = Buffer.from(parts[1].replace(/\s+/g, ""), "base64").toString("utf8");
  assert.match(decoded, /Name: Security Test/, "decoded message must preserve legitimate form content");
  assert.doesNotMatch(decoded, /(?:User agent|^\s*IP\s*:|198\.51\.100\.77)/im, "message body must not retain client network metadata");
  console.log("PASS: HTTP validation, CSRF defenses, honeypot, UTF-8 rejection, one mail, and non-bypassable 429.");
}

async function runConcurrency() {
  assert.equal(messages().length, 0, "concurrency test requires an empty inbox");
  const attempts = Array.from({ length: 12 }, () => post(validFields, {
    Origin: allowedOrigin,
    "Sec-Fetch-Site": "same-origin",
  }));
  const responses = await Promise.all(attempts);
  assert.equal(responses.filter((response) => response.status === 200).length, 1, "concurrent same-IP HTTP requests must admit exactly one");
  assert.equal(responses.filter((response) => response.status === 429).length, 11, "every concurrent excess request must receive 429");
  assert.equal(messages().length, 1, "concurrent admission must create exactly one mail side effect");
  console.log("PASS: 12 simultaneous HTTP requests produced one admission, eleven 429 responses, and one message.");
}

async function runMailFailure() {
  assert.equal(messages().length, 0, "mail-failure test requires an empty inbox");
  let response = await post(validFields, { Origin: allowedOrigin, "Sec-Fetch-Site": "same-origin" });
  assert.equal(response.status, 500, "a failed mail transport must be reported as 500");
  response = await post(validFields, { Origin: allowedOrigin, "Sec-Fetch-Site": "same-origin" });
  assert.equal(response.status, 429, "a mail failure must not roll back its atomic quota reservation");
  assert.equal(messages().length, 0, "a failing transport must not produce a captured message");
  console.log("PASS: mail failure returned 500 and retained its pre-mail reservation for the following 429.");
}

async function runStateCorruption() {
  const stateDirectory = process.env.Z2O_TEST_STATE_DIR;
  assert.ok(stateDirectory && path.isAbsolute(stateDirectory), "state-corruption mode requires Z2O_TEST_STATE_DIR");
  assert.equal(messages().length, 0, "state-corruption test requires an empty inbox");
  let response = await post(validFields, { Origin: allowedOrigin, "Sec-Fetch-Site": "same-origin" });
  assert.equal(response.status, 200, "the initial state-corruption setup submission must succeed");
  assert.equal(messages().length, 1, "setup must create exactly one message");
  fs.writeFileSync(path.join(stateDirectory, "state.json"), "{broken-json", { mode: 0o600 });
  response = await post({ ...validFields, name: "Second Security Test" }, { Origin: allowedOrigin, "Sec-Fetch-Site": "same-origin" });
  assert.equal(response.status, 503, "corrupt limiter state must fail closed through the HTTP handler");
  assert.equal(response.headers.get("retry-after"), "60", "fail-closed HTTP responses must carry Retry-After 60");
  assert.equal(messages().length, 1, "corrupt state must not reset quota or send another message");
  console.log("PASS: corrupt persisted state produced HTTP 503, Retry-After 60, and no extra mail.");
}

const runners = {
  normal: runNormal,
  concurrency: runConcurrency,
  "mail-failure": runMailFailure,
  "state-corruption": runStateCorruption,
};
assert.ok(runners[mode], `unknown Z2O_TEST_MODE: ${mode}`);
runners[mode]().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
