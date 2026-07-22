#!/bin/sh
set -eu
umask 077

: "${Z2O_TEST_MAIL_DIR:?Z2O_TEST_MAIL_DIR must name the private test inbox}"
case "$Z2O_TEST_MAIL_DIR" in
  /*) ;;
  *) echo "Refusing a non-absolute test inbox path" >&2; exit 1 ;;
esac

delay=${Z2O_TEST_MAIL_DELAY:-0}
case "$delay" in
  0) ;;
  1|2|3|4|5) sleep "$delay" ;;
  *) echo "Refusing an invalid test mail delay" >&2; exit 1 ;;
esac

message=$(mktemp "$Z2O_TEST_MAIL_DIR/message.XXXXXX.eml")
cat > "$message"
