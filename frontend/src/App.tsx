import { useMemo, useState } from "react";
import { styled } from "styled-components";
import Dashboard from "./components/Dashboard/Dashboard";
import Expenses from "./components/Expenses/Expenses";
import Incomes from "./components/Incomes/Incomes";
import Navigation from "./components/Navigation/Navigation";
import Orb from "./components/Orb/Orb";
import bg from "./img/expense_tracker_bg.png";
import { MainLayout } from "./styles/Layouts";
import { useGlobalContext } from "./context/globalContext";

const App: React.FC = () => {
  const [active, setActive] = useState<number>(1);

  const global = useGlobalContext();

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Incomes />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
};

interface AppStyledProps {
  bg: string;
}

const AppStyled = styled.div<AppStyledProps>`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
