import { DefaultRequestMultipartBody, HttpResponse, http } from "msw";
import { BASE_STICKY_API } from "../utils/env";
import { stickyMockData } from "./mock-data/sticky-mock-data";
import { Sticky } from "../types/create-sticky/create-sticky.type";

export const handlers = [
  // get sticky mock
  http.get(`${BASE_STICKY_API}/sticky`, () => {
    console.log(`GET: REQUEST data`);
    return HttpResponse.json(stickyMockData, { status: 200 });
  }),

  // post sticky mock
  http.post(`${BASE_STICKY_API}/sticky`, async ({ request }) => {
    const newSticky = await request.json();
    const myStickyValue = newSticky as Sticky;

    myStickyValue.id = stickyMockData?.length + 1 + '';
    if(newSticky){
      stickyMockData.push(myStickyValue);
    }
    console.log(`POST: REQUEST data`, JSON.stringify(stickyMockData));

    return HttpResponse.json(stickyMockData, { status: 201 });
  }),

  http.delete(`${BASE_STICKY_API}/sticky/:id`, ({ request, params}) => {
    const { id } = params;
    const deletedData = stickyMockData.find(s => s.id == id)

    const filtered = stickyMockData.filter(d => d.id != id);
    stickyMockData.splice(0, stickyMockData.length);
    stickyMockData.push(...filtered);
    console.log(`DELETE: REQUEST for id: ${id}`);
    console.log('DELETED Data', JSON.stringify(deletedData));

    return HttpResponse.json(null, { status: 200 });
  }),
];
