import { nanoid } from "nanoid";

const generateShortUrlId = (): string => {
  return nanoid(6);
};

export const generateShortUrl = (baseURL: string): string => {
  const id = generateShortUrlId();

  return `${baseURL}/${id}`;
};
