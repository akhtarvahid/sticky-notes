import axios from 'axios';
import { BASE_LIBRARY_API } from '../utils/env';

const api = axios.create({
  baseURL: BASE_LIBRARY_API,
});

export const getBooks = async () => {
  const response = await api.get('/library');
  return response.data;
};

export const addBook = async (newBook: any) => {
  const response = await api.post('/library', newBook);
  return response.data;
};

export const updateBook = async (bookId: any, updatedBook: any) => {
  const response = await api.put(`/library/${bookId}`, updatedBook);
  return response.data;
};

export const deleteBook = async (bookId: any) => {
  await api.delete(`/library/${bookId}`);
};
