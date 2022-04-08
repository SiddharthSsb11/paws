import { Box, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";

import "./DashboardPage.css";
import MatchContainer from "../components/MatchContainer";
import SwipeContainer from "../components/SwipeContainer";
import ChatContainer from "../components/ChatContainer";


const DashboardPage = () => {

  return (
    <div className="back">
      <Box  d="flex" alignItems="center" width="100%"  margin="1rem" justifyContent="space-around"
        px={1} py={1}
      >
        <MatchContainer />
        <SwipeContainer/>
        <ChatContainer/>
      </Box>
    </div>
  );
};

export default DashboardPage;
