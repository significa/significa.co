import { isr } from '../../[...path]/isr.server';
import { createLoad } from '../../[...path]/load.server';

export const load = createLoad('handbook/');

export const config = { isr };
