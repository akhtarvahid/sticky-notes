
import useSWRMutation from "swr/mutation";
import { BASE_STICKY_API } from "../utils/constants";
import { CreateSticky } from "../types/create-sticky/create-sticky.type";

// create new sticky
async function postRequest(url: RequestInfo | URL, { arg }: { arg: CreateSticky }) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

export const usePostSticky = () => {
  const {
    data: sticky,
    trigger: addStickyToStore,
    isMutating: isCreating,
    error: createError
  } = useSWRMutation(BASE_STICKY_API, postRequest);

  return {
    sticky,
    addStickyToStore,
    isCreating,
    createError
  };
};

