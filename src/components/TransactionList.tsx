import { useState } from "react";
import { removeTransaction, useTransactionStore } from "../stores/transactionStore";
import { formatAmount } from "../utils/format";
import { Modal } from "./Modal";
import { IntervalCopy, Transaction } from "../types/Transaction";
import { TransactionForm } from "./TransactionForm";
import dayjs from "dayjs";

export const TransactionList = () => {
    const transactions = useTransactionStore((state) => state.transactions);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    return (
        <>
            <Modal open={selectedTransaction !== null}>
                {selectedTransaction ? (
                    <TransactionForm
                        defaultValues={selectedTransaction}
                        onSubmit={() => setSelectedTransaction(null)}
                    />
                ) : null}
            </Modal>

            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th>Due Date</th>
                        <th>Description</th>
                        <th>Interval</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr className="hover" key={index}>
                            <td>{dayjs(transaction.dueDate).format("L")}</td>
                            <td>{transaction.description}</td>
                            <td>{IntervalCopy[transaction.interval]}</td>
                            <td>{formatAmount(transaction.amount)}</td>

                            <td className="text-right">
                                <button onClick={() => setSelectedTransaction(transaction)}>Edit</button> &middot;{" "}
                                <button onClick={() => removeTransaction(transaction.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
