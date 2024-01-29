import { SLACK_WEBHOOK_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { title, client } = await request.json();

  let response;

  try {
    response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify({
        text: `Proposal ${title} accepted by ${client} on ${new Date().toLocaleString()}.`
      })
    });
  } catch (error) {
    console.error(error);
  }
  return json(response);
}
