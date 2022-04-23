import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import PawsContext from "./paws-context";

const PawsProvider = (props) => {
  const [user, setUser] = useState();
  const [selectedMatch, setSelectedMatch] = useState(false);
  const [chats, setChats] = useState([]);
  const [fetchedUser, setFetchedUser] = useState(null)
  //const [finalMatchedProfiles, setFinalMatchedProfiles] = useState([]); 
  //const [cookies, setCookie, removeCookie] = useCookies(["user"]);

 // const userId = cookies.UserId;
  
  //const navigate = useNavigate();

  useEffect(() => {
    const pawsUserDetails = JSON.parse(localStorage.getItem("pawsUserDetails"));
    setUser(pawsUserDetails);
  
    //if (!pawsUserDetails) navigate("/");
  }, []);

  //console.log(chats, 'chats context');
  //console.log("user check context", user);
  
  const getUser = async () => {
    try {
      const response = await axios.get("/user", {
        params: {userId: user?.user_id}
      });
      //console.log("user loaded from server on dashboard",response.data)
      setFetchedUser(response.data);
      //window.location.reload
    } catch (error) {
      console.log(error);
    }
  }; 

  useEffect(() => {
    getUser();   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user]);

  const updateMatches = async(matchedUserId) => {

    try{
      //config
      const response = await axios.put("/addmatch", { userId:user?.user_id, matchedUserId});
      //sending logged in userid and matcheduser id in body
      //console.log("response data from server on  a right swipe context",response.data);
      //setUser(response.data);
      getUser();
      localStorage.setItem("pawsUserDetails", JSON.stringify(response.data));
      setUser(response.data);
      //console.log("fetchedUser inside updatemnatches",fetchedUser);//late inside by 1
    }catch(error){
      console.log(error);
    }
  }

  const deleteMatch = async(deleteMatchId) => {
    
    try{
      //config
      const response = await axios.put("/deletematch", { userId:user?.user_id, deleteMatchId});
      console.log("response data from server on deleting a match",response.data);
      //setUser(response.data);
      getUser();
      localStorage.setItem("pawsUserDetails", JSON.stringify(response.data));
      setUser(response.data);
      //console.log("fetchedUser inside updatemnatches",fetchedUser);//late inside by 1
    }catch(error){
      console.log(error);
    }
  }

  //console.log("localstorage user context", user);
  //console.log("fetched user context out", fetchedUser);
  //console.log('finalMatchedProfiles', finalMatchedProfiles);
  return (
    <React.Fragment>
      <PawsContext.Provider
        value={{
          user,
          setUser,
          selectedMatch,
          setSelectedMatch,
          chats,
          setChats,
          updateMatches,
          deleteMatch,
          
        }}
      >
        {props.children}
      </PawsContext.Provider>
    </React.Fragment>
  );
};

export default PawsProvider;
 