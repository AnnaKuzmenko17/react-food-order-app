import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({children, open, className}) {
  const modal = useRef();

  useEffect(() => {
    const dialog = modal.current;

    if(open) {
      dialog.showModal();
    }

    return () => {
      dialog.close()
    }
  
  }, [open])

  const cssClasses = `modal ${className}`;

  return (
    createPortal(
    <dialog ref={modal} className={cssClasses}>
      {children}
    </dialog>, document.getElementById('modal'))
  );

}