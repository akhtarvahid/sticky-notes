import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { server } from "../../mocks/server";
import StickyIndex from "./Sticky";
import { act } from "react-dom/test-utils";

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

    // fire an event to make API request for creating a sticky
    fireEvent.click(submitBtn);
    await expect(screen.getByTestId(/Loading/i)).toBeInTheDocument();
    await waitFor(() => getByText("Atomic Habits"));
  });
});

describe("Sticky DELETE", () => {
  test("RENDER: delete sticky from list successfully", async () => {
    const { getByText, getAllByTestId } = render(<StickyIndex />);
    const removeBadge = getAllByTestId(/Remove/i)[0];
    expect(removeBadge).toBeInTheDocument();

    // fire an event to make API request for removing a sticky
    fireEvent.click(removeBadge);
    await expect(screen.getByTestId(/Loading/i)).toBeInTheDocument();
    await waitFor(() => getByText(/Collage/));
  });
});

describe("Sticky UPDATE", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test("RENDER: update sticky from list successfully", async () => {
    const { getByText, getByTestId, getByRole } = render(<StickyIndex />);
    const titleInput = getByRole("textbox", { name: /title/i });
    const selectColor = getByRole("combobox", { name: "tag" });
    const bodyInput = getByRole("textbox", { name: /body/i });
    const updateBadge = getByTestId(/edit/i);

    expect(titleInput).toBeInTheDocument();
    expect(selectColor).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
    expect(updateBadge).toBeInTheDocument();

    fireEvent.click(updateBadge);

    const updateBtn = getByRole("button", { name: /update/i });
    expect(updateBtn).toBeInTheDocument();

    fireEvent.change(titleInput, { target: { value: "Collage v2" } });
    fireEvent.change(selectColor, { target: { value: "GRAY" } });
    fireEvent.change(bodyInput, { target: { value: "previous books v2" } });

    // fire an event to make API request for updating a sticky
    fireEvent.click(updateBtn);
    await expect(screen.getByTestId(/Loading/i)).toBeInTheDocument();
    await waitFor(() => getByText(/Collage v2/));
  });

  test("RENDER: update sticky API failure", async () => {
    const { getByText, getByTestId, getByRole } = render(<StickyIndex />);
    const titleInput = getByRole("textbox", { name: /title/i });
    const selectColor = getByRole("combobox", { name: "tag" });
    const bodyInput = getByRole("textbox", { name: /body/i });
    const updateBadge = getByTestId(/edit/i);

    expect(titleInput).toBeInTheDocument();
    expect(selectColor).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
    expect(updateBadge).toBeInTheDocument();

    fireEvent.click(updateBadge);

    const updateBtn = getByRole("button", { name: /update/i });
    expect(updateBtn).toBeInTheDocument();

    fireEvent.change(titleInput, { target: { value: "" } });
    fireEvent.change(selectColor, { target: { value: "" } });
    fireEvent.change(bodyInput, { target: { value: "" } });

    await act(() => {
      fireEvent.click(updateBtn);
    });

    expect(getByText(/Something went wrong!/)).toBeInTheDocument();
  });
});
