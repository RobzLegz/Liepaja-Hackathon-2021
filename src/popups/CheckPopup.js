import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import styled from 'styled-components';

function CheckPopup({setInfoPopupState, setCheckPopupState, popupAnswer, popupText}) {

    const closePopup = () => {
        if(popupText === "Apsveicam, Jūs atbildējāt pareizi!"){
            setCheckPopupState(false);
            setInfoPopupState(false);
        }else if(popupText === "Diemžēl atbilde nepareiza!"){
            setCheckPopupState(false);
            setInfoPopupState(false);
        }else{
            setCheckPopupState(false);
        }
    }

    return (
        <StyledCheckPopup>
            {popupText === "Apsveicam, Jūs atbildējāt pareizi!" ? (
                <>
                    <CheckCircleIcon style={{color: "#19c319"}} />
                    <h4>{popupText}</h4>
                </>
            ) : (
                <>
                    <CancelIcon style={{color: "#f32525"}} />
                    <h4>{popupText}</h4>
                    <p>Pareizā atbilde ir: {popupAnswer}</p>
                </>
            )}
            <button onClick={closePopup}>Aizvērt</button>
        </StyledCheckPopup>
    )
}
const StyledCheckPopup = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 120;
    width: 100%;
    height: 100%;
    background: #fbfbfb;
    text-align: center;
    padding: 2rem;
    >.MuiSvgIcon-root{
        font-size: 80px;
    }
    >h4{
        margin: 20px 0;
    }
    >p{
        margin: 30px 0;
    }
    >button{
        padding: 10px;
        color: #f5f5f5;
        background: #0f0f0f;
        margin-top: 100px;
        font-weight: bold;
        font-size: 1rem;
        letter-spacing: 1px;
        border-radius: 10px;
    }
`;

export default CheckPopup
