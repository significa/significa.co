import { env } from '$env/dynamic/private';
import { s3Client } from '$lib/aws.server';
import { getFileExtension } from '$lib/utils/strings';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { error, text } from '@sveltejs/kit';

export const GET = async ({ url }) => {
  const type = url.searchParams.get('type');
  const name = url.searchParams.get('name');
  const size = url.searchParams.get('size');

  if (!type || !name || !size) {
    throw error(400, 'Missing required query params');
  }

  try {
    const uuid = crypto.randomUUID();
    const url = await getSignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: env.AWS_S3_BUCKET,
        Key: `${uuid}.${getFileExtension(name)}`,
        ContentType: type
      })
    );

    return text(url);
  } catch (err) {
    throw error(500, 'Could not get signed URL');
  }
};
