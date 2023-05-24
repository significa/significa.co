import zlib from 'zlib';
import { env } from '$env/dynamic/private';
import { dynamoDbClient } from '$lib/aws.server.js';
import { PutItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { error } from '@sveltejs/kit';

export const createOrUpdateDrawing = async (drawing: unknown, id?: string) => {
  id = id || crypto.randomUUID();

  const payload = {
    TableName: env.AWS_DYNAMODB_TABLE,
    Item: {
      id: { S: id },
      drawing: { B: zlib.gzipSync(JSON.stringify(drawing)) },
      created_at: { S: new Date().toISOString() },
      // `is_deleted` is a hack, to workaround Dynamo's GSI
      // TODO: find an alternative or migrate away from Dynamo
      is_deleted: { S: 'false' }
    }
  };

  await dynamoDbClient.send(new PutItemCommand(payload));

  return id;
};

export const getDrawing = async (id: string) => {
  const { Item } = await dynamoDbClient.send(
    new GetItemCommand({
      TableName: env.AWS_DYNAMODB_TABLE,
      Key: {
        id: { S: id }
      }
    })
  );

  if (!Item || !Item.drawing.B) throw error(404, 'Not found');

  return JSON.parse(zlib.gunzipSync(Item.drawing.B).toString());
};
