import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

function Modal({ title, children, onModalToggle, modalToggle }) {
  if (!modalToggle) return null;

  return (
    <div className="backdrop" onClick={() => onModalToggle(false)}>
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <button onClick={() => onModalToggle(false)}>
            <XCircleIcon className="icon close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
