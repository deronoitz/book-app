import { FC, memo } from "react";
import styles from "./IndexHeader.module.scss";

interface HeaderType {
  total: number;
}

const IndexHeader: FC<HeaderType> = (props) => {
  return (
    <div className={`${styles.header} flex items-center justify-between w-full`}>
      <div>
        <h1>Book Collections</h1>
        <p>
          Created by{" "}
          <a href="https://github.com/deronoitz" target="_blank">
            Widi Baskoro Aji
          </a>{" "}
          · {props.total} Books
        </p>
      </div>
    </div>
  );
};

export default memo(IndexHeader);
