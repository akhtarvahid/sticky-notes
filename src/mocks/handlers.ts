import { HttpResponse, http } from "msw";
import { BASE_STICKY_API } from "../utils/env";
import { stickyMockData } from "./mock-data/sticky-mock-data";

export const handlers = [
  http.get(`${BASE_STICKY_API}/sticky`, () => {
    console.log(`GET REQUEST data`);
    return HttpResponse.json(stickyMockData, { status: 200 });
  })
];
