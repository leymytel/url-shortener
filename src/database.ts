import DatabaseConstructor from "better-sqlite3";

const db = new DatabaseConstructor("./urls.db", { verbose: console.log }); // Logs queries for debugging

db.exec(`
  CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shortUrl TEXT NOT NULL UNIQUE,
    longUrl TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

interface UrlModel {
  id: number;
  shortUrl: string;
  longUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const getUrlByShortUrl = (shortUrl: string): UrlModel | undefined => {
  const statement = db.prepare("SELECT longUrl FROM urls WHERE shortUrl = ?");

  return statement.get(shortUrl) as UrlModel | undefined;
};

interface UrlRecord {
  shortUrl: string;
  longUrl: string;
}

export const createUrlRecord = (url: UrlRecord) => {
  const statement = db.prepare(
    "INSERT INTO urls (shortUrl, longUrl) VALUES (?, ?)"
  );
  return statement.run(url.shortUrl, url.longUrl);
};
