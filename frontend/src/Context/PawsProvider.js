import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PawsContext from "./paw-context";

const PawsProvider = (props) => {
  const [user, setUser] = useState();
  const [selectedMatch, setSelectedMatch] = useState();
  const [chats, setChats] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const pawsUserDetails = JSON.parse(localStorage.getItem("pawsUserDetails"));
    setUser(pawsUserDetails);

    if (!pawsUserDetails) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  //console.log(chats, 'chats context')
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
        }}
      >
        {props.children}
      </PawsContext.Provider>
    </React.Fragment>
  );
};

export default PawsProvider;
