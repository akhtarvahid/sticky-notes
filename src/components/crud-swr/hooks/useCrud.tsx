import { Book } from "../../../types/common-types";
import useSWRMutation from "swr/mutation";
import { LIBRARY_API } from "../../../utils/env";

interface PutRequestArgs {
  requestBody: Book;
  queryParams: {
    id: string;
  };
}

// Delete book
async function deleteRequest(url: string, { arg }: { arg: string }) {
  return fetch(`${url}/${arg}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

// Update book
async function putRequest(url: string, { arg }: { arg: PutRequestArgs }) {
  return fetch(`${url}/${arg.queryParams.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg.requestBody),
  }).then((res) => res.json());
}

// add new book
async function postRequest(url: RequestInfo | URL, { arg }: { arg: Book }) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

// get books
export const getRequest = async (url: RequestInfo | URL) => {
  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export const useGetBooks = () => {
  const {
    data: books,
    trigger: getStoreBooks,
    isMutating: isGetting,
    error: getError,
  } = useSWRMutation(LIBRARY_API, getRequest);

  return {
    books,
    getStoreBooks,
    isGetting,
    getError,
  };
};
export const usePostBook = () => {
  const {
    data: book,
    trigger: addBookToStore,
    isMutating: isCreating,
    error: createError,
  } = useSWRMutation(LIBRARY_API, postRequest);

  return {
    book,
    addBookToStore,
    isCreating,
    createError,
  };
};

export const useUpdateBook = () => {
  const {
    data: updatedBook,
    trigger: updateBookToStore,
    isMutating: isUpdating,
    error: updateError,
  } = useSWRMutation(LIBRARY_API, putRequest);

  return {
    updatedBook,
    updateBookToStore,
    isUpdating,
    updateError,
  };
};

export const useDeleteBook = () => {
  const {
    data: deletedBook,
    trigger: deleteBookFromStore,
    isMutating: isDeleting,
    error: deleteError,
  } = useSWRMutation(LIBRARY_API, deleteRequest);

  return {
    deletedBook,
    deleteBookFromStore,
    isDeleting,
    deleteError,
  };
};
