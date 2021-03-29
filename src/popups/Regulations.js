import React from 'react'
import styled from 'styled-components'
import GavelIcon from '@material-ui/icons/Gavel';
import CancelIcon from '@material-ui/icons/Cancel';

function Regulations({setRulePopupState}) {
    return (
        <StyledRegulationsPopup>
            <CancelIcon onClick={() => setRulePopupState(false)} />
            <div className="heading__section">
                <h2>Noteikumi</h2>
                <GavelIcon />
            </div>
            <ul>
                <li><p>0. Spēlētājam ir pieejamas divas kartes - viena, lai pārredzētu visus objektus - otra lai redzētu pieejamos objektus redzamības zonā.</p></li>
                <li><p>1. Ieslēdz savā ierīcē internetu un GPS.</p></li>
                <li><p>2. Izveido profilu.</p></li>
                <li><p>3. Sāc spēli vienā no 4 starta punktiem, kas atrodami pilnajā kartē, kad uzspiež uz kompasa ikonas.</p></li>
                <li><p>4. Apmeklē objektus, kuri ir tavā “redzamības zonā”, un dodies uz tiem, izvēloties īsāko maršrutu.</p></li>
                <li><p>5. Nonākot pie kāda no objektiem, izlasi par to pieejamo informāciju un atbildi uz jautājumu, ja atbildēji nepareizi, tad vari atbildēt uz papildjautājumu.</p></li>
                <li><p>6. Atbildot pareizi uz jautājumu, tava redzamības zona palielināsies 2 reizes.</p></li>
                <li><p>7. Ja tavā redzamības zonā nav neapmeklētu objektu, tad nospiežot kompasa ikonu vari pāriet uz lielo karti, kur atrast nākamo apskates objektu.</p></li>
                <li><p>8. Apceļojot pilsētas objektus ar iespējami mazāko punktu skaitu, tu palielini savu iespēju būt ātrāko spēlētājuj sarakstā.</p></li>
                <li><p>9. Kartes var mainīt uzspiežot uz kompasa ikonas</p></li>
            </ul>
        </StyledRegulationsPopup>
    )
}
const StyledRegulationsPopup = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
    z-index: 500;
    padding: 30px;
    padding-bottom: 100px;
    >.MuiSvgIcon-root {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 30px;
    }
    >.heading__section{
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content:center;
        margin-bottom:20px;
        >.MuiSvgIcon-root {
            margin-left: 10px;
        }
    }
    >ul{
        list-style: none;
        >li{
            margin-top: 15px;
        }
    }
`;

export default Regulations
