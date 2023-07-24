import {
  ArcElement,
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";
import { Line } from "react-chartjs-2";

ChartJs.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Transaction {
  date?: Date | null;
  amount?: number | null;
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

const Chart: React.FC = () => {
  const { incomes, expenses } = useGlobalContext();

  const data = {
    labels: incomes.map((inc: Transaction) => dateFormat(inc.date!)),
    datasets: [
      {
        label: "Income",
        data: incomes.map((income: Transaction) => income.amount),
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: expenses.map((expense: Transaction) => expense.amount),
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
};

export default Chart;
