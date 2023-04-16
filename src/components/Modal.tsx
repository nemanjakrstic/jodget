import { noop } from "lodash";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    open: boolean;
    children: ReactNode;
}

export const Modal = ({ open, children }: ModalProps) => {
    return createPortal(
        <>
            <input type="checkbox" className="modal-toggle" checked={open} onChange={noop} />
            <div className="modal">
                <div className="modal-box">{children}</div>
            </div>
        </>,
        document.querySelector("#modal-root")!,
    );
};
