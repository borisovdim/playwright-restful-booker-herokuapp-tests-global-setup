import { test, expect } from './fixtures/auth-fixture.ts';
import * as api from './api/api.ts';
import { BookingRequest } from './api/types.ts';

test('Create bookings', async ({ context }) => {
  const bookingData: BookingRequest = {
    firstname: 'TEST#1.1',
    lastname: 'TEST#1.2',
    totalprice: 999,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-02-23',
      checkout: '2025-10-23',
    },
    additionalneeds: 'Car',
  };

  const { response, data } = await api.createBooking({ context }, bookingData);

  expect(response.status()).toBe(200);
  expect(data.booking.firstname).toBe('TEST#1.1');
});
