import dayjs, { Dayjs } from "dayjs";
import { Transaction } from "../types/Transaction";
import { Duration } from "dayjs/plugin/duration";
import { Balance } from "../types/Balance";

export const buildData = (transactions: Transaction[], balance: number) => {
    const data: Balance[] = [];
    let currentBalance = balance;
    let currentDate = dayjs();
    const endDate = dayjs().add(3, "months").endOf("month");

    while (currentDate.isBefore(endDate)) {
        for (const transaction of transactions) {
            if (currentDate.isSame(transaction.dueDate, "date")) {
                currentBalance += transaction.amount;
            } else if (transaction.interval) {
                const duration = parseDuration(transaction.interval);
                const nextDate = getNextDate(dayjs(transaction.dueDate), currentDate, duration);

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

const getNextDate = (date: Dayjs, now: Dayjs, duration: Duration) => {
    let currentDate = date;

    while (currentDate.isBefore(now, "date")) {
        currentDate = currentDate.add(duration);
    }

    return currentDate;
};
