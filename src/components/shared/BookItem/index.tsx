import { FC, memo, useMemo } from "react";
import { formatDefaultTime } from "@/helpers/date";
import { useBooks } from "@/hooks/books";
import Link from "next/link";
import ImageWithFallback from "../ImageWithFallback";

import styles from "./BookItem.module.scss";

import type { BookItemType } from "@/entities/Book";

interface Props {
  data: BookItemType;
}

const BookItem: FC<Props> = (props) => {
  const { data } = props;
  const { handleSetFavorite, isFavorite} = useBooks(data);

  // Formating the ISO format date to dd/mm/yyyy format
  const publicationDate = useMemo(
    () => formatDefaultTime(data.publicationDate),
    [data.publicationDate]
  );

  return (
    <tr className={styles.row}>
      <td>{data.id}</td>
      <td>
        <div className="flex items-center">
          <ImageWithFallback
            width={64}
            height={97}
            src={data.cover}
            alt={data.title}
            className={styles.cover}
            fallbackSrc="/No-Image-Placeholder.svg"
          />
          <Link
            href={{
              pathname: `/${data.id}`,
            }}
          >
            {data.title}
          </Link>
        </div>
      </td>
      <td>{data.author}</td>
      <td>{publicationDate}</td>
      <td>
        <button className={styles.favoriteBtn} onClick={handleSetFavorite}>
          {isFavorite ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#1ed760"
              width="22px"
              height="22px"
              viewBox="0 0 24 24"
            >
              <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ccc"
              width="22px"
              height="22px"
              viewBox="0 0 24 24"
            >
              <path d="M20.5,4.609A5.811,5.811,0,0,0,16,2.5a5.75,5.75,0,0,0-4,1.455A5.75,5.75,0,0,0,8,2.5,5.811,5.811,0,0,0,3.5,4.609c-.953,1.156-1.95,3.249-1.289,6.66,1.055,5.447,8.966,9.917,9.3,10.1a1,1,0,0,0,.974,0c.336-.187,8.247-4.657,9.3-10.1C22.45,7.858,21.453,5.765,20.5,4.609Zm-.674,6.28C19.08,14.74,13.658,18.322,12,19.34c-2.336-1.41-7.142-4.95-7.821-8.451-.513-2.646.189-4.183.869-5.007A3.819,3.819,0,0,1,8,4.5a3.493,3.493,0,0,1,3.115,1.469,1.005,1.005,0,0,0,1.76.011A3.489,3.489,0,0,1,16,4.5a3.819,3.819,0,0,1,2.959,1.382C19.637,6.706,20.339,8.243,19.826,10.889Z" />
            </svg>
          )}
        </button>
      </td>
    </tr>
  );
};

export default memo(BookItem);
