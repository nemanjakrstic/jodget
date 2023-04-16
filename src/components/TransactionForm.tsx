import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { IntervalCopy, Transaction } from "../types/Transaction";
import { addTransaction, updateTransaction } from "../stores/transactionStore";

interface TransactionFormProps {
    onSubmit: () => void;
    defaultValues?: Transaction;
}

export const TransactionForm = ({ onSubmit, defaultValues }: TransactionFormProps) => {
    const { register, handleSubmit, reset } = useForm<Transaction>({
        defaultValues: defaultValues ?? { id: v4(), dueDate: dayjs().format("YYYY-MM-DD") },
    });

    const handleFormSubmit = (transaction: Transaction) => {
        if (defaultValues) {
            updateTransaction(transaction);
        } else {
            addTransaction(transaction);
        }

        onSubmit();
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
                {...register("dueDate", { required: true })}
            />

            <select className="block input input-bordered w-full" {...register("interval")}>
                {Object.entries(IntervalCopy).map(([interval, label]) => (
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

                <button className="block btn btn-ghost w-full" type="button" onClick={() => onSubmit()}>
                    Cancel
                </button>
            </div>
        </form>
    );
};
