import mongoose, { Document, Model, Schema } from "mongoose";

export interface IIncome extends Document {
  title: string;
  amount: number;
  type: string;
  date: Date;
  category: string;
  description: string;
}

const IncomeSchema: Schema<IIncome> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    type: {
      type: String,
      default: "income",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: "String",
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
  },
  { timestamps: true }
);

const IncomeModel: Model<IIncome> = mongoose.model<IIncome>(
  "Income",
  IncomeSchema
);

export default IncomeModel;
