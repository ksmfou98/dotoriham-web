import Header from "components/header";
import { mediaSize } from "lib/styles/media";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled from "styled-components";
import GlobalStyles from "./lib/styles/globalStyles";
import Routing from "./routes/Routing";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <GlobalStyles />
        <Header />
        <MainLayout>
          <Routing />
        </MainLayout>
      </AppWrapper>
      <ReactQueryDevtools />
    </QueryClientProvider>
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
