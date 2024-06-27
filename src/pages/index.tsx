import Head from "next/head";
import BookIndex from "@/components/scenes/BookIndex";

export default function BookIndexPage() {
  return (
    <>
      <Head>
        <title>Book Collections</title>
      </Head>

      <BookIndex />
    </>
  );
}
