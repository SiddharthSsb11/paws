import { SettingsIcon } from "@chakra-ui/icons";
import { Avatar, Badge, Box, IconButton, Text, useDisclosure, } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";

import React, { useContext, useState } from "react";
import { MdSettings } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import MatchList from "./MatchList";
import { useCookies } from "react-cookie";
import PawsContext from "../Context/paws-context";

const MatchContainer = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  //const [matchedProfilesList, setMatchedProfilesList] = useState(null);
  const navigate = useNavigate();

  //const authToken = cookies.authToken;
  const toast = useToast();

  //const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(PawsContext);

  const logoutHandler = () => {
    //removing cookies
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    removeCookie("Email", cookies.Email);

    localStorage.removeItem("pawsUserDetails");
    //window.location.reload();
    toast({
      title: "Log Out Successful",
      status: "success",
      duration: 5000, 
      isClosable: true,
      position: "bottom",
    });
    navigate("/");
  };

  return (
    <Box
      d="flex"
      flexDir="column"
      gap="1em"
      bg="purple.900"
      height="42rem"
      //width="23%"
      width={{ base: "85%", md: "60%", xl: "23%" }}
      //color="white"
      borderRadius="7px"
      border="1.5px solid black"
      boxShadow="5px 5px 5px black"
    >
      <Box
        d="flex"
        justifyContent="space-between"
        borderBottom="4px solid black" /* #9B2C2C */
        alignItems="center"
        width="100%"
        height="16%"
        bg="yellow.400"
        borderRadius="5px"
      >
        <Box
          d="flex"
          alignItems="center"
          //justifyContent="space-between"
          //flexDir={{ base: "column", md: "row" }}
          gap="0.7rem"
          px={2}
        >
          <Avatar
            //size="lg"
            h={20}
            w={20}
            //name="XYZABC"
            name={user.name}
            src={user.url}
            //src="https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            border="1px solid black"
          />

          <Box
            d="flex"
            flexDir="column"
            alignItems="start"
            justifyContent="space-around"
            gap="0.6rem"
            textAlign="left"
          >
            <Badge
              fontFamily="suez one"
              variant="solid"
              bg="black"
              color="red.600"
              fontSize="3xl"
              px={2.5}
              borderRadius="7px"
              letterSpacing="1.75px"
              _hover={{ background: "red.600", color: "white" }}
              //_hover={{ background: "black", color:"red.600"  }}
            >
              {user.name}
            </Badge>

            {/* <Text
              color="gray.800"
              fontFamily="suez one"
              fontSize="sm"
              fontWeight="bold"
              //fontWeight="bold"
              marginLeft="2px"
            >
              <u>Matches: {user.matches.length}</u>
            </Text> */}
          </Box>
        </Box>

        <Box d="flex" flexDir="column" gap="0.2rem" alignItems="center" px={2}>
          {/* <IconButton
            variant="ghost"
            //bg="gray.700"
            color="gray.800"
            size="sm"
            textAlign="center"
            fontSize="3xl"
            _hover={{ backgroundColor: "black", color: "red.600" }}
            aria-label="Settings"
            icon={<MdSettings />}
            onClick={() => console.log("settings profile modal")}
          /> */}

          <IconButton
            variant="ghost"
            //bg="gray.700"
            color="gray.800"
            size="md"
            textAlign="center"
            fontSize="4xl"
            fontWeight="bold"
            _hover={{ backgroundColor: "black", color: "red.600" }}
            aria-label="Logout"
            icon={<IoLogOut />}
            onClick={logoutHandler}
          />
        </Box>
      </Box>
      <Box d="flex" flexDir="column" alignItems="center" gap="1.2rem">
      {user.matches.length === 0 ? (
        <Box marginTop="1.55rem"
          bg="yellow.300"
          height="14rem"
          width="90%"
          borderRadius="7px"
          border="1.5px solid black"
          d="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Badge
            fontFamily="suez one"
            variant="solid"
            bg="red.600"
            color="white"
            fontSize="2xl"
            px={3}
            py={1}
            borderRadius="7px"
            letterSpacing="1.75px"
            //_hover={{ background: "red.600", color: "white" }}
            _hover={{ backgroundColor: "black", color: "red.600" }}
            textAlign="center"
          >
            Swipe/drag right
            <br />to have a match
          </Badge>
        </Box>
      ) : (
        <>
          <Badge
            variant="outline"
            colorScheme="yellow"
            fontSize="xl"
            fontFamily="bungee"
            px={1.5}
            letterSpacing="1.25px"
          >
            Matches
          </Badge>

          <Box
            width="100%"
            //bg="yellow.300"
          >
            {user?.matches && <MatchList matches={user.matches} />}
          </Box>
        </>
      )}
      </Box>
    </Box>
  );
};

export default MatchContainer;
