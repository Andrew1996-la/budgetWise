export interface IOperation {
    name?: string;
    desc?: string;
    amount?: number;
    date?: string; // дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    type?: 'Profit' | 'Cost';
    categoryId?: string;
}

type Category = {
    id: string;
    name: string;
    photo?: string;
    createdAt: Date;
    updatedAt: Date;
};

//расходы
export type Cost = {
    id: string;
    name: string;
    desc?: string;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    category: Category;
    type: 'Cost';
};

//доходы
export type Profit = {
    id: string;
    name: string;
    desc?: string;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    category: Category;
    type: 'Profit';
};

export type Operation = Profit | Cost;
