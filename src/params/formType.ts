import { isFormType } from '$components/contact-form.svelte';
import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
  return isFormType(param);
}) satisfies ParamMatcher;
