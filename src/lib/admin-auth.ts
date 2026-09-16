const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
export const ADMIN_SESSION_COOKIE = "admin_session";

const encoder = new TextEncoder();

async function getKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set.");
  }
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function bufferToBase64Url(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBuffer(base64url: string) {
  const padded = base64url
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(base64url.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_DURATION_MS;
  const key = await getKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(String(expires)));
  return `${expires}.${bufferToBase64Url(signature)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [expiresStr, signatureStr] = token.split(".");
  if (!expiresStr || !signatureStr) return false;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  try {
    const key = await getKey();
    const signature = base64UrlToBuffer(signatureStr);
    return await crypto.subtle.verify("HMAC", key, signature, encoder.encode(expiresStr));
  } catch {
    return false;
  }
}
