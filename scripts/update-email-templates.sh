#!/bin/bash

if [[ -z "$MAILCHIMP_API_KEY" ]]; then
    echo "ERROR: 'MAILCHIMP_API_KEY' env var is required!"
    exit 1
fi

REGION=$(echo "$MAILCHIMP_API_KEY" | tail -c 5)

function get_email_template {
    local template_id=$1

    echo "Retrieving email template #$template_id"

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
    
    get_email_template "$template_id" > "$template_path"
    echo "Updated $template_path with email template #$template_id"

    npx prettier --write "$template_path"
    echo "Formatted $template_path"
}

update_email_template 10026505 ./src/lib/mail/template.html
update_email_template 10026509 ./src/lib/mail/template-minimal.html

echo "Done!"