#!/bin/bash

if [[ -z "$MAILCHIMP_API_KEY" ]]; then
    echo "ERROR: 'MAILCHIMP_API_KEY' env var is required!"
    exit 1
fi

REGION=$(echo "$MAILCHIMP_API_KEY" | tail -c 5)

function get_email_template() {
    TEMPLATE_ID=$1

    curl --silent --request POST \
    --url "https://${REGION}.api.mailchimp.com/2.0/templates/info" \
    --data "{
        \"apikey\": \"$MAILCHIMP_API_KEY\",
        \"template_id\": \"$TEMPLATE_ID\"
    }" | jq -r '.source'
}

get_email_template 10026505 > ./src/lib/mail/template.html
get_email_template 10026509 > ./src/lib/mail/template-minimal.html

echo "Done!"