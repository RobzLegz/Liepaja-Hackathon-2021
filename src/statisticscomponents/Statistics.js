import React from "react";
import Nav from "../navigation/Nav";
import styled from "styled-components";
import Top10 from "../components/Top10";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SeenObjects from "../components/SeenObjects";

function Statistics({
  value,
  wentObjects,
  setShowSeenObjects,
  showSeenObjects,
  setShowModal,
  showModal,
  topUsers,
  userInfo,
}) {
  return (
    <>
      <StyledStatisticsPage>
        <h1>Statistika</h1>
        <hr />
        <h3 className="heading">Tavi rezultāti:</h3>
        <div className="results">
          <p>
            Punkti: <span>({value})</span>
          </p>
        </div>
        <div
          className="bestresults"
          style={{ borderTop: "1px solid lightgrey" }}
          onClick={() => {
            setShowSeenObjects(true);
          }}
        >
          <h3>Apskatītie Objekti: ({wentObjects.length})</h3>
          <AddCircleIcon id="plus" />
        </div>
        <div
          className="bestresults"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <h3>Labākie rezultāti:</h3>
          <AddCircleIcon id="plus" />
        </div>
        <div className={`${showModal ? "shown__modal" : "hidden__popup"}`}>
          <Top10
            topUsers={topUsers}
            userInfo={userInfo}
            setShowModal={setShowModal}
          />
        </div>
        <div
          className={`${showSeenObjects ? "shown__modal" : "hidden__popup"}`}
        >
          <SeenObjects
            wentObjects={wentObjects}
            setShowSeenObjects={setShowSeenObjects}
          />
        </div>
        {showModal === false && showSeenObjects === false && (
          <div className="time__spent--container">
            <h4>
              {Math.floor(value / 60)} :{" "}
              {Math.floor(value - Math.floor(value / 60) * 60) < 10
                ? "0" + Math.floor(value - Math.floor(value / 60) * 60)
                : Math.floor(value - Math.floor(value / 60) * 60)}
            </h4>
          </div>
        )}
      </StyledStatisticsPage>
      <Nav />
    </>
  );
}
const StyledStatisticsPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  background: whitesmoke;
  overflow: hidden;

  .hidden__popup {
    opacity: 0;
    transition: all 0.4s ease;
    transform: translateX(-100%);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .shown__modal {
    opacity: 1;
    transition: all 0.4s ease;
    transform: translateX(0%);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  > .time__spent--container {
    width: 100%;
    height: 60px;
    position: fixed;
    background: #e7e7e7;
    border-top: 1px solid lightgray;
    font-size: 1.3rem;
    display: grid;
    place-items: center;
    left: 0;
    bottom: 60px;
  }

  h1 {
    text-align: center;
    margin-top: 10px;
  }
  .heading {
    margin-top: 30px;
    padding-left: 10px;
    font-size: 24px;
    text-align: center;
    text-decoration: underline;
  }
  hr {
    margin-top: 10px;
    height: 3px;
    border: none;
    background-color: #990000;
    background-image: linear-gradient(147deg, #990000 0%, #ff0000 74%);
    border-radius: 60px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
  }

  .results {
    background-color: #fdfdfd;
    border: 1px solid #c0bebe;
    width: 80%;
    display: flex;
    margin: 15px auto 15px auto;
    padding: 20px;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    > p {
      font-size: 18px;
    }
  }

  span {
    font-weight: normal;
  }
  .bestresults {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #333;
    height: 50px;
    align-items: center;
    text-align: center;
    padding: 0 20px;
    border: 1px solid lightgray;
    border-left: none;
    border-right: none;
    border-top: none;
    > h3 {
      color: #333;
    }
    > .MuiSvgIcon-root {
      font-size: 30px;
    }
  }
`;

export default Statistics;
