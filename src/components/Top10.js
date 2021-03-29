import React from "react";
import styled from "styled-components";
import CancelIcon from "@material-ui/icons/Cancel";

function Top10({ setShowModal, topUsers, userInfo }) {
  let i = 1;

  return (
    <StyledModal>
      <ModalContent>
        <CancelIcon
          onClick={() => {
            setShowModal(false);
          }}
        />
        <h2>TOP 10</h2>
        {topUsers.length !== 0 ? (
          <>
            {topUsers.slice(0, 10).map((user) => (
              <div
                className={userInfo.name === user.name ? "my__result" : "top"}
                key={Math.random()}
              >
                <p>
                  {i < 10 ? "0" + i++ : i++}. {user.name}
                </p>
                <p>{user.value}</p>
              </div>
            ))}
          </>
        ) : (
          <p>Pagaidām neviens nav finišējis</p>
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
  padding: 2rem;
`;
const ModalContent = styled.div`
  width: 100%;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 15px;
  position: relative;
  min-height: 300px;
  > h2 {
    text-align: center;
    margin-bottom: 10px;
  }
  
  > p {
    margin-top: 100px;
    font-weight: 400;
    text-align: center;
  }
  > .MuiSvgIcon-root {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 30px;
  }
  > .top {
    display: flex;
    justify-content: space-between;
  }
  > .my__result {
    display: flex;
    justify-content: space-between;
    > p {
      color: #ec843f;
    }
  }
`;

export default Top10;
