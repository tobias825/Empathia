/**
 * @fileoverview This file is the API route for all Genkit flows.
 */

import {genkitNextHandler} from '@genkit-ai/next/server';

export const {GET, POST} = genkitNextHandler();
