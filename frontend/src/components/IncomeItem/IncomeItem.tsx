import { styled } from "styled-components";
import * as Icon from "../../utils/icons";
import { dateFormat } from "../../utils/dateFormat";
import Button from "../Button/Button";

interface IncomeItemProps {
  id: string;
  title?: string;
  amount?: number;
  date?: Date | null;
  category?: string;
  description?: string;
  deleteItem: (id: string) => void;
  indicatorColor?: string;
  type?: string;
}

function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
}: IncomeItemProps) {
  const categoryIcon = () => {
    const categoryIconObject: {
      [key: string]: React.ReactElement<
        any,
        string | React.JSXElementConstructor<any>
      >;
    } = {
      salary: Icon.money,
      freelancing: Icon.freelance,
      investments: Icon.stocks,
      stocks: Icon.users,
      bitcoin: Icon.bitcoin,
      bank: Icon.card,
      youtube: Icon.yt,
      other: Icon.piggy,
    };

    if (!category) return "";

    return categoryIconObject[category] || "";
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "education":
        return Icon.book;
      case "groceries":
        return Icon.food;
      case "health":
        return Icon.medical;
      case "subscriptions":
        return Icon.tv;
      case "takeaways":
        return Icon.takeaway;
      case "clothing":
        return Icon.clothing;
      case "travelling":
        return Icon.freelance;
      case "other":
        return Icon.circle;
      default:
        return "";
    }
  };

  return (
    <IncomeStyled>
      <div className="icon">
        {type === "expense" ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {Icon.dollar} {amount}
            </p>
            <p>
              {Icon.calender} {date ? dateFormat(date) : "-/-/-"}
            </p>
            <p>
              {Icon.comment}
              {description}
            </p>
          </div>
          <div className="btn-con">
            <Button
              icon={Icon.trash}
              bPad={"1rem"}
              bRad={"50%"}
              bg={"var(--primary-color)"}
              color={"#fff"}
              iColor={"#fff"}
              hColor={"var(--color-green)"}
              onClick={() => {
                if (!id) return;
                deleteItem(id);
              }}
            />
          </div>
        </div>
      </div>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }
    }
  }
`;

export default IncomeItem;
