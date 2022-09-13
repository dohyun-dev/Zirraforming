import { RecoilRoot } from "recoil";
import styled from "styled-components";
import Router from "./Router";

const Test = styled.div`
  font-family: ${(props) => props.theme.titleFont};
`;

function App() {
  return (
    <RecoilRoot>
      <Router></Router>
    </RecoilRoot>
  );
}

export default App;
