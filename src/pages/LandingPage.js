import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import db from "../private/firebase";
import Nav from "../navigation/Nav";
import SendEmailPopup from "../landingPagePopup/SendEmailPopup";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import Regulations from "../popups/Regulations";

function LandingPage({
  gameStarted,
  startFlagged,
  setRulePopupState,
  rulePopupState,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showRegulations, setShowRegulations] = useState(false);
  const [firstnewsState, setFirstNewsState] = useState(false);
  const [secondNewsState, setSecondNewsState] = useState(false);
  const [thirdnewsState, setThirdNewsState] = useState(false);
  const history = useHistory();
  const user = useSelector(selectUser);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <StyledLandingPage>
        <h1 id="virsraksts1">Orientēšanās spēle</h1>
        {!startFlagged && (
          <h5 className="bababoi">
            Lai sāktu spēli aizejat līdz start karodziņam
          </h5>
        )}
        <Button
          onClick={() => {
            if (gameStarted === false) {
              db.collection("users").doc(user.uid).update({
                gameStarted: true,
              });
            }
            history.push("/game");
            if (gameStarted === false) {
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          }}
        >
          {gameStarted ? "Turpināt" : "Sākt spēli"}
        </Button>
        <p id="noteikumi__button" onClick={() => setRulePopupState(true)}>
          Spēles noteikumi
        </p>
        {rulePopupState && (
          <Regulations setRulePopupState={setRulePopupState} />
        )}
        {!showModal && (
          <>
            {!gameStarted && (
              <>
                <h2 className="newsheading">Jaunumi</h2>
                <div className="jaunumi" id="jaunumi1">
                  <div
                    className="news__opener"
                    onClick={() => setFirstNewsState(!firstnewsState)}
                  >
                    <h2>Liepājas ezerā pēta zivis un tām pieejamo barību</h2>
                    {!firstnewsState ? <ExpandMoreIcon /> : <CloseIcon />}
                  </div>
                  <div
                    className={
                      firstnewsState ? "news__content" : "hidden__news--content"
                    }
                  >
                    <img
                      src="https://media.discordapp.net/attachments/819223674091339836/823197044776108072/liepaja1.jpg"
                      alt="info"
                    />
                    <p>
                      Lai izstrādātu jaunus noteikumus Liepājas ezera zivju
                      resursu lietošanai, šonedēļ notiek šajā ūdenstilpē esošās
                      zivju populācijas un tām pieejamās barības pētījumi.
                      Pētījuma veicēji, kas zivju resursus šovasar apseko arī
                      citviet Latvijā, uzskata – šādiem pētījumiem būtu jānotiek
                      regulāri, nevis ar 15 gadus ilgu intervālu kā tas noticis,
                      piemēram, Liepājas ezera gadījumā.{" "}
                    </p>
                  </div>
                </div>
                <div className="jaunumi" id="jaunumi2">
                  <div
                    className="news__opener"
                    onClick={() => setSecondNewsState(!secondNewsState)}
                  >
                    <h2>
                      Liepājas pludmalē atklāts jauns vides objekts «Vēja
                      paviljons»
                    </h2>
                    {!secondNewsState ? <ExpandMoreIcon /> : <CloseIcon />}
                  </div>
                  <div
                    className={
                      secondNewsState
                        ? "news__content"
                        : "hidden__news--content"
                    }
                  >
                    <img
                      src="https://media.discordapp.net/attachments/819223674091339836/823197046269673552/Liepaja2.png"
                      alt="info"
                    />
                    <p>
                      {" "}
                      Aizvadītajā nedēļas nogalē Liepājas pludmalē tika
                      uzstādīts jauns vides objekts – mākslinieka Ērika Boža
                      “Vēja paviljons”. Tas tapis, izmantojot vecus logus un
                      durvis no visas Latvijas. Instalācija ir viens no desmit
                      atbalstītajiem projektiem publiskās mākslas programmā
                      “Kopā”, kas īstenota kā atbalsta mehānisms vizuālās
                      mākslas pārstāvjiem Covid-19 krīzes pārvarēšanai.
                    </p>
                  </div>
                </div>
                <div className="jaunumi" id="jaunumi3">
                  <div
                    className="news__opener"
                    onClick={() => setThirdNewsState(!thirdnewsState)}
                  >
                    <h2>
                      Karostas cietuma muzejs atvēris durvis apmeklētājiem{" "}
                    </h2>
                    {!thirdnewsState ? <ExpandMoreIcon /> : <CloseIcon />}
                  </div>
                  <div
                    className={
                      thirdnewsState ? "news__content" : "hidden__news--content"
                    }
                  >
                    <img
                      src="https://media.discordapp.net/attachments/819223674091339836/823197048299847680/Liepaja3.jpg"
                      alt="info"
                    />
                    <p>
                      Kopš aprīļa sākuma viens no Liepājas populārākajiem
                      tūrisma objektiem – Karostas cietums – ir atvērts. Gidu
                      vadītās ekskursijas aizrit, ievērojot noteiktos drošības
                      pasākumus. Lēmums atsākt darbu pieņemts pēc tam, kad daļai
                      darbinieku par martu atteikta dīkstāves pabalstu izmaksa.
                      Tomēr izredzes nopelnīt ar tūristiem šobrīd izskatās
                      vājas, jo aprīlī Karostas cietumu apmeklējuši tikai 37
                      interesenti.{" "}
                    </p>
                  </div>
                </div>
              </>
            )}
            <p id="help" onClick={openModal}>
              Palīdzība
            </p>
          </>
        )}

        <SendEmailPopup showModal={showModal} setShowModal={setShowModal} />
      </StyledLandingPage>
      {gameStarted && <Nav />}
    </>
  );
}

const StyledLandingPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: sticky;
  align-items: center;
  padding: 2rem;
  animation: pageInanimation 0.75s;

  #noteikumi__button {
    z-index: 101;
  }

  > .bababoi {
    text-align: center;
    color: #696969;
    font-size: 1rem;
  }

  @keyframes pageInanimation {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  > button {
    color: #f5f5f5;
    z-index: 300;
    font-weight: bold;
    cursor: pointer;
    margin-top: 80px;
    border-radius: 50px;
    width: 30%;
    height: 50px;
    background: linear-gradient(147deg, #f71735 0%, #db3445 74%);
    min-width: 250px;
    background-size: 400% 400%;
    animation: gradient 10s ease infinite;

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

  > p {
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    overflow: hidden;
    cursor: pointer;
    margin-top: 30px;
    font-weight: bold;
    color: #707070;
  }

  .newsheading {
    margin-top: 50px;
  }

  > p:before {
    content: "";
    position: absolute;
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

  p:hover:before,
  p:focus:before,
  p:active:before {
    right: 0;
  }

  #help {
    z-index: 100;
  }

  #virsraksts1 {
    text-align: center;
  }

  .jaunumi {
    width: 100%;
    max-width: 600px;
    height: fit-content;
    border-radius: 10px;
    margin-top: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    > .news__opener {
      height: 100px;
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 10px;
      background: #f2f2f2;
      z-index: 200;
      align-items: center;
      > h2 {
        font-size: 16px;
      }
    }
    > .news__content {
      transform: translateY(0%);
      width: 100%;
      padding: 10px;
      > img {
        width: 100%;
        margin: 10px 0;
      }
    }
    > .hidden__news--content {
      transform: translateY(-100%);
      opacity: 0;
      z-index: 100;
      position: absolute;
      width: 100%;
      padding: 10px;
      > img {
        width: 100%;
        margin: 10px 0;
      }
    }
  }

  .jaunumi > img {
    width: 250px;
    height: auto;
    border-radius: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .jaunumi > p {
    margin: 20px;
    font-family: Roboto, sans-serif;
    font-style: italic;
  }

  > hr {
    width: 100%;
    margin-top: 50px;
    height: 3px;
    background-color: darkgray;
    border: none;
  }

  #virsraksts1 {
    font-family: "Lobster", cursive;
    font-size: 42px;
    color: #707070;
    margin: 30px 0;
  }
  @media (max-width: 320px) {
    h1 {
      font-size: 42px;
    }
  }
`;
export default LandingPage;
