import React from 'react'
import styled from 'styled-components';
import Logo from "../homepageresources/Liepajalogo.png";
import CancelIcon from '@material-ui/icons/Cancel';

function AboutGame({setAboutGameState}) {
    return (
        <StyledAboutGamePopup>
            <CancelIcon onClick={() => setAboutGameState(false)} />
            <img src={Logo} alt="logo"/>
            <div className="text__about--container">
                <h4>Vēlies aizraujošā un neparastā veidā iepazīt Liepāju un tās interesantākās vietas?</h4>
                <h5>Tad šī spēle ir piemērota tieši tev...</h5>
                <p>Izmantojot telefonu apmeklē visus kartē atzīmētos Liepājas objektus. Izlasi īsu aprakstu par katru objektu un atbildi pareizi uz jautājumu, ja tas neizdodas, tad ir iespēja atbildēt uz papildjautājumu. Apciemo visus objektus ar iespējami mazāko punktu skaitu un esi pirmais spēles līderu reitingā.</p>
            </div>
        </StyledAboutGamePopup>
    )
}
const StyledAboutGamePopup = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #f5f5f5;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #333;
    >.MuiSvgIcon-root {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 30px;
        cursor: pointer;
    }
    >img{
        height: 100px;
        width: auto;
        margin: 20px 0; 
    }
    >.text__about--container{
        width: 100%;
        height: fit-content;
        margin-top: 20px;
        padding: 5px 15px;
        >h4{
            font-size: 19px;
        }
        >h5{
            margin: 20px 0;
            font-size: 16px;
        }
        >p{
            margin-top: 20px;
            text-align: left;
        }
    }    
`;

export default AboutGame
