import { APIResponse } from '@playwright/test';
import { BookingRequest, BookingResponse } from './types';

export const getBookingIds = async ({ context }): Promise<{ response: APIResponse; data: BookingResponse[] }> => {
  const response = await context.request.get('/booking');
  const data: BookingResponse[] = await response.json();
  return { response, data };
};

export const getBooking = async ({ context }, id: number): Promise<{ response: APIResponse; data: BookingResponse }> => {
  const response = await context.request.get(`/booking/${id}`);
  const data: BookingResponse = await response.json();
  return { response, data };
};

export const createBooking = async ({ context }, body: BookingRequest): Promise<{ response: APIResponse; data: BookingResponse }> => {
  const response = await context.request.post('/booking', {
    data: body,
  });
  const data: BookingResponse = await response.json();
  return { response, data };
};

export const updateBooking = async ({ context }, id: number, body: BookingRequest): Promise<{ response: APIResponse; data: BookingRequest }> => {
  const response = await context.request.put(`/booking/${id}`, {
    data: body,
  });
  const data: BookingRequest = await response.json();
  return { response, data };
};

export const partialUpdateBooking = async ({ context }, id: number, body: Partial<BookingRequest>): Promise<{ response: APIResponse; data: Partial<BookingResponse> }> => {
  const response = await context.request.patch(`/booking/${id}`, {
    data: body,
  });
  const data: Partial<BookingResponse> = await response.json();
  return { response, data };
};

export const deleteBooking = async ({ context }, id: number): Promise<{ response: APIResponse }> => {
  const response = await context.request.delete(`/booking/${id}`);
  return { response };
};

export const healthCheck = async ({ context }): Promise<{ response: APIResponse }> => {
  const response = await context.get('/ping');
   return { response };
};
