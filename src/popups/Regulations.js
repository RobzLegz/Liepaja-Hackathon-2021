import React from "react";
import styled from "styled-components";
import GavelIcon from "@material-ui/icons/Gavel";
import CancelIcon from "@material-ui/icons/Cancel";

function Regulations({ setRulePopupState }) {
  return (
    <StyledRegulationsPopup>
      <CancelIcon onClick={() => setRulePopupState(false)} />
      <div className="heading__section">
        <h2>Noteikumi</h2>
        <hr />
      </div>
      <div className="main_content">
        <ul>
          <li>
            <p>
              <span>1.</span> Spēlētājam ir pieejamas divas kartes - viena, lai
              pārredzētu visus objektus - otra lai redzētu pieejamos objektus
              redzamības zonā.
            </p>
          </li>
          <li>
            <p>
              <span>2.</span> Ieslēdz savā ierīcē internetu un GPS.
            </p>
          </li>
          <li>
            <p>
              <span>3.</span> Izveido profilu.
            </p>
          </li>
          <li>
            <p>
              <span>4.</span> Sāc spēli vienā no 4 starta punktiem, kas atrodami
              pilnajā kartē, kad uzspiež uz kompasa ikonas.
            </p>
          </li>
          <li>
            <p>
              <span>5.</span> Apmeklē objektus, kuri ir tavā “redzamības zonā”,
              un dodies uz tiem, izvēloties īsāko maršrutu.
            </p>
          </li>
          <li>
            <p>
              <span>6.</span> Nonākot pie kāda no objektiem, izlasi par to
              pieejamo informāciju un atbildi uz jautājumu, ja atbildēji
              nepareizi, tad vari atbildēt uz papildjautājumu.
            </p>
          </li>
          <li>
            <p>
              <span>7.</span> Atbildot pareizi uz jautājumu, tava redzamības
              zona palielināsies 2 reizes.
            </p>
          </li>
          <li>
            <p>
              <span>8.</span> Ja tavā redzamības zonā nav neapmeklētu objektu,
              tad nospiežot kompasa ikonu vari pāriet uz lielo karti, kur atrast
              nākamo apskates objektu.
            </p>
          </li>
          <li>
            <p>
              <span>9.</span> Apceļojot pilsētas objektus ar iespējami mazāko
              punktu skaitu, tu palielini savu iespēju būt ātrāko spēlētājuj
              sarakstā.
            </p>
          </li>
          <li id="last">
            <p>
              <span>10.</span> Kartes var mainīt uzspiežot uz kompasa ikonas
            </p>
          </li>
        </ul>
      </div>
    </StyledRegulationsPopup>
  );
}
const StyledRegulationsPopup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  z-index: 500;
  padding: 30px;
  padding-bottom: 100px;

  > .MuiSvgIcon-root {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 30px;
  }

  > .heading__section {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .main_content > ul {
    list-style: none;
    padding-left: 10px;

    > li {
      margin-top: 18px;
      margin-left: 10px;
      padding-right: 10px;
    }
  }

  hr {
    margin-top: 55px;
    height: 3px;
    border: none;
    background-color: #990000;
    background-image: linear-gradient(147deg, #990000 0%, #ff0000 74%);
    border-radius: 60px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    position: absolute;
  }

  .main_content {
    background-color: white;
    border-radius: 10px;
    height: fit-content;
    width: 95%;
    align-items: center;
    margin-right: auto;
    margin-left: auto;
    margin-top: 30px;
    box-shadow: 0 10px 40px rgba(159, 162, 177, 0.8);
    border: 2px solid #cbcbcb;
  }

  span {
    font-weight: bold;
    font-size: 17px;
  }

  #last {
    margin-bottom: 18px;
  }
`;

export default Regulations;
