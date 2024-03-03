import { HttpResponse, http } from "msw";
import { BASE_STICKY_API } from "../utils/env";
import { stickyMockData } from "./mock-data/sticky-mock-data";

export const handlers = [

  //CreateSticky mock
  http.get(`${BASE_STICKY_API}/sticky`, () => {
    console.log(`GET REQUEST data`);
    return HttpResponse.json(stickyMockData, { status: 200 });
  }),
  // http.post(`${BASE_STICKY_API}/sticky`, async ({ request }) => {
  //   const newPost = await request.json();
  //   console.log(`POST REQUEST data for: ${newPost}`);

  //   return HttpResponse.json({}, { status: 200 });
  // }),

];
