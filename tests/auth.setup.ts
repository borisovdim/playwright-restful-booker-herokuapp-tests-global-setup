import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

setup('authenticate and save state', async ({ browser }) => {
  const authFile = 'playwright/.auth/user-state.json';
  const context = await browser.newContext();

  const credentialsPath = path.join(__dirname, '../tests/resources/user-credentials.json');
  const credentialsData = fs.readFileSync(credentialsPath, 'utf-8');
  const { username, password } = JSON.parse(credentialsData);

  const response = await context.request.post('/auth', {
    data: {
      username: username,
      password: password,
    },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const textResponse = await response.text();
  const responseBody = JSON.parse(textResponse);
  const token = responseBody.token;
  expect(token).toBeDefined();

  const cookies = [
    {
      name: 'token',
      value: token,
      domain: 'restful-booker.herokuapp.com',
      path: '/',
      httpOnly: true,
      secure: true,
    },
  ];

  await context.addCookies(cookies);
  await context.storageState({ path: authFile });
});
