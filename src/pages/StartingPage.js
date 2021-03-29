import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import LiepajaLogo from "../homepageresources/Liepajalogo.png";
import AboutGame from "../popups/AboutGame";
import TutorialPopup from "../popups/TutorialPopup";

function StartingPage({
  setAboutGameState,
  aboutGameState,
  setTutorialPopupState,
  tutorialPopupState,
}) {
  const history = useHistory();

  return (
    <StyledLandingPage>
      <div className="header">
        <img src={LiepajaLogo} alt="lipaja logo" id="liepaja" />
        <p id="game">Orientēšanās spēle</p>
      </div>
      <p id="slogan">Iepazīsti pilsētu un pārbaudi sevi!</p>
      <div id="buttons">
        <div className="login">
          <button
            onClick={() => {
              history.push("/signin");
            }}
            type="submit"
          >
            <span>Ieiet</span>
          </button>
        </div>

        <div className="register">
          <button
            onClick={() => {
              history.push("/login");
            }}
            type="submit"
          >
            <span>Reģistrēties</span>
          </button>
        </div>
      </div>
      {tutorialPopupState && (
        <TutorialPopup setTutorialPopupState={setTutorialPopupState} />
      )}      
      <p id="noteikumi" onClick={() => setAboutGameState(true)}>
        Par spēli
      </p>
      <p
        id="noteikumi"
        onClick={() => setTutorialPopupState(true)}
      >
        Spēles Instrukcija
      </p>
      {aboutGameState && <AboutGame setAboutGameState={setAboutGameState} />}
    </StyledLandingPage>
  );
}
const StyledLandingPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: sticky;
  margin: 0;
  background: whitesmoke;
  align-items: center;
  overflow: hidden;
  padding: 1rem 0;

  img {
    height: 130px;
    width: 350px;
    align-items: center;
    object-fit: cover;
    margin-left: 30px;
  }

  #game {
    font-family: "Lobster", cursive;
    font-size: 24px;
    color: #707070;
    position: sticky;
    margin-top: -25px;
    text-align: center;
  }

  #slogan {
    background: -webkit-linear-gradient(147deg, #990000 0%, #ff0000 74%);
    background-size: 400% 400%;
    animation: gradient 10s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    font-family: "Open Sans Condensed", sans-serif;
    font-size: 24px;
    margin-top: 45px;
    text-align: center;

    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  }

  @media (max-height: 569px) {
    #buttons {
      margin-top: -20px;
    }
  }

  #buttons > .login > button {
    border-radius: 70px;
    height: 50px;
    width: 200px;
    display: inline-block;
    background-color: #f71735;
    background-image: linear-gradient(147deg, #f71735 0%, #db3445 74%);
    color: white;
    font-size: 20px;
    margin-top: 95px;
    border: none;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    vertical-align: middle;
  }

  @-webkit-keyframes buttons {
    0% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
    }
    50% {
      -webkit-transform: translateY(-4px);
      transform: translateY(-4px);
    }
    100% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
    }
  }
  @keyframes buttons {
    0% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
    }
    50% {
      -webkit-transform: translateY(-4px);
      transform: translateY(-4px);
    }
    100% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
    }
  }
  @-webkit-keyframes buttonsfloat {
    100% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
    }
  }
  @keyframes buttonsfloat {
    100% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
    }
  }

  #buttons > .login > button:hover,
  #buttons > .login > button:focus,
  #buttons > .login > button:active {
    -webkit-animation-name: buttons;
    animation-name: buttonsfloat, buttons;
    -webkit-animation-duration: 0.3s, 1.5s;
    animation-duration: 0.3s, 1.5s;
    -webkit-animation-delay: 0s, 0.3s;
    animation-delay: 0s, 0.3s;
    -webkit-animation-timing-function: ease-out, ease-in-out;
    animation-timing-function: ease-out, ease-in-out;
    -webkit-animation-iteration-count: 1, infinite;
    animation-iteration-count: 1, infinite;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-direction: normal, alternate;
    animation-direction: normal, alternate;
  }

  #buttons > .register > button {
    border-radius: 70px;
    height: 50px;
    width: 200px;
    display: inline-block;
    color: #2f2f2f;
    font-size: 20px;
    border: 2px solid lightgray;
    background-color: #fff;
    margin-top: 25px;

    @-webkit-keyframes buttons {
      0% {
        -webkit-transform: translateY(-8px);
        transform: translateY(-8px);
      }
      50% {
        -webkit-transform: translateY(-4px);
        transform: translateY(-4px);
      }
      100% {
        -webkit-transform: translateY(-8px);
        transform: translateY(-8px);
      }
    }
    @keyframes buttons {
      0% {
        -webkit-transform: translateY(-8px);
        transform: translateY(-8px);
      }
      50% {
        -webkit-transform: translateY(-4px);
        transform: translateY(-4px);
      }
      100% {
        -webkit-transform: translateY(-8px);
        transform: translateY(-8px);
      }
    }
    @-webkit-keyframes buttonsfloat {
      100% {
        -webkit-transform: translateY(-8px);
        transform: translateY(-8px);
      }
    }
    @keyframes buttonsfloat {
      100% {
        -webkit-transform: translateY(-8px);
        transform: translateY(-8px);
      }
    }
  }
  #buttons > .login > button:hover,
  #buttons > .login > button:focus,
  #buttons > .login > button:active {
    -webkit-animation-name: buttons;
    animation-name: buttonsfloat, buttons;
    -webkit-animation-duration: 0.3s, 1.5s;
    animation-duration: 0.3s, 1.5s;
    -webkit-animation-delay: 0s, 0.3s;
    animation-delay: 0s, 0.3s;
    -webkit-animation-timing-function: ease-out, ease-in-out;
    animation-timing-function: ease-out, ease-in-out;
    -webkit-animation-iteration-count: 1, infinite;
    animation-iteration-count: 1, infinite;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-direction: normal, alternate;
    animation-direction: normal, alternate;
  }
  @-webkit-keyframes buttons {
    0% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
    }
    50% {
      -webkit-transform: translateY(-4px);
      transform: translateY(-4px);
    }
    100% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
    }
  }
  @keyframes buttons {
    0% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
    }
    50% {
      -webkit-transform: translateY(-4px);
      transform: translateY(-4px);
    }
    100% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
    }
  }
  @-webkit-keyframes buttonsfloat {
    100% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
    }
  }
  @keyframes buttonsfloat {
    100% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
    }
  }

  #buttons > .register > button:hover,
  #buttons > .register > button:focus,
  #buttons > .register > button:active {
    -webkit-animation-name: buttons;
    animation-name: buttonsfloat, buttons;
    -webkit-animation-duration: 0.3s, 1.5s;
    animation-duration: 0.3s, 1.5s;
    -webkit-animation-delay: 0s, 0.3s;
    animation-delay: 0s, 0.3s;
    -webkit-animation-timing-function: ease-out, ease-in-out;
    animation-timing-function: ease-out, ease-in-out;
    -webkit-animation-iteration-count: 1, infinite;
    animation-iteration-count: 1, infinite;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-direction: normal, alternate;
    animation-direction: normal, alternate;
  }

  #noteikumi {
    color: #707070;
    font-weight: bold;
    cursor: pointer;
    margin-top: 30px;
    font-size: 16px;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    position: relative;
    overflow: hidden;
    @media (max-height: 569px) {
      margin-top: 20px;
    }
  }
  #noteikumi:before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    right: 100%;
    bottom: 0;
    background-color: #990000;
    background-image: linear-gradient(147deg, #990000 0%, #ff0000 74%);
    height: 3px;
    border-radius: 80px;
    -webkit-transition-property: right;
    transition-property: right;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }
  #noteikumi:hover:before,
  #noteikumi:focus:before,
  #noteikumi:active:before {
    right: 0;
  }
`;
export default StartingPage;
