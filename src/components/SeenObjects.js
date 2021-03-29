import React from "react";
import styled from "styled-components";
import CancelIcon from "@material-ui/icons/Cancel";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import CloseIcon from "@material-ui/icons/Close";

function SeenObjects({ setShowSeenObjects, wentObjects }) {
  return (
    <StyledModal>
      <ModalContent>
        <CancelIcon
          onClick={() => {
            setShowSeenObjects(false);
          }}
        />
        {wentObjects.length === 0 ? (
          <p className="no__objects--text">
            Jūs pagaidām neesat atradis nevienu objektu
          </p>
        ) : (
          <>
            <h2>Atrastie Objekti:</h2>
            <div className="found__objects--container">
              {wentObjects.map((seenObject) => (
                <div className="seen__object" key={seenObject.id}>
                  <div className="seen__object--left">
                    <img src={seenObject.image} alt="object" />
                  </div>
                  <div className="seen__object--middle">
                    <p>{seenObject.name}</p>
                  </div>
                  <div className="seen__object--right">
                    {seenObject.correctAnswer === true ? (
                      <DoneOutlineIcon style={{ color: "green" }} />
                    ) : (
                      <CloseIcon style={{ color: "red" }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </ModalContent>
    </StyledModal>
  );
}
const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: #d8d7d7;
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem 2rem 6rem 2rem;
  overflow-y: scroll;
`;
const ModalContent = styled.div`
  width: 100%;
  background: #f9f9f9;
  border-radius: 15px;
  position: relative;
  height: 100%;
  .no__objects--text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 100%;
  }
  > h2 {
    text-align: center;
    margin-top: 10px;
    @media (max-width: 321px) {
      font-size: 17px;
    }
  }
  > .MuiSvgIcon-root {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 30px;
  }
  > .found__objects--container {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    margin-top: 20px;
    > .seen__object {
      width: 100%;
      height: 80px;
      border-top: 1px solid lightgrey;
      border-bottom: 1px solid lightgrey;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 20px 5px 5px;
      > .seen__object--left {
        > img {
          height: 70px;
          width: auto;
          max-width: 70px;
          object-fit: cover;
        }
      }
      > .seen__object--middle {
        > p {
          font-size: 17px;
          font-weight: 600;
          text-align: center;
        }
      }
      :hover {
        background: #f0f0f0;
      }
    }
  }
`;

export default SeenObjects;
