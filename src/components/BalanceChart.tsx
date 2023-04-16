import { AxisOptions, Chart } from "react-charts";
import { useTransactionStore } from "../stores/transactionStore";
import { Transaction } from "../types/Transaction";
import { useMemo } from "react";
import { buildData } from "../models/Transaction";
import { Balance } from "../types/Balance";

export const BalanceChart = () => {
    const transactions = useTransactionStore((state) => state.transactions);
    const balance = useTransactionStore((state) => state.balance);
    const { data, primaryAxis, secondaryAxes } = useChartOptions(transactions, balance);

    return (
        <div className="h-96 mb-4">
            <Chart options={{ data, primaryAxis, secondaryAxes }} />
        </div>
    );
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
