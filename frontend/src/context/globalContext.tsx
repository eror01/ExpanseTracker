import React, { ReactNode, useContext, useState } from "react";
import axios, { Axios, AxiosError } from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

export interface Income {
  _id?: string | null;
  title?: string;
  amount?: number;
  type?: string;
  category?: string;
  description?: string;
  date?: Date | null;
  createdAt?: Date;
}

export interface Expense {
  _id?: string | null;
  title?: string;
  amount?: number;
  type?: string;
  date?: Date | null;
  category?: string;
  description?: string;
  createdAt?: Date;
}

interface GlobalContextValues {
  addIncome: (income: Income) => void;
  getIncomes: () => void;
  incomes: Income[];
  expenses: Expense[];
  deleteIncome: (id: string) => void;
  totalIncome: () => number;
  addExpense: (expense: Expense) => void;
  getExpenses: () => void;
  deleteExpense: (id: string) => void;
  totalExpense: () => number;
  totalBalance: () => number;
  transactionHistory: () => (Income | Expense)[];
  error: string | null;
  setError: (error: string | null) => void;
}

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalContext = React.createContext<GlobalContextValues>(
  {} as GlobalContextValues
);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addIncome = async (income: Income) => {
    try {
      const response = await axios.post(`${BASE_URL}/add-income`, income);
      getIncomes();
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get<Income[]>(`${BASE_URL}/get-incomes`);
      setIncomes(response.data);
    } catch (err) {
      setError("Server Error");
    }
  };

  const deleteIncome = async (id: string) => {
    try {
      const res = await axios.delete(`${BASE_URL}/delete-income/${id}`);
      getIncomes();
    } catch (err) {
      setError("Server Error");
    }
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += income.amount || 0;
    });

    return totalIncome;
  };

  // Calculate expenses
  const addExpense = async (expense: Expense) => {
    try {
      const response = await axios.post(`${BASE_URL}/add-expense`, expense);
      getExpenses();
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get<Expense[]>(`${BASE_URL}/get-expenses`);
      setExpenses(response.data);
    } catch (err) {
      setError("Server Error");
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const res = await axios.delete(`${BASE_URL}/delete-expense/${id}`);
      getExpenses();
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message);
    }
  };

  const totalExpense = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense += expense.amount || 0;
    });

    return totalExpense;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpense();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return (
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
    });
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        error,
        setError,
        addIncome,
        getIncomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpense,
        totalBalance,
        transactionHistory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextValues => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider.");
  }
  return context;
};
