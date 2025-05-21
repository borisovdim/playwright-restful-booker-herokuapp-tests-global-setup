import * as api from './api/api.ts';
import { expect, test, request } from '@playwright/test';

let context;

test.beforeEach(async () => {
  context = await request.newContext();
});

test('Ping - HealthCheck', async () => {
  const { response } = await api.healthCheck({ context: context });
  expect(response.status()).toBe(201);
});
