export const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", { style: "decimal", minimumFractionDigits: 2 }).format(amount);
};
