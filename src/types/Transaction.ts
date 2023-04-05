export interface Transaction {
    id: string;
    description: string;
    startDate: string;
    interval: string | null;
    amount: number;
}
