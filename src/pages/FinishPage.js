import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { selectUser } from "../features/userSlice";
import db from "../private/firebase";
import FinishFlag from "../resources/finishflag.png";

function FinishPage({ setGameEnded, value, objects, wentObjects, userInfo }) {
  const user = useSelector(selectUser);
  const history = useHistory();

  const sendGameData = () => {
    db.collection("finishedUsers").add({
      name: userInfo.name,
      time: value,
      email: userInfo.email,
    });
    objects.map((object) => {
      db.collection("users")
        .doc(user.uid)
        .collection("objects")
        .doc(object.objectId)
        .delete();
    });
    wentObjects.map((wentObject) => {
      db.collection("users")
        .doc(user.uid)
        .collection("foundObjects")
        .doc(wentObject.id)
        .delete();
    });
    if (objects.length === 0) {
      wentObjects.map((wentObject) => {
        db.collection("users")
          .doc(user.uid)
          .collection("foundObjects")
          .doc(wentObject.id)
          .delete();
      });
    } else {
      wentObjects.map((wentObject) => {
        db.collection("users")
          .doc(user.uid)
          .collection("foundObjects")
          .doc(wentObject.id)
          .delete();
      });
    }
    db.collection("users").doc(user.uid).update({
      hasPlayedBefore: !userInfo.hasPlayedBefore,
      gameStarted: false,
      startFlagged: false,
      startTime: 0,
      hasSelectedFace: true,
      selectedFace: userInfo.selectedFace,
      name: userInfo.name,
      email: userInfo.email,
    });
    setGameEnded(false);
    history.push("/results");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <StyledFinishPage>
      <div className="finish__page--header">
        <img src={FinishFlag} alt="finish flag" />
        <div className="page__header--text">
          <h2>Apsveicam!</h2>
        </div>
      </div>
      <div className="finish__page--options">
        <div className="option__container">
          <p>
            Jūs vienu objektu atradāt vidēji{" "}
            {Math.floor(value / objects.length)}.
            {Math.floor((value / objects.length) * 100) -
              Math.floor(value / objects.length) * 100}{" "}
            minūtēs
          </p>
        </div>
        <div className="option__container">
          <p>Kopā Jūs apskatījāt {objects.length} objektus</p>
        </div>
        <div className="option__container">
          <p>Kopā Jūs ieguvāt {value} punktus</p>
        </div>
        <div className="option__container">
          <p>
            Ceļā Jūs pavadījāt {Math.floor(value / 60)}:
            {Math.floor(value - Math.floor(value / 60) * 60) < 10
              ? "0" + Math.floor(value - Math.floor(value / 60) * 60)
              : Math.floor(value - Math.floor(value / 60) * 60)}{" "}
            stundas
          </p>
        </div>
      </div>
      <button onClick={sendGameData}>Beigt spēli</button>
    </StyledFinishPage>
  );
}
const StyledFinishPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #f8f8f8;
  z-index: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .finish__page--header {
    width: 100%;
    max-width: 500px;
    height: 165px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    > .page__header--text {
      margin-top: -70px;
      > h2 {
        animation: animateText 2s ease infinite;
        @keyframes animateText {
          0% {
            color: #c0c03a;
          }
          25% {
            color: #bbbb2e;
          }
          50% {
            color: #acac17;
          }
          75% {
            color: #c2c250;
          }
          100% {
            color: #dfdf25;
          }
        }
      }
    }
  }
  > .finish__page--options {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid lightgray;
    > .option__container {
      border-bottom: 1px solid lightgray;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      text-align: center;
      > p {
        font-weight: 500;
      }
    }
  }
  > button {
    margin-top: 100px;
    background: #333;
    color: #f5f5f5;
    padding: 10px;
    border-radius: 6px;
  }
`;

export default FinishPage;
