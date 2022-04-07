import Header from "components/header";
import { mediaSize } from "lib/styles/media";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled from "styled-components";
import GlobalStyles from "./lib/styles/globalStyles";
import Routing from "./routes/Routing";
import "react-toastify/dist/ReactToastify.css";
import ToastContainerStyled from "lib/styles/toastStyle";
import useCheckLogin from "hooks/useCheckLogin";
import Footer from "components/footer";

function App() {
  const queryClient = new QueryClient();
  useCheckLogin();

  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <GlobalStyles />
        <Header />
        <MainLayout>
          <Routing />
        </MainLayout>
        <Footer />
      </AppWrapper>
      <ReactQueryDevtools />
      <ToastContainerStyled
        hideProgressBar
        position="bottom-center"
        autoClose={2000}
        closeOnClick
        pauseOnHover
        closeButton={false}
        theme="dark"
      />
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
