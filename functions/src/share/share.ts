
import {Request, Response} from "express";

export function createShareLink(req: Request, res: Response): void {
  const RENDER_LINK = /* html*/`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>${req.query.title}</title>
        <base href="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" property="og:title" content="${req.query.title}" />
        <meta name="image" property="og:image" content="${req.query.image}" />
        <meta property="og:url" content="${req.query.url}" />
        <meta property="og:description" content="${req.query.subTitle}" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:image:height" content="885" />
        <meta property="og:site_name" content="Nervosa Games" />
      </head>

      <body>
        <script>
          window.onload = (event) => {
            window.location.replace('${req.query.url}');
          };
        </script>
      </body>
    </html>`;
  res.status(200).send(RENDER_LINK);
}
