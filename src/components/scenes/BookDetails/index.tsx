import { FC, memo, useMemo } from "react";
import ImageWithFallback from "@/components/shared/ImageWithFallback";

import type { BookItemType } from "@/entities/Book";

import styles from "./BookDetails.module.scss";
import { formatDefaultTime } from "@/helpers/date";
import { useBooks } from "@/hooks/books";
import { useRouter } from "next/router";
import { FavFill, FavOutline } from "@/components/shared/Icon";

const BookDetails: FC<{ book: BookItemType }> = ({ book }) => {
  const router = useRouter();
  const { handleSetFavorite, isFavorite } = useBooks(book);

  const publicationDate = useMemo(
    () => formatDefaultTime(book.publicationDate || new Date()),
    [book.publicationDate]
  );

  function handlePrevious() {
    router.back();
  }

  return (
    <div className={styles.bookDetailsContainer}>
      <a
        className={`${styles.backButton} items-center`}
        onClick={handlePrevious}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22px"
          height="22px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 12H18M6 12L11 7M6 12L11 17"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        &nbsp; Back to Collections
      </a>
      <div className={`flex ${styles.contentWrapper}`}>
        <div className={styles.images}>
          <ImageWithFallback
            width={340}
            height={500}
            alt={book.title}
            src={book.cover}
            fallbackSrc="/No-Image-Placeholder.svg"
          />
        </div>
        <div className={styles.textContent}>
          <h2>#{book.id}</h2>
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>
          <div className={styles.textDetails}>
            <div>
              <h4>Publication Date</h4>
              <p>{publicationDate}</p>
            </div>
            <div>
              <h4>Description</h4>
              <p>{book.description}</p>
            </div>
            <button
              className={`btn ${styles.favoriteBtn} ${
                isFavorite && styles.favoriteBtnActive
              }`}
              onClick={handleSetFavorite}
            >
              {isFavorite ? <FavFill /> : <FavOutline />}
              {isFavorite ? "Remove from Favorite" : "Add to Favorite"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BookDetails);
