import { FC, memo, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  total: number;
  perPage: number;
}

const Pagination: FC<PaginationProps> = ({ total, perPage }) => {
  const router = useRouter();

  const {
    query: { page = 1 },
  } = router;

  // Get total pages by round up total items / items per page
  const totalPage = useMemo(() => Math.ceil(total / perPage), [total, perPage]);
  const items = useMemo(
    () => Array.from({ length: totalPage }, (_, index) => index + 1),
    [totalPage]
  );

  return (
    <div className={`${styles.pagination} flex align-items justify-center`}>
      {items.map((item, key) => (
        <Link
          className={`${styles.link} ${+page === item && styles.active}`}
          href={{
            query: {
              page: item,
            },
          }}
          key={key}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default memo(Pagination);
