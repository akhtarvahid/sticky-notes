import { addBook, getBooks } from "../../../api/api";
import { Book } from "../../../types/common-types";

export const createBookLibrary = async (form: Book) => {
       let result;
        try {
            const response = await addBook(form)
            result = await response;
        } catch (e) {
           result = e;
        }
    
    return result;
}

export const getBookLibrary = async () => {
    const response = await getBooks();
    const result = await response;
    return result;
}

export const isFieldsEmpty = (f: Book) => {
   return Object.values(f).some((x) => x === '');
}