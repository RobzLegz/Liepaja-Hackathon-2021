import React, { useState } from "react";
import styled from "styled-components";
import db, { auth } from "../private/firebase";
import { useHistory } from "react-router-dom";

function LoginPage({}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileState, setProfileState] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [profileEmail, setProfileEmail] = useState("");
  const [profilePassword, setProfilePassword] = useState("");
  const [profilePasswordError, setProfilePasswordError] = useState(false);
  const [profileEmailError, setProfileEmailError] = useState(false);
  const [passwordsError, setPasswordsError] = useState(false);
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    if (profileState === false) {
      if (name === "") {
        setNameError(true);
        return;
      } else if (email === "") {
        setEmailError(true);
        return;
      } else if (password === "") {
        setPasswordsError(true);
        return;
      } else if (password === "" && name !== "" && email !== "") {
        setPasswordsError(true);
        setEmailError(false);
        setNameError(false);
        return;
      } else if (password !== "" && name === "" && email !== "") {
        setPasswordsError(false);
        setEmailError(false);
        setNameError(true);
        return;
      } else if (password !== "" && name !== "" && email === "") {
        setPasswordsError(false);
        setEmailError(true);
        setNameError(false);
        return;
      }
      setPasswordsError(false);
      setEmailError(false);
      setNameError(false);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          return db.collection("users").doc(authUser.user.uid).set({
            name: name,
            email: email,
            gameStarted: false,
            startFlagged: false,
            hasSelectedFace: false,
            hasPlayedBefore: false,
            selectedFace: "",
            startTime: 0,
          });
        })
        .catch((error) => alert(error.message));
      setName("");
      setEmail("");
      setPassword("");
      history.push("/start");
    } else {
      if (profileEmail === "") {
        setProfileEmailError(true);
        return;
      } else if (profilePassword === "") {
        setProfilePasswordError(true);
        return;
      } else if (profilePassword === "" && profileEmail !== "") {
        setProfilePasswordError(true);
        setProfileEmailError(false);
        return;
      } else if (profilePassword !== "" && profileEmail === "") {
        setProfilePasswordError(false);
        setProfileEmailError(true);
        return;
      }
      setProfilePasswordError(false);
      setProfileEmailError(false);
      auth
        .signInWithEmailAndPassword(profileEmail, profilePassword)
        .then((authUser) => {
          console.log(authUser);
        })
        .catch((error) => alert(error.message));
      setProfileEmail("");
      setProfilePassword("");
      history.push("/start");
    }
  };

  const alreadyHaveProfile = () => {
    setProfileState(true);
  };

  const dontHaveProfile = () => {
    setProfileState(false);
  };

  return (
    <StyledLoginPage>
      <header></header>
      {!profileState ? (
        <StyledLoginForm>
          <h1> Reģistrēties</h1>
          <div id="form">
            <div className="input-form">
              <input
                type="text"
                value={name}
                className="has-icon-user"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                placeholder="Vārds, Uzvārds"
                id="username"
              />
              {nameError && <small>Lūdzu norādiet savu vārdu un uzvārdu</small>}
            </div>
            <div className="input-form">
              <input
                type="email"
                value={email}
                autoComplete="off"
                className="has-icon-email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-pasts"
                id="email"
              />
              {emailError && <small>Lūdzu norādiet savu e-pastu </small>}
            </div>
            <div className="input-form">
              <input
                type="password"
                autoComplete="off"
                value={password}
                className="has-icon-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parole"
                id="password"
              />
              {passwordsError && <small>Lūdzu ievadiet paroli</small>}
            </div>
          </div>
          <button onClick={login} type="submit">
            Pierakstīties
          </button>
          <p onClick={alreadyHaveProfile}>Man jau ir profils</p>
        </StyledLoginForm>
      ) : (
        <StyledLoginForm>
          <h1>Autorizēties</h1>
          <div id="form">
            <div className="input-form">
              <input
                type="email"
                autoComplete="off"
                value={profileEmail}
                className="has-icon-email"
                onChange={(e) => setProfileEmail(e.target.value)}
                placeholder="E-pasts"
                id="email"
              />
              <img src="images/mark.svg" id="mark" alt="" />
              {profileEmailError && <small>Lūdzu norādiet savu e-pastu </small>}
            </div>

            <div className="input-form">
              <input
                type="password"
                autoComplete="off"
                value={profilePassword}
                className="has-icon-password"
                onChange={(e) => setProfilePassword(e.target.value)}
                placeholder="Parole"
                id="password"
              />
              <img src="images/mark.svg" id="mark" alt="" />
              {profilePasswordError && <small>Lūdzu ievadiet paroli</small>}
            </div>
          </div>
          <button onClick={login} type="submit">
            Ieiet
          </button>
          <p onClick={dontHaveProfile}>Izveidot profilu</p>
        </StyledLoginForm>
      )}

      <footer>
        <div>
          <a href="https://datorium.eu/lv/" target="_blank">
            <img
              src="loginpageresources/Datoriumanimation.gif"
              alt=""
              id="Datorium"
            />
          </a>
          <p id="our_team">Team Datorium</p>
        </div>
      </footer>
    </StyledLoginPage>
  );
}
const StyledLoginPage = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  background: #f1f1f1;
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
  align-items: center;
  height: 100vh;

  > footer {
    position: absolute;
    bottom: 0;
    height: 105px;
    width: 100%;
    background: linear-gradient(45deg, #333940, #282d32);
    display: flex;
    > div {
      width: 14%;
      min-width: 300px;
      margin-right: auto;
      margin-left: auto;
      justify-content: center;
      align-items: center;
      height: 100px;
      text-align: center;

      > img {
        height: 65px;
        width: 65px;
        margin-top: 20px;
        margin-right: 10px;
        padding: 10px;
        align-items: center;
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -webkit-transition-property: transform;
        transition-property: transform;
        -webkit-transition-timing-function: ease-out;
        transition-timing-function: ease-out;

        :hover,
        :focus,
        :active {
          -webkit-transform: translateY(-8px);
          transform: translateY(-8px);
        }
      }
      > hr {
        width: 100%;
        margin-top: 10px;
      }
      #Datorium {
        height: 45px;
        width: 45px;
        border-radius: 50%;
        margin-top: 20px;
      }
      > #our_team {
        color: white;
        text-align: center;
        margin-top: 7px;
      }
      > #olimpiade {
        color: white;
        text-align: center;
        margin-top: 30px;
      }
    }
  }

  > header {
    width: 100%;
    height: 60px;
    background: darkred;
    border-radius: 0 0 85% 85% / 30%;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const StyledLoginForm = styled.form`
  background: rgb(255, 255, 255);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  max-width: 360px;
  width: 90%;
  height: fit-content;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Open Sans", sans-serif;
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 80;

  > #form > .input-form > input {
    width: 100%;
    height: 50px;
    min-width: 250px;
    margin-bottom: 20px;
    padding: 0 10px;
    outline: none;
    color: var(--fg-input);
    background-color: var(--bg-input);
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    transition: border 250ms ease-in-out;
    font-family: "Roboto", sans-serif;

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    :focus {
      background-color: #e8e8e8;
      border: 2px solid #adadad;
      outline: none;
    }
  }
  #form > .input-form > #username[type="text"] {
    -moz-appearance: textfield;
    padding-left: 55px;
  }
  #form > .input-form > #email[type="email"] {
    -moz-appearance: textfield;
    padding-left: 55px;
  }
  #form > .input-form > #password[type="password"] {
    -moz-appearance: textfield;
    padding-left: 55px;
  }

  > #form > .input-form > .has-icon-user {
    background-image: url("loginpageresources/user.svg");
    background-repeat: no-repeat;
    background-size: 40px 40px;
    background-position: 5px;
  }
  > #form > .input-form > .has-icon-email {
    background-image: url("loginpageresources/email.svg");
    background-size: 40px 40px;
    background-repeat: no-repeat;
    background-position: 5px;
  }
  > #form > .input-form > .has-icon-password {
    background-image: url("loginpageresources/lock.svg");
    background-repeat: no-repeat;
    background-position: 5px;
    background-size: 40px 40px;
  }
  > #form > .input-form > #mark {
    height: 25px;
    width: 25px;
    visibility: hidden;
    position: absolute;
    top: 40px;
    right: 10px;
  }

  > #form > .input-form.error img {
    color: #e74c3c;
    visibility: visible;
  }

  #form > .input-form {
    position: relative;
  }
  #form > .input-form small {
    color: #e74c3c;
    position: absolute;
    left: 0;
    top: 50px;
  }

  > button {
    width: 150px;
    height: 45px;
    margin: 20px 0;
    border-radius: 40px;
    border: none;
    color: #ffff;
    font-size: 1.3rem;
    cursor: pointer;
    outline: none;
    background-image: linear-gradient(315deg, #f85032 0%, #e73827 74%);
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    -webkit-transition: all 0.5s ease-out;
    -moz-transition: all 0.5s ease-out;
    -o-transition: all 0.5s ease-out;
    transition: all 0.5s ease-out;

    :hover {
      background-color: #990000;
      background-image: linear-gradient(147deg, #990000 0%, #ff0000 74%);
      -webkit-transform: scale(1.06);
      transform: scale(1.06);
    }
  }

  @media (max-height: 569px) {
    top: 46%;
    > button {
      margin-top: -10px;
      margin-bottom: 10px;
    }
  }

  > p {
    color: gray;
    cursor: pointer;
  }
  > p:hover {
    text-decoration: underline;
  }
  > h1 {
    margin-bottom: 35px;
    color: #2f2f2f;
  }
`;

export default LoginPage;
