import { createPortal } from "react-dom";
import style from "./modal.module.scss";
export function Modal({ children }) {
  return createPortal(
    <dialog open className={style.dialogContainer}>
      {children}
    </dialog>,
    document.body
  );
}
