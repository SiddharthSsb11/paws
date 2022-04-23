import React, { useState, useContext } from "react";
import { Badge, Box, Text,  useDisclosure } from "@chakra-ui/react";
import TinderCard from "react-tinder-card";
import { Icon } from "@chakra-ui/react";
import "./SwipeContainer.css";
import { MdSwipe } from "react-icons/md";
import { FaInfoCircle, FaPaw } from "react-icons/fa";
import { IoFemaleSharp, IoMaleSharp } from "react-icons/io5";
import { GiBrokenHeartZone, GiPiercedHeart } from "react-icons/gi";
import "./ChatContainer.css";
import PawsContext from "../Context/paws-context";
import { useToast } from "@chakra-ui/toast";

const SwipeContainer = ({prefUsers}) => {

  const [lastDirection, setLastDirection] = useState();

  const {user, updateMatches} = useContext(PawsContext);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const swiped = (direction, swipedUser, swipedUserId, name) => {
    //console.log("removing: " + nameToDelete);
    if(direction === 'right'){
      updateMatches(swipedUserId);
      toast({
        title: `Right Swiped 💝 ${name}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      if(swipedUser.matches.includes(user.user_id)){
        toast({
          title: `Yayy !! Matched 💞 with ${name}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
        })
      }
    }else{
      toast({
        title: `Left Swiped 🖤 ${name}`,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
      
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
   // console.log("prefUsers swipercontainer",prefUsers)
  };

  return (
    <Box
      d="flex"
      flexDir="column"
      gap="0.7rem"
      bg="purple.900"
      height="42rem"
      //width="40.5%"
      width={{ base: "95%", sm:"95%", md: "60%", xl: "40.5%" }}
      //color="white"
      borderRadius="7px"
      border="1.5px solid black"
      boxShadow="5px 5px 5px black"
    >
      <Box
        d="flex"
        justifyContent="center"
        borderBottom="4px solid black" /* #9B2C2C */
        alignItems="center"
        width="100%"
        height="16%"
        bg="yellow.400"
        borderRadius="5px"
      >
        <Badge
          fontFamily="bevan"
          variant="solid"
          //bg="gray.800"
          bg="black"
          color="red.600"
          fontSize={{ base: "xl", sm:"2xl", md: "3xl", xl: "4xl" }}
          px={4}
          py={1.5}
          borderRadius="7px"
          letterSpacing="3.5px"
          _hover={{ background: "red.600", color: "white" }}
          //_hover={{ background: "black", color:"red.600"  }}
        >
          <span>
            {" "}
            <Icon mt={2} as={FaPaw}></Icon>{" "}
          </span>{" "}
          &nbsp;Playground
          <span>
            {" "}
            <Icon as={MdSwipe} />{" "}
          </span>
        </Badge>
      </Box>

      <Box
        d="flex"
        //flexDir="column"
        alignItems="center"
        //justifyContent="space-between"
        justifyContent="center"
        gap="1rem"
        //bg="green.200"
        px={4}
      >
        {/* <Icon
          className="animate"
          color="red.500"
          fontSize="2.7rem"
          as={GiBrokenHeartZone}
          _hover={{ color: "red.600" }}
        /> */}
        {/* user.matches.length === prefUsers.length ? "all caught up" : 'show cards' */}
        <Box className="cardContainer">
          {prefUsers.map((prefUser) => (
            <TinderCard
              color="white"
              className="swipe"
              key={prefUser.name}
              onSwipe={(dir) => swiped(dir, prefUser, prefUser.user_id, prefUser.name)}
              onCardLeftScreen={() => outOfFrame(prefUser.name)}
            >
              <Box
                style={{ backgroundImage: "url(" + prefUser.url + ")" }}
                className="card" 
                d="flex" 
                ml={{base:3.75, sm:2}}
                justifyContent="center"
                width = {{base:"21rem", sm:"26rem", md:"27rem"}}
              >
                <Box
                  //bg="red.600"  color="white"
                  bg="black"
                  color="red.500"
                  position="absolute"
                  bottom="-2rem"
                  borderRadius="1rem"
                  width="85%"
                  px={3}
                  py={1.5}
                  fontFamily="roboto slab"
                  fontWeight="bold"
                  border="1px solid black"
                  d="flex"
                  flexDirection="column"
                  alignItems="start"
                  justifyContent="center"
                  gap="2px"
                  //_hover={{ backgroundColor: "gray.800", color: "red.600" }}
                  _hover={{ background: "red.600", color: "white" }}
                >
                  <Text fontWeight="bold" fontSize="xl">
                    {" "}
                    {prefUser.name}, &nbsp;{2022 - prefUser.year}, &nbsp;
                    {prefUser.genderShow ? (
                      <span>
                        {prefUser.gender === "male" ? (
                          <Icon
                            mb={-0.5}
                            fontWeight="bold"
                            fontSize="lg"
                            as={IoMaleSharp}
                          />
                        ) : (
                          <Icon
                            mb={-0.5}
                            fontWeight="bold"
                            fontSize="lg"
                            as={IoFemaleSharp}
                          />
                        )}
                      </span>
                    ) : (
                      <span style={{fontSize:"1.1rem",}}><u>Gender Hidden</u></span>
                    )}
                  </Text>
                  <Box d="flex" alignItems="center" gap="5px">
                    <Icon fontSize="1.2rem" as={FaInfoCircle} />
                    <Text> {prefUser.about}</Text>
                  </Box>
                </Box>
              </Box>
            </TinderCard>
          ))}
        </Box>
        {/* <Icon
          className="animate"
          color="red.500"
          fontSize="3rem"
          as={GiPiercedHeart}
          _hover={{ color: "red.600" }}
        /> */}
      </Box>
    </Box>
  );
};

export default SwipeContainer;
