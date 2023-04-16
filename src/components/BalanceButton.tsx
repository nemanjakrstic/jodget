import { useState } from "react";
import { useTransactionStore } from "../stores/transactionStore";
import { BalanceForm } from "./BalanceForm";
import { Modal } from "./Modal";
import { formatAmount } from "../utils/format";

export const BalanceButton = () => {
    const balance = useTransactionStore((state) => state.balance);
    const [showBalanceModal, setShowBalanceModal] = useState(false);

    return (
        <>
            <button className="btn btn-ghost normal-case text-xl" onClick={() => setShowBalanceModal(true)}>
                Balance: {formatAmount(balance)}
            </button>

            <Modal open={showBalanceModal}>
                <BalanceForm onSubmit={() => setShowBalanceModal(false)} />
            </Modal>
        </>
    );
};
