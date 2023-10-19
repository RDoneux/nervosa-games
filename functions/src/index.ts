/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from 'firebase-functions/v2/https';
// import functions from 'firebase-functions'
// import * as logger from 'firebase-functions/logger';
// import express from 'express';
// import { Express, Request, Response } from 'express';
import * as express from 'express';
import axios from 'axios';

const app: express.Express = express();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });

export const api = onRequest(app);

app.get('/', (req: express.Request, ress: express.Response) => {
  axios.get('https://emojihub.yurace.pro/api/random').then((response) => {
    ress.status(response.status).send(response.data);
  });
});
