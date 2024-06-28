import { FC, memo } from "react";
import styles from "./IndexHeader.module.scss";
import { useModal } from "../Modal/ModalContext";
import { MODAL_TYPE as BOOK_MODAL_TYPE } from "../AddBookModal";

interface HeaderType {
  total: number;
}

const IndexHeader: FC<HeaderType> = (props) => {
  const { showModal } = useModal();
  return (
    <div
      className={`${styles.header} flex items-center justify-between w-full`}
    >
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
      <div>
        <button className="btn" onClick={() => showModal(BOOK_MODAL_TYPE)}>
          Add new book
        </button>
      </div>
    </div>
  );
};

export default memo(IndexHeader);
