import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logout, selectUser } from "../features/userSlice";
import Nav from "../navigation/Nav";
import db, { auth } from "../private/firebase";
import ProfileImage from "../resources/profileimage.svg";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useHistory } from "react-router";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

function ProfilePage({ name, email, userInfo }) {
  const [changeNamePopupState, setChangeNamePopupState] = useState(false);
  const [nameChangeValue, setNameChangeValue] = useState("");

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const changeName = (e) => {
    e?.preventDefault();
    db.collection("users").doc(user.uid).update({
      name: nameChangeValue,
    });
    setNameChangeValue("");
    setChangeNamePopupState(false);
    setInterval(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <StyledProfilePage>
        <div id="header">
          <img
            src={userInfo.selectedFace ? userInfo.selectedFace : ProfileImage}
            alt={userInfo.name}
          />
        </div>
        <h1>{name}</h1>
        <h2>{email}</h2>
        <div id="info">
          <div
            className="profile__button--container"
            onClick={() => {
              history.push("/avatar");
            }}
          >
            <p>Nomainīt avatāru</p>
            <ArrowForwardIosIcon />
          </div>
          <div
            className="profile__button--container"
            onClick={() => {
              setChangeNamePopupState(true);
            }}
          >
            <p>Nomainīt Vārdu, Uzvārdu</p>
            <ArrowForwardIosIcon />
          </div>
          <div
            className="profile__button--container"
            onClick={() => {
              dispatch(logout());
              auth.signOut();
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
          >
            <p className="iziet">Iziet</p>
            <ArrowForwardIosIcon className="iziet" />
          </div>
        </div>
      </StyledProfilePage>
      <Nav />
      {changeNamePopupState && (
        <StyledNameChangePopup>
          <h3>Mainīt Vārdu, Uzvārdu</h3>
          <form>
            <input
              type="text"
              value={nameChangeValue}
              onChange={(e) => setNameChangeValue(e.target.value)}
            />
            <CheckCircleIcon
              onClick={() => {
                changeName();
              }}
            />
            <button
              onClick={() => {
                changeName();
              }}
            ></button>
          </form>
          <button
            onClick={() => {
              setChangeNamePopupState(false);
            }}
          >
            Aizvērt
          </button>
        </StyledNameChangePopup>
      )}
    </>
  );
}
const StyledProfilePage = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  background: whitesmoke;
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
  height: calc(100vh - 60px);

  #header {
    width: 100%;
    height: 100px;
    border-radius: 0 0 50% 50%/0 0 100% 100%;
    transform: scaleX(1.2);
    background: darkred;
  }

  #header > img {
    height: 100px;
    max-width: 100px;
    margin: 46px 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    object-fit: cover;
  }

  > h1 {
    font-family: "Merriweather Sans", sans-serif;
    margin: 75px auto;
    color: #333;
    text-align: center;
  }
  > h2 {
    font-family: "Merriweather Sans", sans-serif;
    display: block;
    font-style: italic;
    margin: -60px auto;
    color: #3f3f3f;
  }
  #info {
    margin-top: 130px;
    width: 100%;
    border-top: 1px solid lightgray;
    > .profile__button--container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      font-size: 16px;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid lightgray;
      cursor: pointer;
      > .MuiSvgIcon-root {
        font-size: 17px;
      }
      > .iziet {
        color: #e41b1b;
      }
      > p {
        vertical-align: center;
        cursor: pointer;
        font-family: "Merriweather Sans", sans-serif;
        color: #414141;
      }
    }
  }
`;

const StyledNameChangePopup = styled.div`
  z-index: 100;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fbfbfb;
  height: 200px;
  min-height: 200px;
  width: 80%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #0f0f0f;
  border-radius: 20px;
  > form {
    margin-top: 30px;
    background: #fafafa;
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid lightgrey;
    border-radius: 10px;
    > input {
      width: 90%;
      height: 100%;
      outline: none;
      background: transparent;
      border: none;
      padding: 0 10px;
    }
    > .MuiSvgIcon-root {
      font-size: 30px;
      cursor: pointer;
    }
    > button {
      display: none;
    }
  }
  > button {
    margin-top: 20px;
    width: 90px;
    height: 30px;
    background: #0f0f0f;
    color: #f2f2f2;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default ProfilePage;
