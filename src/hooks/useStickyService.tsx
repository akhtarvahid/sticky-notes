import useSWRMutation from "swr/mutation";
import { BASE_STICKY_API } from "../utils/env";
import { InputSticky, Sticky } from "../types/create-sticky/create-sticky.type";
import useSWR from "swr";

interface PutRequestArgs {
  requestBody: Sticky;
  queryParams: {
    id: string;
  };
}

// get all stickies
export const getRequest = async (url: RequestInfo | URL) => {
  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
}

// create new sticky
async function postRequest(url: RequestInfo | URL, { arg }: { arg: InputSticky }) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

// delete sticky
async function deleteRequest(url: string, { arg }: { arg: string }) {
  return fetch(`${url}/${arg}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

// Update sticky
async function putRequest(url: string, { arg }: { arg: PutRequestArgs }) {
  return fetch(`${url}/${arg.queryParams.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg.requestBody),
  }).then((res) => res.json());
}

export const usePostSticky = () => {
  const {
    data: sticky,
    trigger: createSticky,
    isMutating: isCreating,
    error: createError,
  } = useSWRMutation(`${BASE_STICKY_API}/sticky`, postRequest);

  return {
    sticky,
    createSticky,
    isCreating,
    createError,
  };
};


export const useGetStickies = () => {
  return useSWR(`${BASE_STICKY_API}/sticky`, getRequest);
};

export const useDeleteSticky = () => {
  const {
    data: stickyResponse,
    trigger: deleteSticky,
    isMutating: isDeleting,
    error: deleteError,
  } = useSWRMutation(`${BASE_STICKY_API}/sticky`, deleteRequest);

  return {
    stickyResponse,
    deleteSticky,
    isDeleting,
    deleteError,
  };
};

export const useUpdateSticky = () => {
  const {
    data: updatedSticky,
    trigger: updateSticky,
    isMutating: isUpdating,
    error: updateError,
  } = useSWRMutation(`${BASE_STICKY_API}/sticky`, putRequest);

  return {
    updatedSticky,
    updateSticky,
    isUpdating,
    updateError,
  };
};