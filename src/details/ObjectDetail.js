import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser } from "../features/userSlice";
import db from "../private/firebase";
import CheckPopup from "../popups/CheckPopup";
import firebase from "firebase";
import ImageIcon from "@material-ui/icons/Image";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";

function ObjectDetail({
  id,
  setInfoPopupState,
  image,
  name,
  description,
  allObject,
  allAnswers,
  allChanceAnswers,
  xtraObjectImages,
  setAnsweredCorrect,
  setPopupAnswer,
  popupAnswer,
  setPopupText,
  popupText,
  setXtraImageState,
  xtraImageState,
  setCheckPopupState,
  checkPopupState,
  setAnswerCorrect,
  answerCorrect,
  setChanceAnswer,
  chanceAnswer,
  setAnswer,
  answer,
  setDescriptionState,
  descriptionState,
}) {
  const user = useSelector(selectUser);

  const findObject = () => {
    db.collection("users").doc(user.uid).collection("objects").doc(id).update({
      isFound: true,
    });
  };

  const checkAnswer = (e) => {
    e.preventDefault();
    if (user && user.uid && id) {
      if (answer === "") {
        return;
      } else {
        if (answer === allObject.correct1) {
          findObject();
          db.collection("users").doc(user.uid).collection("foundObjects").add({
            name: name,
            image: image,
            description: description,
            correctAnswer: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          setAnsweredCorrect(true);
          setPopupText("Apsveicam, Jūs atbildējāt pareizi!");
          setCheckPopupState(true);
          setAnswerCorrect(true);
          setDescriptionState(true);
        } else {
          setAnsweredCorrect(false);
          setPopupAnswer(allObject.correct1);
          setPopupText(
            "Diemžēl atbilde nepareiza, lūdzu atbildiet uz nākamo jautājumu"
          );
          setCheckPopupState(true);
          setAnswerCorrect(false);
        }
      }
      if (answerCorrect === false) {
        if (chanceAnswer !== "") {
          if (chanceAnswer === allObject.correct2) {
            findObject();
            db.collection("users")
              .doc(user.uid)
              .collection("foundObjects")
              .add({
                name: name,
                image: image,
                description: description,
                correctAnswer: true,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            setPopupText("Apsveicam, Jūs atbildējāt pareizi!");
            setAnsweredCorrect(false);
            setDescriptionState(true);
          } else {
            findObject();
            db.collection("users")
              .doc(user.uid)
              .collection("foundObjects")
              .add({
                name: name,
                image: image,
                description: description,
                correctAnswer: false,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            setAnsweredCorrect(false);
            setPopupAnswer(allObject.correct2);
            setPopupText("Diemžēl atbilde nepareiza!");
            setDescriptionState(true);
          }
        } else {
          return;
        }
      }
    }
  };

  return (
    <InfoPopup>
      <h3>{name}</h3>
      <div className="image__container">
        {!descriptionState ? (
          <img src={image} alt="object" />
        ) : (
          <>
            <div className="information__container">
              <p>{description}</p>
            </div>
            <img src={image} alt="object" />
            <img src={xtraObjectImages[0]} alt="" />
            <img src={xtraObjectImages[1]} alt="" />
          </>
        )}
        {!descriptionState ? (
          <ImageIcon
            onClick={() => {
              setDescriptionState(!descriptionState);
              setXtraImageState(!xtraImageState);
            }}
          />
        ) : (
          <ContactSupportIcon
            onClick={() => {
              setDescriptionState(!descriptionState);
              setXtraImageState(!xtraImageState);
            }}
          />
        )}
      </div>
      {xtraImageState ? (
        <>
          <p>
            {answerCorrect
              ? `${allObject.question1}`
              : `${allObject.question2}`}
          </p>
          <form>
            {answerCorrect ? (
              <select
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
              >
                <option></option>
                <option>{allAnswers[0]}</option>
                <option>{allAnswers[1]}</option>
                <option>{allAnswers[2]}</option>
              </select>
            ) : (
              <select
                onChange={(e) => setChanceAnswer(e.target.value)}
                value={chanceAnswer}
              >
                <option></option>
                <option>{allChanceAnswers[0]}</option>
                <option>{allChanceAnswers[1]}</option>
                <option>{allChanceAnswers[2]}</option>
              </select>
            )}
            <button onClick={checkAnswer}>Iesniegt</button>
          </form>
          {checkPopupState && (
            <CheckPopup
              popupAnswer={popupAnswer}
              popupText={popupText}
              setCheckPopupState={setCheckPopupState}
              setInfoPopupState={setInfoPopupState}
            />
          )}
        </>
      ) : (
        <div className="image__container"></div>
      )}
    </InfoPopup>
  );
}
const InfoPopup = styled.div`
  width: 80%;
  max-width: 400px;
  min-height: 60%;
  height: fit-content;
  max-height: 500px;
  position: absolute;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  background: #f5f5f5;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  > h3 {
    margin-bottom: 10px;
  }
  .image__container {
    width: 100%;
    position: relative;
    > img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      margin-top: 10px;
    }
    > .MuiSvgIcon-root {
      font-size: 30px;
      position: absolute;
      top: 15px;
      right: 5px;
      cursor: pointer;
    }
    > .information__container {
      width: 100%;
      height: fit-content;
      padding: 20px 40px 20px 20px;
      border: 1px solid lightgray;
    }
  }
  > p {
    margin-top: 20px;
    font-weight: 600;
    text-align: center;
  }
  > form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    > button {
      width: 150px;
      height: 30px;
      margin: 30px 0;
      border: 1px solid #0f0f0f;
      cursor: pointer;
      outline: none;
      border-radius: 10px;
      background: #f5f5f5;
    }
    > select {
      margin-top: 20px;
      height: 30px;
      outline: none;
      border: 1px solid #0f0f0f;
      > option {
        :hover {
          background: #f9f9f9 !important;
        }
      }
    }
  }
`;

export default ObjectDetail;
