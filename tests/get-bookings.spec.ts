import { test, expect } from '@playwright/test';
import * as api from '../tests/api/api.ts';

test('Get bookings', async ({browser}) => {

  const context = await browser.newContext();
  const { response, data } = await api.getBookingIds({ context });
  expect(response.status()).toBe(200);
  expect(Array.isArray(data)).toBe(true);
});
