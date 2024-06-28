import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import BookItem from "@/components/shared/BookItem";
import IndexHeader from "@/components/shared/IndexHeader";
import booksAPI from "@/apis/interfaces/books";
import Pagination from "@/components/shared/Pagination";
import type { BookItemType } from "@/entities/Book";
import styles from "./BookIndex.module.scss";
import AddBookModal from "@/components/shared/AddBookModal";

const PER_PAGE = 5; // Total item per page

type BookItemExtends = BookItemType & { isLocal: boolean };

const BookIndex: FC = () => {
  const {
    query: { page = 1 },
  } = useRouter();

  const { data, mutate, isLoading } = booksAPI.useBooks();

  /**
   * Function to handle pagination
   * Since the API doesn't have pagination feature, we need to process manually in client
   */
  const isFirstPage = +page === 1;
  const pageData = data?.slice(
    isFirstPage ? 0 : (+page - 1) * PER_PAGE,
    +page * PER_PAGE
  );

  // combine data from localStorage to fetched data
  useEffect(() => {
    if (!isLoading) {
      const books = localStorage.getItem("books") || "[]";
      const booksObject = JSON.parse(books);

      mutate([...booksObject, ...data], { revalidate: false });
    }
  }, [isLoading]);

  return (
    <div>
      <AddBookModal />
      <IndexHeader total={data?.length || 0} />
      <div className={styles.contentWrapper}>
        <table className="w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publication Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pageData?.map((book: BookItemExtends) => (
              <BookItem data={book} key={book.id} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination total={data?.length || 0} perPage={PER_PAGE} />
    </div>
  );
};

export default BookIndex;
