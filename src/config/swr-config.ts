interface ErrorResponse {
  message: string;
}

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message);
  }
  return response.json();
};

export const swrConfig = {
  fetcher,
  revalidateOnFocus: false, // Disable revalidation on window focus
  revalidateOnReconnect: false, // Disable revalidation on reconnect
};



