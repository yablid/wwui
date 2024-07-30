// src/scripts/generate-secrets.ts
import { randomBytes } from 'crypto';

// Function to generate a secure random string
function generateSecret(length: number): string {
  return randomBytes(length).toString('hex');
}

const secret = generateSecret(32); // 32 bytes = 64 characters in hex

console.log(secret);
