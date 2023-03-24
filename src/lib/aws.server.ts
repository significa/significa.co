import { env } from '$env/dynamic/private';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { SESClient } from '@aws-sdk/client-ses';

export const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY
  }
});

export const sesClient = new SESClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY
  }
});

export const uploadFile = async (file: File) => {
  const uuid = crypto.randomUUID();
  const filename = `${uuid}-${file.name}`;
  await s3Client.send(
    new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: filename,
      ContentType: file.type,
      Body: (await file.arrayBuffer()) as Uint8Array
    })
  );

  return `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${filename}`;
};
