import { noop } from "lodash";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalButtonProps {
    open: boolean;
    children: ReactNode;
}

export const ModalButton = ({ open, children }: ModalButtonProps) => {
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
