import * as api from '../tests/api/api.ts';
import { expect, test } from './fixtures/auth-fixture.ts';
import { createRandomUser } from './api/types.ts';

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

test('Get bookings', async ({ nonAuthContext }) => {
  const { response, data } = await api.getBookingIds(nonAuthContext);
  expect(response.status()).toBe(200);

  const bookingIds = data.map(b => b.bookingid);
  expect(bookingIds).toContain(bookingId);
});
