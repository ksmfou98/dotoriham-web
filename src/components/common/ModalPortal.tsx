import { ReactNode, ReactPortal } from "react";
import reactDom from "react-dom";

interface ModalProtalProps {
  children: ReactNode;
}

function ModalProtal({ children }: ModalProtalProps): ReactPortal {
  const modalEl = document.getElementById("modal");
  return reactDom.createPortal(children, modalEl!);
}

export default ModalProtal;
