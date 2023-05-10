import { isr } from './isr.server';
import { createLoad } from './load.server';

export const load = createLoad();

export const config = { isr };
