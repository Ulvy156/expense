export interface Expense {
  id: string
  name: string
  amount: number
  category: string
  date: string
}

export interface FilterType {
    name?: string,
    category?: string,
    price?: number
}

export interface FilterType {
    name?: string,
    category?: string,
    price?: number
}

export interface ValidationStatus {
  expenseName: boolean;
  price: boolean;
  category: boolean;
  date: boolean;
}


export interface Category {
  id: string;
  name: string;
}
