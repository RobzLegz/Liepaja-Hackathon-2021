import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { API_KEY } from "../private/api";
import styled from "styled-components";
import * as startingPoints from "./testStartingPoints.json";
import ObjectDetail from "../details/ObjectDetail";
import { mapStyles } from "../styles/mapStyles";
import StartGamePopup from "../popups/StartGamePopup";
import WarningPopup from "../warningPopup/WarningPopup";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 60px)",
};

const testCenter = {
  lat: 56.521419993422086,
  lng: 21.019203741221318,
};

function TestMap({
  geolocationErr,
  lastObject,
  setUserId,
  userId,
  startFlagged,
  newDbValue,
  userInfo,
  setAnsweredCorrect,
  answeredCorrect,
  infoPopupState,
  objectId,
  setObjectId,
  setInfoPopupState,
  userCoords,
  startGamePopup,
  setStartGamePopup,
  walkMark,
  setWalkMark,
  walkerMarkerState,
  setWalkerMarkerState,
  objects,
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
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${API_KEY}`,
  });

  return (
    <>
      {!geolocationErr && userCoords ? (
        <>
          {isLoaded && (
            <StyledMap
              mapContainerStyle={containerStyle}
              center={userCoords}
              zoom={16}
              options={{ styles: mapStyles }}
              onClick={() => {
                setInfoPopupState(false);
              }}
              onDrag={() => {
                setInfoPopupState(false);
              }}
            >
              <Marker
                position={{
                  lat: userCoords.lat,
                  lng: userCoords.lng,
                }}
                icon={{
                  url: userInfo.selectedFace,
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
              {walkerMarkerState && (
                <Marker
                  position={{
                    lat: walkMark.lat,
                    lng: walkMark.lng,
                  }}
                  icon={{
                    url:
                      "http://www.clker.com/cliparts/3/u/P/P/q/W/walking-icon-hi.png",
                    scaledSize: new window.google.maps.Size(20, 30),
                  }}
                  onClick={() => {
                    setWalkerMarkerState(false);
                  }}
                />
              )}
              {startFlagged === false && (
                <>
                  {startingPoints.startpos.map((startpos) => (
                    <>
                      {((userCoords.lat - startpos.coords[0]) * 111.3) ** 2 +
                        ((userCoords.lng - startpos.coords[1]) * 111.3) ** 2 <=
                        0.1829430652 && (
                        <Marker
                          key={startpos.name}
                          position={{
                            lat: startpos.coords[0],
                            lng: startpos.coords[1],
                          }}
                          icon={{
                            url:
                              "https://cdn0.iconfinder.com/data/icons/mobile-development-svg-icons/60/Map_marker-512.png",
                            scaledSize: new window.google.maps.Size(30, 30),
                          }}
                          onClick={() => {
                            setStartGamePopup(true);
                          }}
                        />
                      )}
                    </>
                  ))}
                </>
              )}
              {startGamePopup && user && (
                <StartGamePopup
                  setUserId={setUserId}
                  userId={userId}
                  user={user}
                  setStartGamePopup={setStartGamePopup}
                />
              )}
              {startFlagged === true && objects !== [] && (
                <>
                  {objects.map((object) => (
                    <>
                      {answeredCorrect ? (
                        <>
                          {((userCoords.lat - object.lat) * 111.3) ** 2 +
                            ((userCoords.lng - object.lng) * 111.3) ** 2 <
                            0.1829430652 && (
                            <Marker
                              key={object.objectId}
                              id={object.objectId}
                              position={{
                                lat: object.lat,
                                lng: object.lng,
                              }}
                              icon={{
                                url: `${
                                  object.isFound === false
                                    ? lastObject === false
                                      ? "https://image.flaticon.com/icons/png/512/395/395841.png"
                                      : "https://cdn0.iconfinder.com/data/icons/mobile-development-svg-icons/60/Map_marker-512.png"
                                    : "https://upload.wikimedia.org/wikipedia/commons/b/bd/Gray_flag_waving.png"
                                }`,
                                scaledSize: new window.google.maps.Size(30, 30),
                              }}
                              onClick={() => {
                                setObjectImage(object.image);
                                setObjectId(object.objectId);
                                setObjectName(object.name);
                                setObjectDescription(object.description);
                                setXtraObjectImages(object.extraImages);
                                setAllObject({
                                  question1: object.question1,
                                  correct1: object.correct1,
                                  question2: object.question2,
                                  answers2: object.answers2,
                                  correct2: object.correct2,
                                });
                                setAllAnswers(object.answers1);
                                setAllChanceAnswers(object.answers2);
                                if (object.isFound === false) {
                                  setInfoPopupState(true);
                                  setAnsweredCorrect(false);
                                } else {
                                  return;
                                }
                              }}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {((userCoords.lat - object.lat) * 111.3) ** 2 +
                            ((userCoords.lng - object.lng) * 111.3) ** 2 <=
                            0.0914715326 && (
                            <Marker
                              key={object.name}
                              id={object.id}
                              position={{
                                lat: object.lat,
                                lng: object.lng,
                              }}
                              icon={{
                                url: `${
                                  object.isFound === false
                                    ? "https://image.flaticon.com/icons/png/512/395/395841.png"
                                    : "https://upload.wikimedia.org/wikipedia/commons/b/bd/Gray_flag_waving.png"
                                }`,
                                scaledSize: new window.google.maps.Size(30, 30),
                              }}
                              onClick={() => {
                                setObjectImage(object.image);
                                setObjectId(object.objectId);
                                setObjectName(object.name);
                                setObjectDescription(object.description);
                                setXtraObjectImages(object.extraImages);
                                setAllObject({
                                  question1: object.question1,
                                  correct1: object.correct1,
                                  question2: object.question2,
                                  answers2: object.answers2,
                                  correct2: object.correct2,
                                });
                                setAllAnswers(object.answers1);
                                setAllChanceAnswers(object.answers2);
                                if (object.isFound === false) {
                                  setInfoPopupState(true);
                                  setAnsweredCorrect(false);
                                } else {
                                  return;
                                }
                              }}
                            />
                          )}
                        </>
                      )}
                    </>
                  ))}
                  {infoPopupState && (
                    <ObjectDetail
                      setAnsweredCorrect={setAnsweredCorrect}
                      allObject={allObject}
                      newDbValue={newDbValue}
                      image={objectImage}
                      name={objectName}
                      description={objectDescription}
                      setInfoPopupState={setInfoPopupState}
                      id={objectId}
                      allAnswers={allAnswers}
                      allChanceAnswers={allChanceAnswers}
                      xtraObjectImages={xtraObjectImages}
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
                    />
                  )}
                </>
              )}
              {((userCoords.lat - testCenter.lat) * 111.3) ** 2 +
                ((userCoords.lng - testCenter.lng) * 111.3) ** 2 >=
                75.84421888 && (
                <>
                  <Circle
                    radius={9999999999999999999}
                    center={testCenter}
                    options={{
                      strokeColor: "#e03d0b",
                      strokeOpacity: 0.7,
                      strokeWeight: 2,
                      fillColor: "#e03d0b",
                      fillOpacity: 0.2,
                    }}
                  />
                  <WarningPopup />
                </>
              )}
              {((userCoords.lat - testCenter.lat) * 111.3) ** 2 +
                ((userCoords.lng - testCenter.lng) * 111.3) ** 2 >=
              75.84421888 ? (
                <Circle
                  center={testCenter}
                  radius={4900}
                  options={{
                    strokeColor: "green",
                    strokeOpacity: 0.7,
                    strokeWeight: 2,
                    fillColor: "green",
                    fillOpacity: 0.3,
                  }}
                />
              ) : (
                <Circle
                  center={testCenter}
                  radius={4900}
                  options={{
                    strokeColor: "#e03d0b",
                    strokeOpacity: 0.7,
                    strokeWeight: 2,
                    fillColor: "transparent",
                    fillOpacity: 1,
                  }}
                />
              )}
              <Circle
                center={userCoords}
                radius={answeredCorrect ? 300 : 160}
                onClick={(event) => {
                  setWalkMark({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                  });
                  setWalkerMarkerState(true);
                }}
                options={{
                  strokeColor: "#050505",
                  strokeOpacity: 0.5,
                  strokeWeight: 2,
                  fillColor: "transparent",
                  fillOpacity: 1,
                }}
              />
            </StyledMap>
          )}
        </>
      ) : (
        <StyledNoLocation>
          <p>Lūdzu atļaujiet Jūsu atrašanās vietas noteikšanu</p>
        </StyledNoLocation>
      )}
    </>
  );
}
const StyledMap = styled(GoogleMap)``;
const StyledNoLocation = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
  > p {
    font-size: 1.1rem;
    margin-bottom: 30px;
  }
`;

export default TestMap;
