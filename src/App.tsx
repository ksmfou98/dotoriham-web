import Header from "components/header";
import { mediaSize } from "lib/styles/media";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled from "styled-components";
import GlobalStyles from "./lib/styles/globalStyles";
import Routing from "./routes/Routing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = new QueryClient();

  const toastClass = {
    big: "big-toast",
    small: "small-toast",
  };

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
      <StyledContainer
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

const StyledContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    width: auto;
  }
  .small-toast {
    width: 273px;
  }
  .big-toast {
    width: 471px;
  }
  .Toastify__toast {
    min-height: 42px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
  }
`;

export default App;
