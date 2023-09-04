import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  modalClassName?: string;
}

function Modal({ modalClassName, children }: Props) {
  return (
    <div
      className={classNames(
        "fixed top-[30%] left-[50%] translate-x-[-50%]  z-10",
        "bg-[#f5fdff]",
        "px-2 py-4",
        "rounded-sm",
        modalClassName,
      )}
    >
      {children}
    </div>
  );
}

export default Modal;
