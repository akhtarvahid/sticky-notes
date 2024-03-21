import { HttpResponse, http } from "msw";
import {
  libraryMoock,
} from "../utils/mock-data/mock-data";
import { BASE_STICKY_API, LIBRARY_API } from "../utils/env";
import { stickyMockData } from "./mock-data/sticky-mock-data";

export const handlers = [
  // Library Management - CRUD
  http.get(LIBRARY_API, () => {
    console.log(`GET REQUEST data`);
    return HttpResponse.json(libraryMoock);
  }),
  http.post(LIBRARY_API, async ({ request }) => {
    const newPost = await request.json();
    console.log(`POST REQUEST data for: ${newPost}`);

    return HttpResponse.json({}, { status: 200 });
  }),
  http.delete(`${LIBRARY_API}/:id`, ({ params }) => {
    const { id } = params;
    console.log(`DELETE data for: ${id}`);
    return HttpResponse.json({}, { status: 200 });
  }),
  http.put(`${LIBRARY_API}/:id`, async ({ request, params }) => {
    const { id } = params;
    const nextPost = await request.json();
    console.log("PUT data with:", id, nextPost);
    return HttpResponse.json({ nextPost }, { status: 200 });
  }),
  http.get(`${BASE_STICKY_API}/sticky`, () => {
    console.log(`GET REQUEST data`);
    return HttpResponse.json(stickyMockData, { status: 200 });
  })
];
