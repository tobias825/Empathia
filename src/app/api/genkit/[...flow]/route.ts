/**
 * @fileoverview This file is the API route for all Genkit flows.
 */

import {genkitNextHandler} from '@genkit-ai/next';

export const {GET, POST} = genkitNextHandler();
