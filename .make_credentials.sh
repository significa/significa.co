#!/usr/bin/env bash

mkdir ~/.aws

cat > ~/.aws/credentials << EOL
[production]
aws_access_key_id = ${PRODUCTION_ACCESS_KEY}
aws_secret_access_key = ${PRODUCTION_SECRET}
[staging]
aws_access_key_id = ${STAGING_ACCESS_KEY}
aws_secret_access_key = ${STAGING_SECRET}
EOL