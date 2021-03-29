import React, { useEffect } from "react";
import FullMap from "../fullMap/FullMap";
import Nav from "../navigation/Nav";

function FullMapPage({
  lastObject,
  startFlagged,
  setHistoryState,
  historyState,
  userInfo,
  userCoords,
  objects,
  calcCoords,
  setObjectCoords,
  objectCoords,
  setCalcCoords,
  user,
  geolocationErr,
}) {
  useEffect(() => {
    return setHistoryState(true);
  }, []);

  return (
    <div>
      <FullMap
        geolocationErr={geolocationErr}
        lastObject={lastObject}
        user={user}
        calcCoords={calcCoords}
        setObjectCoords={setObjectCoords}
        objectCoords={objectCoords}
        setCalcCoords={setCalcCoords}
        objects={objects}
        userCoords={userCoords}
        userInfo={userInfo}
        startFlagged={startFlagged}
      />
      <Nav historyState={historyState} />
    </div>
  );
}

export default FullMapPage;
