import { Box, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";

import "./DashboardPage.css";
import MatchContainer from "../components/MatchContainer";
import SwipeContainer from "../components/SwipeContainer";
import ChatContainer from "../components/ChatContainer";


const DashboardPage = () => {

  return (
    <div className="back">
      <Box margin="auto" d="flex" >
        <MatchContainer />
        <SwipeContainer/>
        <ChatContainer/>
      </Box>
    </div>
  );
};

export default DashboardPage;
