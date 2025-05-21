import { faker } from '@faker-js/faker';

export interface BookingRequest {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}

export interface BookingResponse {
  bookingid: number;
  booking: BookingRequest;
}

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export const createRandomUser = (): BookingRequest => {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 100, max: 500 }),
    depositpaid: false,
    bookingdates: {
      checkin: faker.date.past().toISOString().split('T')[0],
      checkout: faker.date.future().toISOString().split('T')[0],
    },
    additionalneeds: faker.vehicle.bicycle(),
  };
};
