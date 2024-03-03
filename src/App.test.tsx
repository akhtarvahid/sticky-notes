import { render, screen } from '@testing-library/react';
import App from './App';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { BASE_STICKY_API } from './utils/env';
import { stickyMockData } from './mocks/mock-data/sticky-mock-data';

const server = setupServer(
  http.get(`${BASE_STICKY_API}/sticky`, () => {
    console.log(`GET REQUEST data`);
    return HttpResponse.json(stickyMockData, { status: 200 });
  })
);

beforeAll(() => {
  // Start the interception.
  server.listen()
})

afterEach(() => {
  // Remove any handlers you may have added
  // in individual tests (runtime handlers).
  server.resetHandlers()
})

afterAll(() => {
  // Disable request interception and clean up.
  server.close();
})
describe('App', () => {

  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/sticky notes/i);
    expect(linkElement).toBeInTheDocument();
  });
})
