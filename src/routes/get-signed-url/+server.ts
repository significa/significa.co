import { env } from '$env/dynamic/private';
import { s3Client } from '$lib/aws.server';
import { getFileExtension } from '$lib/utils/strings';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { error, text } from '@sveltejs/kit';

/** Matches the CRM's per-submission attachment limit. */
const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

export const GET = async ({ url }) => {
  const type = url.searchParams.get('type');
  const name = url.searchParams.get('name');
  const size = url.searchParams.get('size');

  if (!type || !name || !size) {
    throw error(400, 'Missing required query params');
  }

  const contentLength = Number(size);
  if (!Number.isInteger(contentLength) || contentLength <= 0 || contentLength > MAX_UPLOAD_BYTES) {
    throw error(400, 'Invalid file size');
  }

  const uuid = crypto.randomUUID();
  const signedUrl = await getSignedUrl(
    s3Client,
    new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: `${uuid}.${getFileExtension(name)}`,
      ContentType: type,
      // signed into the URL, so S3 rejects a PUT of any other size
      ContentLength: contentLength
    })
  );

  return text(signedUrl);
};
