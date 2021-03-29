import React from "react";
import styled from "styled-components";

function WarningPopup() {
  return (
    <StyledWarningPopup>
      <h2>Uzmanību, atgriezities pilsētas robežās</h2>
    </StyledWarningPopup>
  );
}
const StyledWarningPopup = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  padding: 20px;
  width: 100%;
  animation: animateWarning 2s infinite ease;
  text-align: center;
  @keyframes animateWarning {
    0% {
      background: #dd2525;
      color: #e4e427;
    }
    25% {
      background: #f64600;
      color: #ffff0b;
    }
    50% {
      background: #a82121;
      color: #faa810;
    }
    75% {
      background: #fd2a2a;
      color: #f09e06;
    }
    100% {
      background: #dd2525;
      color: #e4e427;
    }
  }
`;

export default WarningPopup;
