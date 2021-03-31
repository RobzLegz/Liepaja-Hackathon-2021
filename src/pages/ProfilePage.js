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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import FaceIcon from "@material-ui/icons/Face";

function ProfilePage({ name, email, userInfo }) {
  const [changeNamePopupState, setChangeNamePopupState] = useState(false);
  const [nameChangeValue, setNameChangeValue] = useState("");

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const changeName = (e) => {
    e?.preventDefault();
    if (nameChangeValue !== "") {
      db.collection("users").doc(user.uid).update({
        name: nameChangeValue,
      });
      setNameChangeValue("");
      setChangeNamePopupState(false);
    } else {
      return;
    }
  };

  return (
    <>
      <StyledProfilePage>
        <div id="header">
          <img
            src={userInfo.selectedFace ? userInfo.selectedFace : ProfileImage}
            alt="profile"
          />
          <h1>{name}</h1>
          <h2>{email}</h2>
        </div>

        <div id="info">
          <div
            className="profile__button--container"
            onClick={() => {
              history.push("/avatar");
            }}
          >
            <FaceIcon className="icons" />
            <p>Nomainīt avatāru</p>
            <ArrowForwardIosIcon id="arrow" />
          </div>
          <div
            className="profile__button--container"
            onClick={() => {
              setChangeNamePopupState(true);
            }}
          >
            <TextFieldsIcon className="icons" />
            <p>Nomainīt Vārdu, Uzvārdu</p>
            <ArrowForwardIosIcon id="arrow" />
          </div>
          <div
            className="profile__button--container"
            id="last_div"
            onClick={() => {
              dispatch(logout());
              auth.signOut();
            }}
          >
            <ExitToAppIcon className="icons" />
            <p className="iziet">Iziet</p>
            <ArrowForwardIosIcon className="iziet" />
          </div>
        </div>
        {/* <div id="versija">
          <p>V.1.01 </p>
          <p>Team Datorium</p>
        </div> */}
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
              onClick={(e) => {
                changeName();
                window.location.reload();
              }}
            />
            <button
              onClick={(e) => {
                changeName();
                window.location.reload();
              }}
            />
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
    height: 250px;
    background: linear-gradient(#ed213a, #93291e);
    flex-direction: column;
  }

  #header > img {
    height: 100px;
    max-width: 100px;
    margin: 25px 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    object-fit: cover;
    border: 3.5px solid #ddd4d4;
    background-color: white;
  }

  #header > h1 {
    color: #f3f3f3;
    text-align: center;
    margin-bottom: 10px;
    margin-top: -15px;
    font-weight: 400;
  }

  #header > h2 {
    display: block;
    color: #f5f5f5;
    text-align: center;
    font-weight: 10;
    margin-bottom: 15px;
  }

  .icons {
    color: black;
    height: 25px;
    width: 25px;
    margin-left: -10px;
  }

  #info {
    width: 100%;
    border-top: 1px solid lightgray;
    > .profile__button--container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      font-size: 16px;
      align-items: center;
      height: 50px;
      cursor: pointer;
      background-color: white;
      border-bottom: 1px solid lightgray;
      > #arrow {
        font-size: 17px;
        color: #b5b4b4;
      }

      > .iziet {
        font-size: 17px;
        color: #e41b1b;
      }

      > p {
        cursor: pointer;
        font-family: "Merriweather Sans", sans-serif;
        color: #414141;
        font-weight: bold;
        display: block;
        margin-right: auto;
        margin-left: 15px;
      }
    }
    #last_div {
      border-bottom: 1px solid lightgray;
    }
  }

  @media (max-height: 633px) {
    #info {
      margin-top: 50px;
    }
    #info > .profile__button--container {
      height: 40px;
    }
  }

  #versija {
    color: #b5b4b4;
    text-align: center;
    display: block;
    margin: auto auto 10px auto;
  }
`;

const StyledNameChangePopup = styled.div`
  z-index: 100;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fbfbfb;
  height: 30%;
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
