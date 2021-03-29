import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { API_KEY } from "../private/api";
import styled from "styled-components";
import { mapStyles } from "../styles/mapStyles";
import * as startingPoints from "../data/startingPoints.json";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

function FullMap({
  lastObject,
  startFlagged,
  userInfo,
  objects,
  calcCoords,
  setObjectCoords,
  objectCoords,
  setCalcCoords,
  userCoords,
  geolocationErr,
}) {
  const center = {
    lat: 56.521419993422086,
    lng: 21.019203741221318,
  };

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
              center={objectCoords ? objectCoords : userCoords}
              zoom={12}
              options={{ styles: mapStyles }}
            >
              {startFlagged === false && (
                <>
                  {startingPoints.startpos.map((startpos) => (
                    <Marker
                      key={Math.random() * 123456789 * 987654321}
                      position={{
                        lat: startpos.coords[0],
                        lng: startpos.coords[1],
                      }}
                      icon={{
                        url:
                          "https://static.thenounproject.com/png/1423986-200.png",
                        scaledSize: new window.google.maps.Size(30, 30),
                      }}
                      onClick={() => {
                        setObjectCoords({
                          lat: startpos.coords[0],
                          lng: startpos.coords[1],
                        });
                      }}
                    />
                  ))}
                </>
              )}
              {startFlagged === true && (
                <>
                  {objects.map((object) => (
                    <Marker
                      key={object.name}
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
                        setObjectCoords({
                          lat: object.lat,
                          lng: object.lng,
                        });
                        setCalcCoords({
                          lat: object.lat,
                          lng: object.lng,
                        });
                      }}
                    />
                  ))}
                </>
              )}
              <>
                {center && (
                  <Circle
                    center={center}
                    radius={4900}
                    options={{
                      strokeColor: "#e03e1d",
                      strokeOpacity: 0.5,
                      strokeWeight: 2,
                      fillColor: "#fff",
                      fillOpacity: 0,
                    }}
                  />
                )}
              </>
              <>
                {userCoords && userInfo && (
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
                )}
              </>
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

export default FullMap;
