import zlib from 'zlib';
import { env } from '$env/dynamic/private';
import { dynamoDbClient } from '$lib/aws.server.js';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { error, json } from '@sveltejs/kit';

export async function POST({ request }) {
  const body = await request.json();

  const getPutCommand = (id: string) => {
    return new PutItemCommand({
      TableName: env.AWS_DYNAMODB_TABLE,
      Item: {
        id: { S: id },
        drawing: { B: zlib.gzipSync(JSON.stringify(body.drawing)) },
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
