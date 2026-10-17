import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const COST = 16384;
const KEY_LENGTH = 64;

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const derivedKey = await scrypt(password, salt, KEY_LENGTH, { N: COST, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  return `scrypt$${COST}$${salt.toString("hex")}$${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password, storedHash) {
  const [algorithm, cost, saltHex, keyHex] = storedHash.split("$");
  if (algorithm !== "scrypt" || Number(cost) !== COST || !saltHex || !keyHex) return false;

  const expectedKey = Buffer.from(keyHex, "hex");
  if (expectedKey.length !== KEY_LENGTH) return false;

  const actualKey = await scrypt(password, Buffer.from(saltHex, "hex"), KEY_LENGTH, {
    N: COST,
    r: 8,
    p: 1,
    maxmem: 64 * 1024 * 1024,
  });
  return timingSafeEqual(actualKey, expectedKey);
}
