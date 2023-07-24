import cors from "cors";
import express, { Express } from "express";
import { readdirSync } from "fs";
import db from "./db/db";
import TransactionRoutes from "./routes/transactions";
const app: Express = express();

require("dotenv").config();

const PORT: number = parseInt(process.env.PORT || "3000", 10);

// middlewares
app.use(express.json());
app.use(cors());

try {
  app.use("/api/v1", TransactionRoutes);
} catch (error) {
  console.error("Error loading route:", error);
}

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("Listening to port:", PORT);
  });
};

server();
