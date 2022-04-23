import React, {useContext} from 'react';
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import PawsContext from '../Context/paws-context';
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
  } from "../config/ChatLogics";

const ScrollableChat = ({ messages }) => {

    const { user } =  useContext(PawsContext);
  
    return (
      <ScrollableFeed>
        {messages &&
          messages.map((message, i) => (
            <div style={{ display: "flex", color:"white", fontWeight:"bold" }} key={message.id}/*message.timestamp*/ >
              {(isSameSender(messages, message, i, user) ||
                isLastMessage(messages, i, user)) && (
                <Tooltip label={message.name} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    src={message.img}
                    cursor="pointer"
                    name={message.name}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    message.name === user.name ? "#44337A" : "#9B2C2C"
                  }`,
                  marginLeft: isSameSenderMargin(messages, message, i, user),
                  marginTop: isSameUser(messages, message, i, user) ? 3 : 9,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              > 
                {message.message}
              </span>
            </div>
          ))}
      </ScrollableFeed>
    );
  };
  
  export default ScrollableChat;