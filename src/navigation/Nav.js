import React from "react";
import TimelineIcon from "@material-ui/icons/Timeline";
import ExploreIcon from "@material-ui/icons/Explore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import styled from "styled-components";
import { useHistory } from "react-router";

function Nav({ historyState }) {
  const history = useHistory();

  return (
    <StyledNav>
      <HomeIcon
        onClick={() => {
          history.push("/");
        }}
      />
      <TimelineIcon
        onClick={() => {
          history.push("/statistics");
        }}
      />
      <AccountCircleIcon
        onClick={() => {
          history.push("/profile");
        }}
      />
      <ExploreIcon
        onClick={() => {
          history.push(`/${historyState === true ? "game" : "fullmap"}`);
        }}
      />
    </StyledNav>
  );
}
const StyledNav = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background: #f2f2f2;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  border-top: 1px solid lightgray;
  z-index: 100;
  > .MuiSvgIcon-root {
    font-size: 35px;
    cursor: pointer;
  }
  .full__map--container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100vh - 60px);
    transition: all 0.5s ease;
    transform: translateX(0);
    opacity: 1;
    z-index: 90;
  }
  .no__map--container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100vh - 60px);
    opacity: 0.4;
    transition: all 0.5s ease;
    transform: translateX(-100%);
  }
`;

export default Nav;
