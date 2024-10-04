# Exit if a command fails
set -e

rm -rf .local-ssl
mkdir .local-ssl


openssl req -x509 -newkey rsa:4096 -keyout .local-ssl/components.key -out .local-ssl/components.cert -days 9999 -nodes -subj /CN=127.0.0.1 