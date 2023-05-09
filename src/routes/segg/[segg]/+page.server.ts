import zlib from 'zlib';
import { isValidDrawing } from '$components/draw-your-segg/types.js';
import { env } from '$env/dynamic/private';
import { dynamoDbClient } from '$lib/aws.server.js';
import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
  if (!params.segg) {
    throw error(400, 'Not found');
  }

  try {
    const { Item } = await dynamoDbClient.send(
      new GetItemCommand({
        TableName: env.AWS_DYNAMODB_TABLE,
        Key: {
          id: { S: params.segg }
        }
      })
    );

    if (!Item || !Item.drawing.B) throw error(404, 'Not found');

    const drawing = JSON.parse(zlib.gunzipSync(Item.drawing.B).toString());

    if (!isValidDrawing(drawing)) throw new Error('Invalid drawing');

    return { drawing };
  } catch (err) {
    console.error(err);
    throw error(404, 'Not found');
  }
};
