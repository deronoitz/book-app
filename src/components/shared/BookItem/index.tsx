import { FC, memo, useMemo } from "react";
import { formatDefaultTime } from "@/helpers/date";
import { useBooks } from "@/hooks/books";
import Link from "next/link";
import ImageWithFallback from "../ImageWithFallback";

import styles from "./BookItem.module.scss";

import type { BookItemType } from "@/entities/Book";
import { Delete, FavFill, FavOutline } from "../Icon";
import { useModal } from "../Modal/ModalContext";

interface Props {
  data: BookItemType & { isLocal?: boolean };
}

const BookItem: FC<Props> = (props) => {
  const { data } = props;
  const { handleSetFavorite, isFavorite, handleDelete } = useBooks(data);

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
          {data.isLocal ? (
            <img
              className={styles.cover}
              src={data.cover}
              alt={data.title}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/No-Image-Placeholder.svg";
              }}
            />
          ) : (
            <ImageWithFallback
              width={64}
              height={97}
              src={data.cover}
              alt={data.title}
              className={styles.cover}
              fallbackSrc="/No-Image-Placeholder.svg"
            />
          )}
          {data.isLocal ? (
            data.title
          ) : (
            <Link
              href={{
                pathname: `/${data.id}`,
              }}
            >
              {data.title}
            </Link>
          )}
        </div>
      </td>
      <td>{data.author}</td>
      <td>{publicationDate}</td>
      <td>
        <button className={styles.actionBtn} onClick={handleSetFavorite}>
          {isFavorite ? <FavFill fill="#1ed760" /> : <FavOutline />}
        </button>

        {/* show action button (delete and edit) when data is from local */}
        {data.isLocal && (
          <>
            <button
              className={styles.actionBtn}
              onClick={() => handleDelete(data.id)}
            >
              <Delete />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default memo(BookItem);
