import dayjs, { Dayjs } from "dayjs";
import { Transaction } from "../types/Transaction";
import { Duration } from "dayjs/plugin/duration";
import { Balance } from "../types/Balance";

export const getBalances = (transactions: Transaction[], currentBalance: number) => {
    return getDates().reduce<Balance[]>((balances, date) => {
        for (const transaction of transactions) {
            if (date.isSame(transaction.dueDate, "date")) {
                currentBalance += transaction.amount;
            } else if (transaction.interval) {
                const duration = parseDuration(transaction.interval);
                const nextDate = getNextDate(dayjs(transaction.dueDate), date, duration);

                if (date.isSame(nextDate, "date")) {
                    currentBalance += transaction.amount;
                }
            }
        }

        balances.push({ balance: currentBalance, date: date.toDate() });

        return balances;
    }, []);
};

const parseDuration = (input: string) => {
    const [value, unit] = input.trim().split(":");
    return dayjs.duration({ [unit]: parseInt(value) });
};

const getNextDate = (date: Dayjs, now: Dayjs, duration: Duration) => {
    let currentDate = date;

    while (currentDate.isBefore(now, "date")) {
        currentDate = currentDate.add(duration);
    }

    return currentDate;
};

export const getDates = (endDate = dayjs().add(3, "months").endOf("month")) => {
    let currentDate = dayjs();
    const dates: Dayjs[] = [];

    while (currentDate.isBefore(endDate)) {
        dates.push(currentDate.startOf("day"));
        currentDate = currentDate.add(1, "day");
    }

    return dates;
};
