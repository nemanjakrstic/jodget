export interface Transaction {
    id: string;
    description: string;
    dueDate: string;
    interval: keyof typeof IntervalCopy;
    amount: number;
}

export const IntervalCopy = {
    "": "No repeat",
    "1:day": "Daily",
    "1:week": "Weekly",
    "2:weeks": "Bi-weekly",
    "4:weeks": "Every 4 weeks",
    "1:month": "Monthly",
} as const;
