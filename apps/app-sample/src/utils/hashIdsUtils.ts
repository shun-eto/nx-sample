// eslint-disable-next-line @typescript-eslint/no-var-requires
const Hashids = require('hashids/cjs');

const hashids = new Hashids(process.env.HASHIDS_SECRET);

export const encodeHashId = (id: number[]): string => {
  return hashids.encode(id);
};

export const decodeHashId = (str: string): number[] => {
  return hashids.decode(str) as number[];
};

export const encodeFromObjectId = (objectId: string): string => {
  return hashids.encodeHex(objectId);
};

export const decodeToObjectId = (str: string): string => {
  return hashids.decodeHex(str);
};
