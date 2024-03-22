import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
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
describe("Sticky GET", () => {
  test("RENDER: should show table if api data fetched successfully", () => {
    render(<StickyIndex />);
  });
});
describe("Sticky POST", () => {
  test("RENDER: enter detail of form field and create post successfully", async () => {
    const { getByRole, getByText } = render(<StickyIndex />);
    const titleInput = getByRole("textbox", { name: /title/i });
    const selectColor = getByRole("combobox", { name: "tag" });
    const bodyInput = getByRole("textbox", { name: /body/i });
    const submitBtn = getByRole("button", { name: /submit/i });
    expect(titleInput).toBeInTheDocument();
    expect(selectColor).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    fireEvent.change(titleInput, { target: { value: "Atomic Habits" } });
    fireEvent.change(selectColor, { target: { value: "GRAY" } });
    fireEvent.change(bodyInput, { target: { value: "James Clear" } });

    screen.debug();
    fireEvent.click(submitBtn);
    await expect(screen.getByTestId(/Loading/i)).toBeInTheDocument();
    //await waitFor(() => getByText('Atomic Habits'))

    screen.debug();
  });
});
