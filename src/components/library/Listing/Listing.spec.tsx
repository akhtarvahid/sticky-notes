import { render, screen, waitFor } from "@testing-library/react";
import Listing from "./Listing";
import { server } from "../../../mocks/server";
import { libraryMoock } from "../../../utils/mock-data/mock-data";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

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

// AAA(Arrange-Act-Assert)

describe("Library Listing component", () => {
  it("books undefined", async () => {
    const mockSelectBookFn = jest.fn();
    render(
      <Listing
        books={[]}
        deleteBook={jest.fn()}
        setSelectedBook={mockSelectBookFn}
      />
    );
    const listItem = screen.queryByText("Enrique Stokes");
    expect(listItem).not.toBeInTheDocument();
  });
  it("books fetched successfully", async () => {
    const mockSelectBookFn = jest.fn();
    render(
      <Listing
        books={libraryMoock}
        deleteBook={jest.fn()}
        setSelectedBook={mockSelectBookFn}
      />
    );
    const listItem = await screen.findByText("Enrique Stokes");
    expect(listItem).toBeInTheDocument();
  });
  it("should delete successfully", async () => {
    const mockSelectBookFn = jest.fn();
    render(
      <Listing
        books={libraryMoock}
        deleteBook={jest.fn()}
        setSelectedBook={mockSelectBookFn}
      />
    );
    const deleteBadge = screen.getByText("Remove");
    expect(deleteBadge).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(deleteBadge);
    });
    waitFor(() => expect(screen.getByText("Deleted succesfully")));
  });
  it("error occured for deletion", async () => {
    const mockSelectBookFn = jest.fn();

    render(
      <Listing
        books={libraryMoock}
        deleteBook={jest.fn()}
        setSelectedBook={mockSelectBookFn}
      />
    );
    const deleteBadge = screen.getByText("Remove");
    expect(deleteBadge).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(deleteBadge);
    });
    waitFor(() => expect(screen.getByText("Error occured!")));
  });
});
