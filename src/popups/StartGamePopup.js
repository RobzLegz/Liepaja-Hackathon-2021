import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser } from "../features/userSlice";
import db from "../private/firebase";
import StartImage from "./start.png";
import * as objectData from "../testing/testData.json";

function StartGamePopup({ setStartGamePopup }) {
  const user = useSelector(selectUser);

  return (
    <StyledStartGamePopup>
      <img src={StartImage} alt="start" />
      <button
        onClick={() => {
          if (user && user.uid) {
            setStartGamePopup(false);
            db.collection("users").doc(user.uid).update({
              startFlagged: true,
              startTime: new Date().getTime(),
            });
            objectData.objects.map((object) => {
              db.collection("users").doc(user.uid).collection("objects").add({
                lat: object.coords[0],
                lng: object.coords[1],
                name: object.name,
                image: object.image,
                description: object.description,
                isFound: false,
                question1: object.question1,
                answers1: object.answers1,
                correct1: object.correct1,
                question2: object.question2,
                answers2: object.answers2,
                correct2: object.correct2,
                extraImages: object.extraImages,
              });
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        }}
      >
        Sākt
      </button>
    </StyledStartGamePopup>
  );
}
const StyledStartGamePopup = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 80%;
  max-width: 300px;
  height: fit-content;
  padding: 2rem;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  > img {
    width: 100%;
    border-radius: 5px;
  }
  > button {
    margin-top: 20px;
    width: 150px;
    height: 40px;
    background: #333;
    color: #f2f2f2;
    font-size: 1rem;
    border-radius: 5px;
  }
`;

export default StartGamePopup;
