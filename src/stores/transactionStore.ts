import { uniqBy } from "lodash";
import { v4 } from "uuid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Transaction } from "../types/Transaction";

interface TransactionStore {
    transactions: Transaction[];
    balance: number;
}

export const useTransactionStore = create(
    persist<TransactionStore>(
        () => ({
            transactions: [],
            balance: 0,
        }),
        {
            name: "the-budget-transaction-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export const addTransaction = (transaction: Transaction) => {
    useTransactionStore.setState((state) => ({
        ...state,
        transactions: [...state.transactions, transaction],
    }));
};

export const updateTransaction = (updatedTransaction: Transaction) => {
    useTransactionStore.setState((state) => ({
        ...state,
        transactions: state.transactions.map((transaction) =>
            transaction.id === updatedTransaction.id ? updatedTransaction : transaction,
        ),
    }));
};

export const removeTransaction = (id: string) => {
    useTransactionStore.setState((state) => ({
        ...state,
        transactions: state.transactions.filter((transaction) => transaction.id !== id),
    }));
};

export const setBalance = (balance: number) => {
    useTransactionStore.setState({ balance });
};

(() => {
    // Fix same IDs in local storage
    const { transactions } = useTransactionStore.getState();
    const uniqueTransactionIdCount = uniqBy(transactions, (transaction) => transaction.id).length;

    if (uniqueTransactionIdCount !== transactions.length) {
        console.log("Fixing transaction IDs...");

        useTransactionStore.setState({
            transactions: transactions.map((transaction) => ({ ...transaction, id: v4() })),
        });

        console.log("Done.");
    }
})();
