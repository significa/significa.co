import { env } from '$env/dynamic/private';
import { dynamoDbClient } from '$lib/aws.server.js';
import { PutItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { error, json } from '@sveltejs/kit';

export async function POST({ request }) {
  const body = await request.json();

  const getPutCommand = (id: string) => {
    return new PutItemCommand({
      TableName: env.AWS_DYNAMODB_TABLE,
      Item: {
        id: { S: id },
        drawing: { S: JSON.stringify(body.drawing) },
        created_at: { S: new Date().toISOString() }
      }
    });
  };

  try {
    const id = body.id || crypto.randomUUID();
    dynamoDbClient.send(getPutCommand(id));
    return json(id);
  } catch (err) {
    console.error(err);
    throw error(422);
  }
}

export async function GET({ url }) {
  const id = url.searchParams.get('id');

  if (!id) throw error(400, 'Missing id');

  const getGetCommand = (id: string) => {
    return new GetItemCommand({
      TableName: env.AWS_DYNAMODB_TABLE,
      Key: {
        id: { S: id }
      }
    });
  };

  try {
    const { Item } = await dynamoDbClient.send(getGetCommand(id));
    if (!Item) throw error(404, 'Not found');
    return json({
      id: Item.id.S,
      drawing: Item.drawing.S,
      created_at: Item.created_at.S
    });
  } catch (err) {
    console.error(err);
    throw error(404, 'Not found');
  }
}
