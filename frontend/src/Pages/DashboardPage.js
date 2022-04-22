import { Box, extendTheme } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";

import "./DashboardPage.css";
import MatchContainer from "../components/MatchContainer";
import SwipeContainer from "../components/SwipeContainer";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
//import { useCookies } from "react-cookie";
import PawsContext from "../Context/paws-context";
import Alerts from "../components/Alerts";

const DashboardPage = () => {
 // const [user, setUser] = useState(null);
  //const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [prefferedUsers, setPrefferedUsers] = useState(null);
 // const [users, setUsers] = useState()
 //userId = cookies.UserId;

  const { user, selectedMatch } = useContext(PawsContext);

  useEffect(() => {
    
    const getPreferredUsers = async () => {

      try {
  
        const response = await axios.get("/preferredUsers", {
          params: { interest: user?.interest }
        })
  
        //console.log("prefered users to swipe dashboard",response.data);
        setPrefferedUsers(response.data);
  
      }catch (error){
        console.log(error);
      }
    }

/*     const getUser = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/user", {
          params: {userId}
        });
        //console.log("user loaded from server on dashboard",response.data)
        setUser(response.data);
        //window.location.reload
      } catch (error) {
        console.log(error);
      }
    };  */

    //getUser();
    getPreferredUsers();
    
  }, [user]);

  //console.log("user loaded on dashboard from context", user);
  //console.log("preferred users loaded on dashboard", prefferedUsers);

  const matchedUsersIds = user?.matches.map(({user_id})=>user_id).concat(user.user_id);
  const prefferedUsersFinal = prefferedUsers?.filter((prefUser) => !matchedUsersIds.includes(prefUser.user_id))
  //const preferredUsersFinal = preferredUsers?.filter((prefUser) => prefUser.user_id !== user.user_id);
  
  return (
    <React.Fragment>
      {!user ? (
        <Box className="home">
          <Alerts />
        </Box>
      ) : (
        <div className="back">
          <Box
            d="flex"
            flexDirection={{ base: "column", xl: "row" }}
            alignItems="center"
            width="100%"
            margin="1rem auto"
            justifyContent="space-around"
            px={2}
            py={1}
            gap={{ base: "2rem", xl: "0.01rem" }}
          >
            <MatchContainer/>
            {prefferedUsers && <SwipeContainer prefUsers={prefferedUsersFinal} />}
            <ChatContainer />
          </Box>
        </div>
      )}
    </React.Fragment>
  );
};

export default DashboardPage;
