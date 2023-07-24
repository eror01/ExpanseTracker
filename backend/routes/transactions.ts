import { Router } from "express";
import * as Expense from "../controllers/expense";
import * as Income from "../controllers/income";

const router: Router = Router();

router
  .post("/add-income", Income.addIncome)
  .get("/get-incomes", Income.getIncomes)
  .delete("/delete-income/:id", Income.deleteIncome)
  .post("/add-expense", Expense.addExpense)
  .get("/get-expenses", Expense.getExpenses)
  .delete("/delete-expense/:id", Expense.deleteExpense);

export default router;
