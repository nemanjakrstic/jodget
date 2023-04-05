interface BalanceFormProps {
    value: number;
    onChange: (value: number) => void;
}

export const BalanceForm = ({ value, onChange }: BalanceFormProps) => {
    return (
        <div>
            <label className="block">Balance</label>
            <input type="number" value={value} onChange={(e) => onChange(e.target.valueAsNumber)} />
        </div>
    );
};
