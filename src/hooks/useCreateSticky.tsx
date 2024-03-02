import useSWRMutation from "swr/mutation";
import { BASE_STICKY_API } from "../utils/env";
import { Sticky } from "../types/create-sticky/create-sticky.type";

// create new sticky
async function postRequest(url: RequestInfo | URL, { arg }: { arg: Sticky }) {
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
