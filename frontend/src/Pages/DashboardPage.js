import { Box, IconButton } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";

import "./DashboardPage.css";
import MatchContainer from "../components/MatchContainer";
import SwipeContainer from "../components/SwipeContainer";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import { useCookies } from "react-cookie";
import PawsContext from "../Context/paws-context";
import Alerts from "../components/Alerts";

const DashboardPage = () => {
  //const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const userId = cookies.UserId;

  const { user } = useContext(PawsContext);

  const getUser = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/user", {
        params: { userId },
      });
      console.log("user loaded from server on dashboard",response.data)
      //setUser(response.data);
      //window.location.reload
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  //console.log("user", user);

  return (
    <React.Fragment>
    {!user ? (
      <Box className="home"><Alerts/></Box>
      
    ):(
      <div className="back">
        <Box
          d="flex"
          alignItems="center"
          width="100%"
          margin="1rem"
          justifyContent="space-around"
          px={1}
          py={1}
        >
          <MatchContainer /* user = {user} *//>
          <SwipeContainer />
          <ChatContainer />
        </Box>
    </div>

    )}
    </React.Fragment>
      );
};

export default DashboardPage;
