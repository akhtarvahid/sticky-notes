

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