import { APIResponse } from '@playwright/test';
import { BookingRequest, BookingResponse } from './types';

export const getBookingIds = async ({ context }): Promise<{response: APIResponse, data: BookingResponse[]}> => {
  const response = await context.request.get('/booking');
  const data: BookingResponse[] = await response.json();
  return {response, data};
};

export const getBooking = async ({ context }, id: number) => {
  return await context.request.get(`/booking/${id}`);
};

// export const createBooking = async ({ context }, body: BookingRequest) => {
//   return await context.request.post('/booking', {body});
// };

export const createBooking = async ({ context }, body: BookingRequest): Promise<{ response: APIResponse; data: BookingResponse }> => {
  const response = await context.request.post('/booking', {
    data: body
  });
  const data: BookingResponse = await response.json();
  return { response, data };
};

export const updateBooking = async ({ context }, id: number, body) => {
  return await context.request.put(`/booking/${id}`, {body});
};

export const partialUpdateBooking = async ({ context },id: number, body) => {
  return await context.request.patch(`/booking/${id}`, {body});
};

export const deleteBooking = async ({ context }, id: number) => {
  return await context.request.delete(`/booking/${id}`);
};

export const healthCheck = async ({ context }) => {
  return await context.request.get('/booking');
};
