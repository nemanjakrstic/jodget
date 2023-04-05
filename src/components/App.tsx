import dayjs, { Dayjs } from "dayjs";
import { Duration } from "dayjs/plugin/duration";
import { useMemo, useState } from "react";
import { AxisOptions, Chart } from "react-charts";
import { addTransaction, removeTransaction, useTransactionStore } from "../stores/transactionStore";
import { Transaction } from "../types/Transaction";
import { BalanceForm } from "./BalanceForm";
import { TransactionForm } from "./TransactionForm";
import { ModalButton } from "./Modal";
import { Tab, TabGroup } from "./Tab";

export const App = () => {
    const transactions = useTransactionStore((state) => state.transactions);
    const balance = useTransactionStore((state) => state.balance);
    const [showModal, setShowModal] = useState(false);
    const [tab, setTab] = useState(0);

    const handleSubmit = (transaction: Transaction) => {
        addTransaction(transaction);
    };

    const { data, primaryAxis, secondaryAxes } = useChartOptions(transactions, balance);

    return (
        <div className="container mx-auto py-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
                <BalanceForm value={balance} onChange={(balance) => useTransactionStore.setState({ balance })} />
            </div>

            <button onClick={() => setShowModal(true)}>Create</button>

            <ModalButton open={showModal}>
                <TransactionForm onSubmit={handleSubmit} onCancel={() => setShowModal(false)} />
            </ModalButton>

            <TabGroup>
                <Tab isActive={tab === 0} onClick={() => setTab(0)}>
                    Chart
                </Tab>

                <Tab isActive={tab === 1} onClick={() => setTab(1)}>
                    Data
                </Tab>
            </TabGroup>

            {tab === 0 ? (
                <div className="h-96 mb-4">
                    <Chart options={{ data, primaryAxis, secondaryAxes }} />
                </div>
            ) : null}

            {tab === 1 ? <div className="h-96 mb-4">TODO</div> : null}

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
                            <td>{transaction.startDate}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.interval}</td>
                            <td>{transaction.amount}</td>

                            <td>
                                <button onClick={() => removeTransaction(transaction.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="mt-96" onClick={() => useTransactionStore.setState({ transactions: [] })}>
                Nuke
            </button>
        </div>
    );
};

interface Balance {
    date: Date;
    balance: number;
}

const buildData = (transactions: Transaction[], balance: number) => {
    const data: Balance[] = [];
    let currentBalance = balance;
    let currentDate = dayjs();
    const endDate = dayjs().add(3, "months").endOf("month");

    while (currentDate.isBefore(endDate)) {
        for (const transaction of transactions) {
            if (currentDate.isSame(transaction.startDate, "date")) {
                currentBalance += transaction.amount;
            } else if (transaction.interval) {
                const duration = parseDuration(transaction.interval);
                const nextDate = getNextDate(dayjs(transaction.startDate), currentDate, duration);

                if (currentDate.isSame(nextDate, "date")) {
                    currentBalance += transaction.amount;
                }
            }
        }

        data.push({ date: currentDate.startOf("day").toDate(), balance: currentBalance });
        currentDate = currentDate.add(1, "day");
    }

    return data;
};

const parseDuration = (input: string) => {
    const [value, unit] = input.trim().split(":");
    return dayjs.duration({ [unit]: parseInt(value) });
};

const isSameDate = (left: any, right: any) => {
    return dayjs(left).format("YYYY-MM-DD") === dayjs(right).format("YYYY-MM-DD");
};

const getNextDate = (date: Dayjs, now: Dayjs, duration: Duration) => {
    let currentDate = date;

    while (currentDate.isBefore(now, "date")) {
        currentDate = currentDate.add(duration);
    }

    return currentDate;
};

const useChartOptions = (transactions: Transaction[], balance: number) => {
    const data = useMemo(() => {
        const data = buildData(transactions, balance);
        const zero = data.map((datum) => ({ date: datum.date, balance: 0 }));

        return [
            { label: "Budget", data },
            { label: "Zero", data: zero },
        ];
    }, [transactions, balance]);

    const primaryAxis = useMemo<AxisOptions<Balance>>(() => ({ getValue: (datum) => datum.date }), []);
    const secondaryAxes = useMemo<AxisOptions<Balance>[]>(() => [{ getValue: (datum) => datum.balance }], []);

    return { data, primaryAxis, secondaryAxes };
};
