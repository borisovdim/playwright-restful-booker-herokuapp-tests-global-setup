import { request, FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function globalSetup(config: FullConfig) {
  const credentialsPath = path.join(__dirname, '../resources/user-credentials.json');
  const credentialsData = fs.readFileSync(credentialsPath, 'utf-8');
  const { username, password } = JSON.parse(credentialsData);

  const requestContext = await request.newContext();

  const response = await requestContext.post('https://restful-booker.herokuapp.com/auth', {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: username,
      password: password,
    },
  });

  if (response.ok()) {
    const responseBody = await response.json();
    const token = responseBody.token;

    fs.writeFileSync('auth-token.json', JSON.stringify(token));
  } else {
    throw new Error(`Failed to get token: ${response.status()}`);
  }
}

export default globalSetup;
