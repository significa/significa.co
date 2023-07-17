import { text } from '@sveltejs/kit';

export const GET = async () => {
  return text('OK');
};
