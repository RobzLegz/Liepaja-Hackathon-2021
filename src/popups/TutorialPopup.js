import React from "react";
import styled from "styled-components";

function TutorialPopup({ setTutorialPopupState }) {
  return (
    <StyledTutorialPopup>
      <h3>Spēles instrukcija</h3>
      <div className="video__container">
        <iframe
          width="100%"
          height="300"
          src="https://www.youtube.com/watch?v=vF2bmb_M6xo"
          title="Instrukcija"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <button onClick={() => setTutorialPopupState(false)}>Aizvērt</button>
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
  > h3 {
    color: #3f3f3f;
    font-size: 30px;
  }
  > .video__container {
    margin-top: 50px;
    width: 300%;
  }
  > button {
    margin-top: 20px;
    background: #0f0f0f;
    color: #f5f5f5;
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export default TutorialPopup;
