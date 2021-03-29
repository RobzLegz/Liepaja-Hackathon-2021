import React, { useEffect } from "react";
import styled from "styled-components";
import db from "../private/firebase";
import Statistics from "../statisticscomponents/Statistics";

function StatisticsPage({
  value,
  userInfo,
  secondState,
  wentObjects,
  setShowSeenObjects,
  showSeenObjects,
  setShowModal,
  showModal,
  topUsers,
  setTopUsers,
}) {
  useEffect(() => {
    db.collection("finishedUsers")
      .orderBy("time", "asc")
      .onSnapshot((snapshot) => {
        setTopUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            value: doc.data().time,
          }))
        );
      });
  });

  return (
    <StyledStatisticsPage>
      <Statistics
        topUsers={topUsers}
        wentObjects={wentObjects}
        setShowSeenObjects={setShowSeenObjects}
        showSeenObjects={showSeenObjects}
        setShowModal={setShowModal}
        showModal={showModal}
        secondState={secondState}
        userInfo={userInfo}
        value={value}
      />
    </StyledStatisticsPage>
  );
}
const StyledStatisticsPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: whitesmoke;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export default StatisticsPage;
