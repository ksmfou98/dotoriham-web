import Header from "components/header";
import { breakpoints } from "lib/styles/media";
import React from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import styled from "styled-components";
import GlobalStyles from "./lib/styles/globalStyles";
import Routing from "./routes/Routing";
import "react-toastify/dist/ReactToastify.css";
import ToastContainerStyled from "lib/styles/toastStyle";
import useCheckLogin from "hooks/useCheckLogin";
import Footer from "components/footer";
import useLoggedInUserReplace from "hooks/useLoggedInUserReplace";
import useInitialRegisterEffect from "hooks/useInitialRegisterEffect";

function App() {
  useCheckLogin();
  useLoggedInUserReplace();
  useInitialRegisterEffect();
  return (
    <>
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
    </>
  );
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const MainLayout = styled.main`
  width: ${breakpoints.desktop}px;
  margin: 0 auto;
  flex: 1 auto;
  display: flex;
  flex-direction: column;
`;

export default App;
