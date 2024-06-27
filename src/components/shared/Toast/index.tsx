import React from "react";
import styles from "./Toast.module.scss";

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className={styles.toast}>
      {message}
    </div>
  );
};

export default Toast;
