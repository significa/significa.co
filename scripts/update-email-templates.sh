#!/bin/bash

set -e

if [[ -z "$MAILCHIMP_API_KEY" ]]; then
    echo "ERROR: 'MAILCHIMP_API_KEY' env var is required!"
    exit 1
fi

REGION=$(echo "$MAILCHIMP_API_KEY" | tail -c 5)

function get_email_template {
    local template_id=$1

    curl --silent --request POST \
    --url "https://${REGION}.api.mailchimp.com/2.0/templates/info" \
    --data "{
        \"apikey\": \"$MAILCHIMP_API_KEY\",
        \"template_id\": \"$template_id\"
    }" | jq -r '.source'
}

function update_email_template {
    local template_id=$1
    local template_path=$2
    
    echo "Updating $template_path with email template #$template_id"
    get_email_template "$template_id" > "$template_path"

    echo "Formatting $template_path"
    npx prettier --write "$template_path"
}

update_email_template 10026505 ./src/lib/mail/template.html
update_email_template 10026509 ./src/lib/mail/template-minimal.html

echo "Done!"