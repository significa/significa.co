#!/bin/sh

set -e

if [ -z "$AWS_S3_PATH" ]; then
  echo "AWS_S3_PATH is not set. Quitting."
  exit 1
fi

if [ -z "$AWS_ACCESS_KEY_ID" ]; then
  echo "AWS_ACCESS_KEY_ID is not set. Quitting."
  exit 1
fi

if [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  echo "AWS_SECRET_ACCESS_KEY is not set. Quitting."
  exit 1
fi

if [ -z "$AWS_REGION" ]; then
  echo "AWS_REGION is not set. Quitting."
  exit 1
fi

if [ -z "$DEST_DIR" ]; then
  DEST_DIR="."
fi

aws configure --profile download <<-EOF > /dev/null 2>&1
${AWS_ACCESS_KEY_ID}
${AWS_SECRET_ACCESS_KEY}
${AWS_REGION}
text
EOF

sh -c "aws s3 cp ${AWS_S3_PATH} ${DEST_DIR} \
              --recursive $*"
sh -c "chmod -R 777 ${DEST_DIR}"
