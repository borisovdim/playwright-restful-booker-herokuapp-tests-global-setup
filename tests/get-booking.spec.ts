import * as api from './api/api.ts';
import { createRandomUser } from './api/types.ts';
import { expect, test } from './fixtures/auth-fixture.ts';

const bookingData = createRandomUser();

let bookingId: number;

test.beforeEach(async ({ context }) => {
  const { response, data } = await api.createBooking({ context }, bookingData);
  bookingId = data.bookingid;
  expect(response.status()).toBe(200);
});

test.afterEach(async ({ context }) => {
  const { response } = await api.deleteBooking({ context }, bookingId);
  expect(response.status()).toBe(201);
});

test('Get booking', async ({ context }) => {
  const { response, data } = await api.getBooking({ context }, bookingId);

  expect(response.status()).toBe(200);
  expect(data).toEqual(bookingData);
});
