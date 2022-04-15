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
  //const [cookies, setCookie, removeCookie] = useCookies(["user"]);

 // const userId = cookies.UserId;
  
  const navigate = useNavigate();

  useEffect(() => {
    const pawsUserDetails = JSON.parse(localStorage.getItem("pawsUserDetails"));
    setUser(pawsUserDetails);
  
    //if (!pawsUserDetails) navigate("/");
  }, []);

  //console.log(chats, 'chats context');
  //console.log("user check context", user);
  
  const getUser = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/user", {
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

  console.log("fetched user context", fetchedUser);
  console.log("localstorage user", user);

  return (
    <React.Fragment>
      <PawsContext.Provider
        value={{
          user,
          setUser,
          selectedMatch,
          setSelectedMatch,
          chats,
          setChats
        }}
      >
        {props.children}
      </PawsContext.Provider>
    </React.Fragment>
  );
};

export default PawsProvider;
