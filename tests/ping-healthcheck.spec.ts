import * as api from './api/api.ts';
import { expect, test } from './fixtures/auth-fixture.ts';

test('Ping - HealthCheck', async ({nonAuthContext}) => {
  const { response } = await api.healthCheck(nonAuthContext);
  expect(response.status()).toBe(201);
});
