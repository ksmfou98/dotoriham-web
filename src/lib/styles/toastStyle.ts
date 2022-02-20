import styled from "styled-components";
import { ToastContainer } from "react-toastify";

const ToastContainerStyled = styled(ToastContainer)`
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

export default ToastContainerStyled;
