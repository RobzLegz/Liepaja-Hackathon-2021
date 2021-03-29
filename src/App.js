import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { login, logout, selectUser } from "./features/userSlice";
import FaceSelection from "./pages/FaceSelection";
import FinishPage from "./pages/FinishPage";
import FullMapPage from "./pages/FullMapPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ResultsPage from "./pages/ResultsPage";
import SignInPage from "./pages/SignInPage";
import StartingPage from "./pages/StartingPage";
import StatisticsPage from "./pages/StatisticsPage";
import db, { auth } from "./private/firebase";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  const [userInfo, setUserInfo] = useState([]);
  const [historyState, setHistoryState] = useState(false);
  const [answeredCorrect, setAnsweredCorrect] = useState(false);
  const [infoPopupState, setInfoPopupState] = useState(false);
  const [objectId, setObjectId] = useState(0);
  const [userCoords, setUserCoords] = useState();
  const [startGamePopup, setStartGamePopup] = useState(false);
  const [walkMark, setWalkMark] = useState({});
  const [walkerMarkerState, setWalkerMarkerState] = useState(false);
  const [objects, setObjects] = useState([]);
  const [objectDescription, setObjectDescription] = useState("");
  const [objectName, setObjectName] = useState("");
  const [objectImage, setObjectImage] = useState("");
  const [allObject, setAllObject] = useState({});
  const [allAnswers, setAllAnswers] = useState([]);
  const [allChanceAnswers, setAllChanceAnswers] = useState([]);
  const [xtraObjectImages, setXtraObjectImages] = useState([]);
  const [calcCoords, setCalcCoords] = useState({});
  const [userId, setUserId] = useState("");
  const [objectCoords, setObjectCoords] = useState({
    lat: 56.521419993422086,
    lng: 21.019203741221318,
  });
  const [descriptionState, setDescriptionState] = useState(true);
  const [answer, setAnswer] = useState("");
  const [chanceAnswer, setChanceAnswer] = useState("");
  const [answerCorrect, setAnswerCorrect] = useState(true);
  const [checkPopupState, setCheckPopupState] = useState(false);
  const [xtraImageState, setXtraImageState] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [popupAnswer, setPopupAnswer] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSeenObjects, setShowSeenObjects] = useState(false);
  const [wentObjects, setWentObjects] = useState([]);
  const [lastObject, setLastObject] = useState(false);
  const [geolocationErr, setGeolocationErr] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [topUsers, setTopUsers] = useState([]);
  const [value, setValue] = useState(0);
  const [aboutGameState, setAboutGameState] = useState(false);
  const [rulePopupState, setRulePopupState] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          setUserCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }, 1000);
    } else {
      setGeolocationErr(true);
    }
  }, [userCoords]);

  useEffect(() => {
    if (user && user.uid) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc) {
            setUserInfo({
              name: doc.data().name,
              email: doc.data().email,
              gameStarted: doc.data().gameStarted,
              startFlagged: doc.data().startFlagged,
              hasSelectedFace: doc.data().hasSelectedFace,
              selectedFace: doc.data().selectedFace,
              hasPlayedBefore: doc.data().hasPlayedBefore,
              startTime: doc.data().startTime,
              hasPlayedBefore: doc.data().hasPlayedBefore,
            });
          }
        });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      if (userInfo.startFlagged === true) {
        db.collection("users")
          .doc(user.uid)
          .collection("objects")
          .onSnapshot((snapshot) =>
            setObjects(
              snapshot.docs.map((doc) => ({
                objectId: doc.id,
                name: doc.data().name,
                lat: doc.data().lat,
                lng: doc.data().lng,
                description: doc.data().description,
                image: doc.data().image,
                isFound: doc.data().isFound,
                question1: doc.data().question1,
                answers1: doc.data().answers1,
                correct1: doc.data().correct1,
                question2: doc.data().question2,
                answers2: doc.data().answers2,
                correct2: doc.data().correct2,
                extraImages: doc.data().extraImages,
              }))
            )
          );
      }
    }
  }, [userInfo.startFlagged]);

  useEffect(() => {
    if (user && user.uid) {
      db.collection("users")
        .doc(user.uid)
        .collection("foundObjects")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setWentObjects(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              image: doc.data().image,
              name: doc.data().name,
              correctAnswer: doc.data().correctAnswer,
            }))
          )
        );
    }

    db.collection("finishedUsers")
      .orderBy("time", "asc")
      .onSnapshot((snapshot) => {
        setTopUsers(
          snapshot.docs.map((doc) => ({
            name: doc.data().name,
            value: doc.data().time,
            email: doc.data().email,
          }))
        );
      });

    if (objects.length - 1 === wentObjects.length) {
      setLastObject(true);
    }

    if (
      userInfo.startFlagged === true &&
      objects.length === wentObjects.length &&
      objects.length !== wentObjects.length + 1 &&
      objects.length - 1 !== wentObjects.length &&
      objects.length !== 0
    ) {
      setGameEnded(true);
    } else {
      setGameEnded(false);
    }
  }, [objects, user, wentObjects.length, objects.length]);

  useEffect(() => {
    if (userInfo.startFlagged === true) {
      timePlayed();
    }
  }, [userInfo.startFlagged]);

  const timePlayed = () => {
    setInterval(() => {
      setValue(
        Math.floor(
          Math.floor((new Date().getTime() - userInfo.startTime) / 1000) / 60
        )
      );
    }, 1000);
  };

  return (
    <>
      <GlobalStyles />
      {!user ? (
        <BrowserRouter>
          <Switch>
            <Route path="/signin">
              <SignInPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/">
              <StartingPage
                setAboutGameState={setAboutGameState}
                aboutGameState={aboutGameState}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          {gameEnded && (
            <FinishPage
              value={value}
              wentObjects={wentObjects}
              setGameEnded={setGameEnded}
              objects={objects}
              userInfo={userInfo}
            />
          )}
          <Switch>
            <Route path="/statistics">
              {userInfo.hasSelectedFace === true ? (
                <>
                  {userInfo && (
                    <StatisticsPage
                      value={value}
                      setTopUsers={setTopUsers}
                      topUsers={topUsers}
                      wentObjects={wentObjects}
                      setShowSeenObjects={setShowSeenObjects}
                      showSeenObjects={showSeenObjects}
                      setShowModal={setShowModal}
                      showModal={showModal}
                      userInfo={userInfo}
                    />
                  )}
                </>
              ) : (
                <FaceSelection userInfo={userInfo} />
              )}
            </Route>
            <Route path="/results">
              <ResultsPage topUsers={topUsers} userInfo={userInfo} />
            </Route>

            <Route path="/profile">
              {userInfo.hasSelectedFace === true ? (
                <>
                  {userInfo && (
                    <ProfilePage
                      name={userInfo.name}
                      userInfo={userInfo}
                      email={userInfo.email}
                    />
                  )}
                </>
              ) : (
                <FaceSelection userInfo={userInfo} />
              )}
            </Route>

            <Route path="/fullmap">
              {userInfo.hasSelectedFace === true ? (
                <>
                  {userInfo && (
                    <FullMapPage
                      geolocationErr={geolocationErr}
                      lastObject={lastObject}
                      calcCoords={calcCoords}
                      setObjectCoords={setObjectCoords}
                      objectCoords={objectCoords}
                      setCalcCoords={setCalcCoords}
                      userCoords={userCoords}
                      objects={objects}
                      userInfo={userInfo}
                      historyState={historyState}
                      setHistoryState={setHistoryState}
                      startFlagged={userInfo.startFlagged}
                    />
                  )}
                </>
              ) : (
                <FaceSelection userInfo={userInfo} />
              )}
            </Route>
            <Route path="/game">
              {userInfo.hasSelectedFace === true ? (
                <>
                  {userInfo && (
                    <HomePage
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
                      userCoords={userCoords}
                      setUserCoords={setUserCoords}
                      walkMark={walkMark}
                      objects={objects}
                      setObjects={setObjects}
                      objectDescription={objectDescription}
                      setWalkMark={setWalkMark}
                      objectName={objectName}
                      setAllAnswers={setAllAnswers}
                      setXtraObjectImages={setXtraObjectImages}
                      xtraObjectImages={xtraObjectImages}
                      allChanceAnswers={allChanceAnswers}
                      setAllChanceAnswers={setAllChanceAnswers}
                      allObject={allObject}
                      setAllObject={setAllObject}
                      allAnswers={allAnswers}
                      setObjectImage={setObjectImage}
                      objectImage={objectImage}
                      setObjectName={setObjectName}
                      setObjectDescription={setObjectDescription}
                      setWalkerMarkerState={setWalkerMarkerState}
                      walkerMarkerState={walkerMarkerState}
                      startGamePopup={startGamePopup}
                      setStartGamePopup={setStartGamePopup}
                      setInfoPopupState={setInfoPopupState}
                      answeredCorrect={answeredCorrect}
                      setAnsweredCorrect={setAnsweredCorrect}
                      userInfo={userInfo}
                      newDbValue={userInfo.timeValue}
                      historyState={historyState}
                      setHistoryState={setHistoryState}
                      startFlagged={userInfo.startFlagged}
                    />
                  )}
                </>
              ) : (
                <FaceSelection userInfo={userInfo} />
              )}
            </Route>
            <Route path="/avatar">
              <FaceSelection userInfo={userInfo} changeAvatar />
            </Route>
            <Route path="/">
              {userInfo.hasSelectedFace === true ? (
                <>
                  {userInfo && (
                    <LandingPage
                      setRulePopupState={setRulePopupState}
                      rulePopupState={rulePopupState}
                      startFlagged={userInfo.startFlagged}
                      gameStarted={userInfo.gameStarted}
                    />
                  )}
                </>
              ) : (
                <FaceSelection userInfo={userInfo} />
              )}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
