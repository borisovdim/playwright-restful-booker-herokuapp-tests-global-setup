import { test as base, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../../playwright/.auth/user-state.json');
export const test = base.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: authFile,
    });
    await use(context);
    await context.close();
  },
});

export { expect };
