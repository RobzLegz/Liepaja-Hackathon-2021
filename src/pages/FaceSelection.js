import React from "react";
import styled from "styled-components";
import MaskFace from "../resources/faces/4e12c5a5ab54f7fa4bd56a846335d5a3.png";
import ManFaceStraight from "../resources/faces/48_1024x1024.png";
import ManFaceCurly from "../resources/faces/41_large.png";
import WomanFaceMicrosoft from "../resources/faces/girl-microsoft.png";
import WomanFaceBruh from "../resources/faces/girl_1f467.png";
import SunglassesFace from "../resources/faces/25b924f1d18fea2c7dfcb26a9905c1e8.png";
import AkwardFace from "../resources/faces/Upside-Down_Face_Emoji_4dbbbd80-eb60-4c91-9642-83368692e361_1024x1024.png";
import SleepyFace from "../resources/faces/24-512.png";
import BruhFace from "../resources/faces/image_processing20200511-27036-2se3w7.png";
import db from "../private/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useHistory } from "react-router";

function FaceSelection({ userInfo, changeAvatar }) {
  const user = useSelector(selectUser);
  const history = useHistory();

  const faceReady = () => {
    userInfo.hasSelectedFace = true;
    if (changeAvatar === true) {
      history.push("/profile");
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <StyledFaceSelectionPage>
      <h2>Izvēlieties Savu Avatāru!</h2>
      <StyledFaceInner>
        <div className="image__row">
          <img
            src={MaskFace}
            alt="face option"
            onClick={() => {
              db.collection("users").doc(user.uid).update({
                selectedFace:
                  "https://i.pinimg.com/originals/4e/12/c5/4e12c5a5ab54f7fa4bd56a846335d5a3.png",
                hasSelectedFace: true,
              });
              faceReady();
            }}
          />
          <img
            src={AkwardFace}
            alt="face option"
            onClick={() => {
              db.collection("users").doc(user.uid).update({
                selectedFace:
                  "https://cdn.shopify.com/s/files/1/1061/1924/products/Upside-Down_Face_Emoji_4dbbbd80-eb60-4c91-9642-83368692e361_1024x1024.png?v=1571606036",
                hasSelectedFace: true,
              });
              faceReady();
            }}
          />
          <img
            src={SleepyFace}
            alt="face option"
            onClick={() => {
              db.collection("users").doc(user.uid).update({
                selectedFace:
                  "https://cdn4.iconfinder.com/data/icons/emoji-18/61/24-512.png",
                hasSelectedFace: true,
              });
              faceReady();
            }}
          />
        </div>
        <div className="image__row">
          <img
            src={SunglassesFace}
            alt="face option"
            onClick={() => {
              db.collection("users").doc(user.uid).update({
                selectedFace:
                  "https://i.pinimg.com/originals/25/b9/24/25b924f1d18fea2c7dfcb26a9905c1e8.png",
                hasSelectedFace: true,
              });
              faceReady();
            }}
          />
          <img
            src={BruhFace}
            alt="face option"
            onClick={() => {
              db.collection("users").doc(user.uid).update({
                selectedFace:
                  "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/56687/girl-emoji-clipart-md.png",
                hasSelectedFace: true,
              });
              faceReady();
            }}
          />
          <img
            src={ManFaceCurly}
            alt="face option"
            onClick={() => {
              db.collection("users").doc(user.uid).update({
                selectedFace:
                  "https://cdn.shopify.com/s/files/1/1061/1924/products/41_large.png?v=1571606117",
                hasSelectedFace: true,
              });
              faceReady();
            }}
          />
        </div>
        <div className="image__row">
          <img
            src={ManFaceStraight}
            alt="face option"
            onClick={() => {
              db.collection("users").doc(user.uid).update({
                selectedFace:
                  "https://cdn.shopify.com/s/files/1/1061/1924/products/48_1024x1024.png?v=1571606117",
                hasSelectedFace: true,
              });
              faceReady();
            }}
          />
          <img
            src={WomanFaceBruh}
            alt="face option"
            onClick={() => {
              db.collection("users").doc(user.uid).update({
                selectedFace:
                  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/81/girl_1f467.png",
                hasSelectedFace: true,
              });
              faceReady();
            }}
          />
          <img
            src={WomanFaceMicrosoft}
            alt="face option"
            onClick={() => {
              db.collection("users").doc(user.uid).update({
                selectedFace:
                  "https://cdn-0.emojis.wiki/emoji-pics/microsoft/girl-microsoft.png",
                hasSelectedFace: true,
              });
              faceReady();
            }}
          />
        </div>
      </StyledFaceInner>
    </StyledFaceSelectionPage>
  );
}
const StyledFaceSelectionPage = styled.div`
  width: 100%;
  height: 100vh;
  padding: 2rem;
  > h2 {
    color: #333;
    text-align: center;
  }
`;
const StyledFaceInner = styled.div`
  width: 80%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  border-radius: 20px;
  border: 1px solid #e6e4e4;
  > .image__row {
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    > img {
      width: 70px;
      height: 70px;
      object-fit: contain;
      border: 1px solid #e0e0e0;
      padding: 5px;
      border-radius: 10px;
      cursor: pointer;
    }
  }
`;

export default FaceSelection;
