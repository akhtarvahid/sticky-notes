import { render, screen } from "@testing-library/react";
import { server } from "../../mocks/server";
import StickyIndex from "./Sticky";


beforeAll(() => {
    // Start the interception.
    server.listen();
  });
  
  afterEach(() => {
    // Remove any handlers you may have added
    // in individual tests (runtime handlers).
    server.resetHandlers();
  });
  
  afterAll(() => {
    // Disable request interception and clean up.
    server.close();
  });
describe('Sticky', () => {
    test('RENDER: should show table if api data fetched successfully', () => {
        render(<StickyIndex />);
        screen.debug();
    });
})