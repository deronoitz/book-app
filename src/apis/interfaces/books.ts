import fetcher from "../request-manager";
import useSWR from "swr";
import type { SWRConfiguration, SWRResponse } from "swr";

import type { BookItemType } from "@/entities/Book";

export const endpoints = {
  getBookList: "https://my-json-server.typicode.com/cutamar/mock/books",
  getBookDetails: (id: string) =>
    `https://my-json-server.typicode.com/cutamar/mock/books/${id}`,
};

const booksAPI = {
  useBooks(options?: SWRConfiguration): SWRResponse {
    return useSWR<BookItemType[]>(endpoints.getBookList, fetcher, {
      revalidateOnFocus: false,
      ...options,
    });
  },

  useBookDetails(id: string) {
    return useSWR<BookItemType>(endpoints.getBookDetails(id), fetcher);
  },

  async getServerBookDetails(id: string) {
    return fetcher(endpoints.getBookDetails(id));
  },
};

export default booksAPI;
