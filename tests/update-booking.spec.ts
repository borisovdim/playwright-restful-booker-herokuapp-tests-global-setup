import { faker } from '@faker-js/faker';
import * as api from './api/api.ts';
import { createRandomUser } from './api/types.ts';
import { expect, test } from './fixtures/auth-fixture.ts';

const bookingData = createRandomUser();

const updatedUser = {
  ...bookingData,
  totalprice: faker.number.int({ min: 500, max: 700 }),
  depositpaid: true,
  additionalneeds: faker.vehicle.vehicle(),
};

let bookingId: number;

test.beforeEach(async ({ authContext }) => {
  const { response, data } = await api.createBooking(authContext , bookingData);
  bookingId = data.bookingid;
  expect(response.status()).toBe(200);
});

test.afterEach(async ({ authContext }) => {
  const { response } = await api.deleteBooking(authContext, bookingId);
  expect(response.status()).toBe(201);
});

test('Update booking', async ({ authContext }) => {
  const { response, data } = await api.updateBooking(authContext, bookingId, updatedUser);

  expect(response.status()).toBe(200);
  expect.soft(data.firstname).toEqual(updatedUser.firstname);
  expect.soft(data.lastname).toEqual(updatedUser.lastname);
  expect.soft(data.totalprice).toEqual(updatedUser.totalprice);
  expect.soft(data.depositpaid).toEqual(updatedUser.depositpaid);
  expect.soft(data.bookingdates.checkin).toEqual(updatedUser.bookingdates.checkin);
  expect.soft(data.bookingdates.checkout).toEqual(updatedUser.bookingdates.checkout);
  expect.soft(data.additionalneeds).toEqual(updatedUser.additionalneeds);
});
