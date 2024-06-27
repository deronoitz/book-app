import { useRouter } from "next/router";
import { FC } from "react";
import BookItem from "@/components/shared/BookItem";
import IndexHeader from "@/components/shared/IndexHeader";
import booksAPI from "@/apis/interfaces/books";
import Pagination from "@/components/shared/Pagination";
import type { BookItemType } from "@/entities/Book";
import styles from "./BookIndex.module.scss";

const PER_PAGE = 5; // Total item per page

const BookIndex: FC = () => {
  const {
    query: { page = 1 },
  } = useRouter();

  const { data} = booksAPI.getBooks();

  /**
   * Function to handle pagination
   * Since the API doesn't have pagination feature, we need to process manually in client
   */
  const isFirstPage = +page === 1;
  const pageData = data?.slice(
    isFirstPage ? 0 : (+page - 1) * PER_PAGE,
    +page * PER_PAGE
  );

  return (
    <div>
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
            {pageData?.map((book: BookItemType) => (
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
