/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
// import functions from 'firebase-functions'
// import * as logger from 'firebase-functions/logger';
// import express from 'express';
// import { Express, Request, Response } from 'express';
import * as express from "express";
// import axios from "axios";

const app: express.Express = express();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });

export const api = onRequest(app);

// app.get('/', (req: express.Request, ress: express.Response) => {
//   axios.get('https://emojihub.yurace.pro/api/random').then((response) => {
//     ress.status(response.status).send(response.data);
//   });
// });

app.get("/share", (req: express.Request, res: express.Response) => {
  // https://firebasestorage.googleapis.com/v0/b/nervosa-games-dev.appspot.com/o/post-images%2F4do6wz9dszq?alt=media&token=bd41f2bc-b7dc-4c74-8a87-30fc61d6870b
  // https://nervosa.games/news/post?id=25801936-4262-44c8-9164-7827269e9495


let image = (req.query.image as string).split("post-images")[0] + 'post-images' + encodeURIComponent((req.query.image as string).split("post-images")[1])

console.log("IMAGE", image)


  const RENDER_LINK = `<!doctype html>
<html lang="en">

<head>
<meta charset="utf-8">
<title>Post</title>
<base href="/">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="title" property="og:title" content="Nervosa Games" />
<meta name="image" property="og:image" content="${req.query.image}" />
<meta property="og:url" content="${req.query.url}" />
<meta property="og:description" content="Content Description" />
<meta property="og:locale" content="en_GB" />
<meta property="og:type" content="website" />
<meta property="og:image:height" content="885">
<meta property="og:site_name" content="Nervosa Games">
</head>

<body>
<script>
window.onload = (event) => {
// window.location.replace("${req.query.url}");
};
</script>

</body>

</html>`;


  // const id: string = req.query.id as string;
  // res.status(200).send('')
  res.status(200).send(RENDER_LINK);
});

// function createRenderLink(): void {

// }
