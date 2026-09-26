import { WavnilConfig } from './api';
import { loadCredentials } from './commands/auth';

export function getConfig(): WavnilConfig {
  // Check for stored OAuth credentials first
  const creds = loadCredentials();
  if (creds) {
    return {
      apiKey: creds.accessToken,
      apiUrl: creds.apiUrl,
    };
  }

  // Fall back to environment variable
  const apiKey = process.env.WAVNIL_API_KEY;
  const apiUrl = process.env.WAVNIL_API_URL;

  if (!apiKey) {
    console.error('❌ Error: No authentication found.');
    console.error('Options:');
    console.error('  1. OAuth2: wavnil auth:login --client-id <id> --client-secret <secret>');
    console.error('  2. API Key: export WAVNIL_API_KEY=your_api_key');
    process.exit(1);
  }

  return {
    apiKey,
    apiUrl,
  };
}
