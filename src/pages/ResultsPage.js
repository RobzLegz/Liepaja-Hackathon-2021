import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../private/firebase";

function ResultsPage({ topUsers, userInfo }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  let i = 1;

  return (
    <StyledResultsPage>
      <div className="top__heading--container">
        <h3>Top 20</h3>
      </div>
      <div className="top__container">
        {topUsers.length !== 0 ? (
          <>
            {topUsers.slice(0, 20).map((user) => (
              <div
                className={`${
                  userInfo.name === user.name
                    ? "user__container--top user__mach"
                    : "user__container--top"
                }`}
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
      </div>
      <div className="exit__button--container">
        <button
          onClick={() => {
            dispatch(logout());
            auth.signOut();
            history.push("/");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }}
        >
          Iziet
        </button>
      </div>
    </StyledResultsPage>
  );
}
const StyledResultsPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  > .top__heading--container {
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
    justify-content: center;
    > h3 {
      text-align: center;
      color: #333;
      font-size: 20px;
    }
  }

  > .top__container {
    width: 100%;
    height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    color: #333;
    > p {
      margin: auto;
    }
    > .user__container--top {
      width: 100%;
      border-bottom: 1px solid lightgray;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      height: 50px;
    }
    > .user__mach {
      background: #7878c0;
      color: #f5f5f5;
    }
  }
  > .exit__button--container {
    width: 100%;
    height: 60px;
    border-top: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    > button {
      padding: 10px 30px;
      background: #0f0f0f;
      color: #f5f5f5;
      font-size: 1rem;
      border-radius: 10px;
      cursor: pointer;
    }
  }
`;

export default ResultsPage;
