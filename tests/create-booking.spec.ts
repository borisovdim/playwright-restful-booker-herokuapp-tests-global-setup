import * as api from './api/api.ts';
import { createRandomUser } from './api/types.ts';
import { expect, test } from './fixtures/auth-fixture.ts';

const bookingData = createRandomUser();

let bookingId: number;

test.afterEach(async ({authContext}) => {
  const  { response } = await api.deleteBooking(authContext, bookingId);
  expect(response.status()).toBe(201);
});

test('Create booking', async ({ authContext }) => {
  const { response, data } = await api.createBooking(authContext, bookingData);
  bookingId = data.bookingid;

  expect(response.status()).toBe(200);
  expect.soft(data.booking.firstname).toEqual(bookingData.firstname);
  expect.soft(data.booking.lastname).toEqual(bookingData.lastname);
  expect.soft(data.booking.totalprice).toEqual(bookingData.totalprice);
  expect.soft(data.booking.depositpaid).toEqual(bookingData.depositpaid);
  expect.soft(data.booking.bookingdates.checkin).toEqual(bookingData.bookingdates.checkin);
  expect.soft(data.booking.bookingdates.checkout).toEqual(bookingData.bookingdates.checkout);
  expect.soft(data.booking.additionalneeds).toEqual(bookingData.additionalneeds);
});
