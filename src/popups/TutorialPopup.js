import React from "react";
import styled from "styled-components";
import CancelIcon from "@material-ui/icons/Cancel";

function TutorialPopup({ setTutorialPopupState }) {
  return (
    <StyledTutorialPopup>
      <CancelIcon onClick={() => setTutorialPopupState(false)} />
      <h3>Spēles instrukcija</h3>
      <hr />

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/vF2bmb_M6xo"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </StyledTutorialPopup>
  );
}
const StyledTutorialPopup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  z-index: 1000;
  padding-top: 40px;

  > .MuiSvgIcon-root {
    position: absolute;
    top: 15px;
    right: 50px;
    font-size: 30px;
    cursor: pointer;
  }

  > h3 {
    color: #3f3f3f;
    font-size: 30px;
    margin-top: 40px;
  }

  hr {
    margin-top: 95px;
    height: 3px;
    border: none;
    background-color: #990000;
    background-image: linear-gradient(147deg, #990000 0%, #ff0000 74%);
    border-radius: 60px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    position: absolute;
  }

  > iframe {
    margin-top: 50px;
    display: block;
    width: 95%;
    max-width: 1280px;
    height: 60%;
    max-height: 720px;
    min-width: 320px;
    min-height: 180px;
    box-shadow: 0 10px 40px rgba(159, 162, 177, 0.8);
    border: 5px solid #a4a4a4;
  }
  @media (min-height: 871px) {
    iframe {
      height: 70%;
    }
  }
`;

export default TutorialPopup;
