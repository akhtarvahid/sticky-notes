import { SWRMutationConfiguration } from "swr/mutation";


export interface Book {
    title: string;
    author: string;
    price: string;
}

export interface BookResponse extends Book {
    id: string;
    createdAt: string;
    image: string;
}
export interface ErrorResponse {
    message: string;
    path: string;
    statusCode: number;
    timestamp: Date;
}

export interface ErrorResponse {
    message: string;
    path: string;
    statusCode: number;
    timestamp: Date;
  }
  export interface ReturnResponse<T> {
    data: T | undefined;
    trigger: <SWRData = T>(
      extraArgument: RequestInit,
      options?: SWRMutationConfiguration<
        T,
        ErrorResponse,
        RequestInit,
        string,
        SWRData
      >,
    ) => Promise<T | undefined>;
    isMutating: boolean;
    error: ErrorResponse | undefined;
  }