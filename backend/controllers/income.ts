import { Request, Response } from "express";
import IncomeModel, { IIncome } from "../models/IncomeModel";

export const addIncome = async (req: Request, res: Response): Promise<void> => {
  const { title, amount, category, description, date } = req.body;

  const income: IIncome = new IncomeModel({
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
    }
    if (amount < 0) {
      res.status(400).json({ message: "Amount must be positive!" });
    }
    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getIncomes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const incomes: IIncome[] = await IncomeModel.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteIncome = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedIncome: IIncome | null = await IncomeModel.findByIdAndDelete(
      id
    );
    if (!deletedIncome) {
      res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({ message: "Income Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
