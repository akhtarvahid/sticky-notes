import { HttpResponse, http } from "msw";
import { BASE_STICKY_API } from "../utils/env";
import { stickyMockData } from "./mock-data/sticky-mock-data";

export const handlers = [
  // get sticky mock
  http.get(`${BASE_STICKY_API}/sticky`, () => {
    console.log(`GET: REQUEST data`);
    return HttpResponse.json(stickyMockData, { status: 200 });
  }),

  // post sticky mock
  http.post(`${BASE_STICKY_API}/sticky`, () => {
    console.log(`POST: REQUEST data`);
    return HttpResponse.json(stickyMockData, { status: 201 });
  })
];
