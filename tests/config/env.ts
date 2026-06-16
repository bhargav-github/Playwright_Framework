// tests/config/env.ts
export const ENV = {
  BASE_URL: process.env.BASE_URL ?? 'http://127.0.0.1/orangehrm-2.5.0.2/index.php',
  USERNAME: process.env.APP_USERNAME ?? 'admin',
  PASSWORD: process.env.APP_PASSWORD ?? 'admin',
};