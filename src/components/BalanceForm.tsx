import { useForm } from "react-hook-form";
import { setBalance, useTransactionStore } from "../stores/transactionStore";

interface TransactionFormProps {
    onSubmit: (balance?: number) => void;
}

export const BalanceForm = ({ onSubmit }: TransactionFormProps) => {
    const balance = useTransactionStore((state) => state.balance);

    const { register, handleSubmit } = useForm<{ balance: number }>({
        defaultValues: {
            balance,
        },
    });

    const handleFormSubmit = ({ balance }: { balance: number }) => {
        setBalance(balance);
        onSubmit(balance);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
            <input
                step={0.01}
                type="number"
                placeholder="Current Balance"
                className="block input input-bordered w-full"
                inputMode="decimal"
                {...register("balance", { required: true, valueAsNumber: true })}
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
