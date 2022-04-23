import React, { useContext, useEffect, useState } from "react";
import {
  List,
  ListItem,
  IconButton,
  Avatar,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/layout";
import { DeleteIcon } from "@chakra-ui/icons";
import { AiFillMessage } from "react-icons/ai";
import { RiMessage2Fill } from "react-icons/ri";
import PawsContext from "../Context/paws-context";
import axios from "axios";

const MatchList = ({ matches, /* finalMatchedUsers */ }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, selectedMatch, setSelectedMatch, deleteMatch } = useContext(PawsContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const matchedUsersIds = matches?.map(({ user_id }) => user_id);

  const getMatchedProfile = async () => {
    try {
      const response = await axios.get("/matchedusers", {
        params: { matchedUsersIds: JSON.stringify(matchedUsersIds) },
      });

      //console.log(response.data);
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = (id, name) => {
    console.log("delete clicked", id);
    setSelectedMatch(false);
    deleteMatch(id);

    toast({
      title: `Unmatched ${name}`,
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: "bottom-left",
    });
  };
  
  useEffect(() => {
    getMatchedProfile();
    //finalMatchedUsers(filteredMatchedProfiles);
    /* setFinalMatchedProfiles(filteredMatchedProfiles); */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  const filteredMatchedProfiles = matchedProfiles?.filter(
    (matchedProfile) =>
      matchedProfile.matches.filter(
        (profile) => profile.user_id == user.user_id
      ).length > 0
  ); 
  //console.log("final matched profiles", filteredMatchedProfiles);

  return (

    
    <List
      d="flex"
      flexDir="column"
      gap="1rem"
      //py={1}
      px={4}
      alignItems="center"
      justifyContent="start"
      maxH="30em" //25-30
      overflow="auto"
      //bg="purple.500"
      width="100%"
      borderRadius="7px"
    >
      {filteredMatchedProfiles?.map((matchedProfile) => (
        <ListItem
          //onClick={() => setSelectedMatch(matchedProfile)}
          key={matchedProfile.user_id} //matchedProfile.user_id
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderRadius="7px"
          border="1.5px solid black"
          bg={selectedMatch === matchedProfile ? "yellow.500" : "yellow.300"}
          width="100%"
          p={1.5}
          
          //cursor="pointer"
          //_hover={{ background: "yellow.400" }}
        >
          <Box
            d="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="0.5em"
          >
            <Avatar
              size="md"
              //h={20}w={20}
              name={matchedProfile.name}
              src={matchedProfile.url}
              border="1px solid black"
            />

            <Badge
              fontFamily="roboto slab"
              fontWeight="bold"
              variant="solid"
              bg="red.600"
              color="white"
              //fontSize="1.1em"
              fontSize="1em"
              px={1}
              borderRadius="7px"
              letterSpacing="1.5px"
              //_hover={{ background: "black", color:"red.600"  }}
            >
              {matchedProfile.name}
            </Badge>
          </Box>

          <Box>
            <IconButton
              variant="ghost"
              bg="gray.700"
              color="green.500"
              size="sm"
              fontSize="xl"
              _hover={{ background: "black", color: "green.600" }}
              aria-label="Delete Transaction"
              icon={<RiMessage2Fill />}
              mr={2}
              onClick={() => setSelectedMatch(matchedProfile)} //setSelectedMatch(match)
            />
            <IconButton
              variant="ghost"
              bg="gray.700"
              color="red.500"
              size="sm"
              fontSize="xl"
              _hover={{ background: "black", color: "red.600" }}
              aria-label="Delete Transaction"
              icon={<DeleteIcon />}
              onClick={deleteHandler.bind(
                null,
                matchedProfile.user_id,
                matchedProfile.name
              )}
            />
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default MatchList;
