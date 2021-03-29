import React, { useEffect } from "react";
import styled from "styled-components";
import TestMap from "../testing/TestMap";
import Nav from "../navigation/Nav";

function HomePage({
  geolocationErr,
  lastObject,
  setUserId,
  userId,
  startFlagged,
  setHistoryState,
  historyState,
  newDbValue,
  userInfo,
  answeredCorrect,
  setAnsweredCorrect,
  infoPopupState,
  objectId,
  setObjectId,
  setInfoPopupState,
  userCoords,
  setUserCoords,
  startGamePopup,
  setStartGamePopup,
  walkMark,
  setWalkMark,
  walkerMarkerState,
  setWalkerMarkerState,
  objects,
  setObjects,
  objectDescription,
  setObjectDescription,
  objectName,
  setObjectName,
  objectImage,
  setObjectImage,
  allObject,
  setAllObject,
  allAnswers,
  setAllAnswers,
  allChanceAnswers,
  setAllChanceAnswers,
  xtraObjectImages,
  setXtraObjectImages,
  user,
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
  useEffect(() => {
    if (historyState === true) {
      setHistoryState(false);
    }
  });

  return (
    <StyledHomePage>
      <TestMap
        geolocationErr={geolocationErr}
        lastObject={lastObject}
        setPopupAnswer={setPopupAnswer}
        popupAnswer={popupAnswer}
        setPopupText={setPopupText}
        popupText={popupText}
        setXtraImageState={setXtraImageState}
        xtraImageState={xtraImageState}
        setCheckPopupState={setCheckPopupState}
        checkPopupState={checkPopupState}
        setAnswerCorrect={setAnswerCorrect}
        answerCorrect={answerCorrect}
        setChanceAnswer={setChanceAnswer}
        chanceAnswer={chanceAnswer}
        setAnswer={setAnswer}
        answer={answer}
        setDescriptionState={setDescriptionState}
        descriptionState={descriptionState}
        setUserId={setUserId}
        userId={userId}
        user={user}
        infoPopupState={infoPopupState}
        objectId={objectId}
        setObjectId={setObjectId}
        setInfoPopupState={setInfoPopupState}
        userCoords={userCoords}
        setUserCoords={setUserCoords}
        startGamePopup={startGamePopup}
        setStartGamePopup={setStartGamePopup}
        walkMark={walkMark}
        setWalkMark={setWalkMark}
        walkerMarkerState={walkerMarkerState}
        setWalkerMarkerState={setWalkerMarkerState}
        objects={objects}
        setObjects={setObjects}
        objectDescription={objectDescription}
        setObjectDescription={setObjectDescription}
        objectName={objectName}
        setObjectName={setObjectName}
        objectImage={objectImage}
        setObjectImage={setObjectImage}
        allObject={allObject}
        setAllObject={setAllObject}
        allAnswers={allAnswers}
        setAllAnswers={setAllAnswers}
        allChanceAnswers={allChanceAnswers}
        setAllChanceAnswers={setAllChanceAnswers}
        xtraObjectImages={xtraObjectImages}
        setXtraObjectImages={setXtraObjectImages}
        answeredCorrect={answeredCorrect}
        setAnsweredCorrect={setAnsweredCorrect}
        userInfo={userInfo}
        newDbValue={newDbValue}
        startFlagged={startFlagged}
      />
      <Nav historyState={historyState} />
    </StyledHomePage>
  );
}
const StyledHomePage = styled.div`
  overflow: hidden;
`;

export default HomePage;
