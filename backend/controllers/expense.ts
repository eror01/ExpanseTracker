const ExpenseSchema = require("../models/ExpenseModel");
import { Request, Response } from "express";
import ExpenseModel, { IExpense } from "../models/ExpenseModel";

export const addExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, amount, category, description, date } = req.body;

  const expense: IExpense = new ExpenseModel({
    title,
    amount,
    category,
    description,
    date,
  });

  const mandatoryFields = !title || !category || !description || !date;

  try {
    if (mandatoryFields) {
      res.status(400).json({ message: "All fields are required!" });
      return;
    }
    if (amount <= 0) {
      res.status(400).json({ message: "Amount must be a positive number!" });
      return;
    }
    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(expense);
};
export const getExpenses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenses: IExpense[] = await ExpenseModel.find().sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedExpense: IExpense | null =
      await ExpenseModel.findByIdAndDelete(id);
    if (!deletedExpense) {
      res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
