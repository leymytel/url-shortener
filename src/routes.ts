import express from "express";
import dotenv from "dotenv";

dotenv.config();

import { createUrlRecord, getUrlByShortUrl } from "./database";
import { generateShortUrl } from "./shortener";

const router = express.Router();

const BASE_URL = process.env.BASE_URL || "http://localhost:4010";

router.post("/shorten", (req: express.Request, res: express.Response) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Missing longUrl parameter" });
  }

  const shortUrl = generateShortUrl(BASE_URL);
  const urlRecord = {
    shortUrl,
    longUrl,
  };

  try {
    createUrlRecord(urlRecord);

    return res.status(200).json({ shortUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Short URL already exists" });
  }
});

router.get("/:shortUrlId", (req: express.Request, res: express.Response) => {
  const { shortUrlId } = req.params;

  const shortUrl = `${BASE_URL}/${shortUrlId}`;
  const url = getUrlByShortUrl(shortUrl);
  if (url) {
    res.redirect(url.longUrl);
  } else {
    res.status(404).json({ error: "Short URL not found" });
  }
});

export default router;
