import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { BookItemType } from "@/entities/Book";

import BookDetails from "@/components/scenes/BookDetails";
import booksAPI from "@/apis/interfaces/books";

export const getServerSideProps = (async (context) => {
  const bookId = context.query.id as string;
  const book = await booksAPI.getServerBookDetails(bookId);

  if (Object.keys(book).length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
}) satisfies GetServerSideProps<{ book: BookItemType }>;

export default function BookDetailsPage({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>
          {book.title} by {book.author}
        </title>
      </Head>
      <BookDetails book={book} />
    </>
  );
}
