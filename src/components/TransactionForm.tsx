import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { Transaction } from "../types/Transaction";
import dayjs from "dayjs";

interface TransactionFormProps {
    onSubmit: (value: Transaction) => void;
    onCancel?: () => void;
}

console.log({
    date: new Date(),
    dayjs: dayjs().toDate(),
});

const repeats = {
    "1:day": "Daily",
    "1:week": "Weekly",
    "2:weeks": "Bi-Weekly",
    "1:month": "Monthly",
};

export const TransactionForm = ({ onSubmit, onCancel }: TransactionFormProps) => {
    const { register, handleSubmit, reset } = useForm<Transaction>({
        defaultValues: {
            startDate: dayjs().format("YYYY-MM-DD"),
        },
    });

    const handleFormSubmit = (transaction: Transaction) => {
        onSubmit({ ...transaction, id: v4(), interval: transaction.interval || null });
        reset();
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
            <input
                autoFocus
                type="text"
                placeholder="Description"
                className="block input input-bordered w-full"
                {...register("description", { required: true })}
            />

            <input
                placeholder="Due Date"
                className="block input input-bordered w-full"
                type="date"
                {...register("startDate", { required: true, valueAsDate: true })}
            />

            <select className="block input input-bordered w-full" {...register("interval")}>
                <option value="">No repeat</option>

                {Object.entries(repeats).map(([interval, label]) => (
                    <option key={interval} value={interval}>
                        {label}
                    </option>
                ))}
            </select>

            <input
                step={0.01}
                type="number"
                placeholder="Amount"
                className="block input input-bordered w-full"
                inputMode="decimal"
                {...register("amount", { required: true, valueAsNumber: true })}
            />

            <div className="grid grid-cols-2 gap-4">
                <button className="block btn w-full" type="submit">
                    Save
                </button>

                <button className="block btn btn-ghost w-full" type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};
