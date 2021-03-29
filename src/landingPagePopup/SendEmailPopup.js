import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import emailjs from "emailjs-com";
import CancelIcon from "@material-ui/icons/Cancel";

const ModalWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: #f2f2f2;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 500;
  overflow-y: scroll;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #paragraph {
    margin-top: 10px;
    padding: 20px;
    font-weight: bold;
    background: -webkit-linear-gradient(147deg, #990000 0%, #ff0000 74%);
    background-size: 400% 400%;
    text-align: center;
    animation: gradient 10s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Open Sans Condensed", sans-serif;
    font-size: 18px;

    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  }
  #virsrkasti {
    padding: 25px;
    color: #707070;
    font-family: "Open Sans Condensed", sans-serif;
    font-size: 16px;
    margin-bottom: -15px;
    margin-right: auto;
    font-weight: bold;
  }
  button {
    border: none;
    margin-bottom: 30px;
    margin-top: 30px;
    cursor: pointer;
    border-radius: 50px;
    height: 50px;
    width: 250px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    background-color: #f71735;
    background-image: linear-gradient(147deg, #f71735 0%, #db3445 74%);
    color: #f1f1f1;
    font-size: 20px;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
    :hover,
    :focus,
    :active {
      -webkit-transform: scale(0.9);
      transform: scale(0.9);
    }
  }
  h1 {
    color: #2f2f2f;
    font-size: 30px;
    margin-top: 50px;
  }
  h2 {
    text-align: center;
    margin-top: 10px;
    font-size: 24px;
  }
  input {
    width: 90%;
    height: 40px;
    border-radius: 5px;
    font-size: 16px;

    :active,
    :focus,
    :hover {
      border: 2px solid lightgray;
    }
  }
  #problem {
    height: 100px;
    padding-top: 5px;
  }
  textarea {
    border-radius: 5px;
    width: 90%;
    height: 100px;
    font-family: Lato, sans-serif;
    -moz-appearance: textfield;
    padding-left: 5px;
    box-sizing: border-box;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
    border: 1px solid lightgray;
    :focus,
    :active {
      border: 2px solid lightgray;
    }
  }
  input[type="text"],
  [type="email"] {
    -moz-appearance: textfield;
    padding-left: 5px;
    font-family: Lato, sans-serif;
    background-color: #f8f8f8;
    :focus {
      border: 2px solid lightgray;
    }
  }
  > .MuiSvgIcon-root {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
  }
`;

const SendEmailPopup = ({ showModal, setShowModal }) => {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8rj8zoa",
        "template_bfuejmi",
        e.target,
        "user_egLiiy3WxPTLznzcSradQ"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <ModalWrapper showModal={showModal}>
          <ModalContent>
            <CancelIcon
              onClick={() => {
                setShowModal(false);
              }}
            />
            <h1>Palīdzība</h1>
            <form onSubmit={sendEmail}>
              <p id="paragraph">
                Šeit jūs varat uzdot mums jautājumu par spēli
              </p>

              <p id="virsrkasti">Jūsu e-pasts:</p>
              <input type="email" placeholder="E-pasts" name="email" required />
              <p id="virsrkasti">Problēmas virsraksts:</p>
              <input
                type="text"
                placeholder="Virsraksts"
                name="header"
                required
              />
              <p id="virsrkasti">Jūsu problēma:</p>
              <textarea
                placeholder="Problēma"
                type="text"
                name="message"
                required
              ></textarea>

              <button type="submit">Nosūtīt</button>
            </form>
          </ModalContent>
          {/* <CloseModalButton
          aria-label="Close modal"
          onClick={() => setShowModal((prev) => !prev)}
        /> */}
        </ModalWrapper>
      ) : (
        <></>
      )}
    </>
  );
};

export default SendEmailPopup;
