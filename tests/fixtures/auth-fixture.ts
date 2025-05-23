import { test as base, request } from '@playwright/test';
import fs from 'fs';

type AuthContext = ReturnType<typeof request.newContext>;

export const test = base.extend<{ authContext: AuthContext; nonAuthContext: AuthContext }>({
  authContext: async ({}, use) => {
    const token = JSON.parse(fs.readFileSync('auth-token.json', 'utf-8'));
    const apiContext = await request.newContext({
      extraHTTPHeaders: {
        Cookie: `token=${token}`,
      },
    });
    await use(apiContext);
  },

  nonAuthContext: async ({}, use) => {
    const apiContext = await request.newContext();
    await use(apiContext);
  },
});

export { expect } from '@playwright/test';
