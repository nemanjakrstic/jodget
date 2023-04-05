import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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

export const removeTransaction = (id: string) => {
    useTransactionStore.setState((state) => ({
        ...state,
        transactions: state.transactions.filter((transaction) => transaction.id !== id),
    }));
};

export const setBalance = (balance: number) => {
    useTransactionStore.setState({ balance });
};
