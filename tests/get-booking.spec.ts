import * as api from './api/api.ts';
import { createRandomUser } from './api/types.ts';
import { expect, test } from './fixtures/auth-fixture.ts';

const bookingData = createRandomUser();

let bookingId: number;

test.beforeEach(async ({ authContext }) => {
  const { response, data } = await api.createBooking(authContext, bookingData);
  bookingId = data.bookingid;
  expect(response.status()).toBe(200);
});

test.afterEach(async ({ authContext }) => {
  const { response } = await api.deleteBooking(authContext, bookingId);
  expect(response.status()).toBe(201);
});

test('Get booking', async ({ nonAuthContext }) => {
  const { response, data } = await api.getBooking(nonAuthContext, bookingId);

  expect(response.status()).toBe(200);
  expect(data).toEqual(bookingData);
});
