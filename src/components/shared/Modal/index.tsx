import React, { ReactNode } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  title: string;
  onClose: () => void;
  children?: ReactNode;
  visible: boolean | void;
}

const Modal: React.FC<ModalProps> = ({ title, children, visible, onClose }) => {
  return (
    <>
      {visible && (
        <div className={styles.modalContainer}>
          <div className={styles.modalBox}>
            <div className={`flex items-center justify-between ${styles.header}`}>
              <h2>{title}</h2>
              <button onClick={onClose} className={styles.closeBtn}>X</button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
