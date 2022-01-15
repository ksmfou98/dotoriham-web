import { mediaSize } from "lib/styles/media";
import React from "react";
import styled from "styled-components";
import GlobalStyles from "./lib/styles/globalStyles";
import Routing from "./routes/Routing";

function App() {
  return (
    <AppWrapper>
      <GlobalStyles />
      <MainLayout>
        <Routing />
      </MainLayout>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const MainLayout = styled.main`
  width: ${mediaSize.desktop}px;
  margin: 0 auto;
  flex: 1 auto;
  display: flex;
  flex-direction: column;
`;

export default App;
