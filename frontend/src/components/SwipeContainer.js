import React, { useState } from "react";
import { Badge, Box, Text } from "@chakra-ui/react";
import TinderCard from "react-tinder-card";
import { Icon } from "@chakra-ui/react";

import "./SwipeContainer.css";
import { MdSwipe } from "react-icons/md";
import { FaInfoCircle, FaPaw } from "react-icons/fa";

import { IoFemaleSharp, IoMaleSharp } from "react-icons/io5";
import { GiBrokenHeartZone, GiPiercedHeart } from "react-icons/gi";

import "./ChatContainer.css"

const characters = [
  {
    gender: "Female",
    age: 4,
    name: "Ruby",
    url: "https://www.rd.com/wp-content/uploads/2019/09/amazing-portrait-of-young-crossbreed-dog-german-shepherd-during-sunset-in-grass-e1576859426599-scaled.jpg?resize=700,466",
  },
  {
    gender: "Male",
    age: 12,
    name: "Erlich",
    url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/medium-sized-dogs-1613083812.jpg?crop=0.668xw:1.00xh;0.0369xw,0&resize=640:*",
  },
  {
    gender: "Male",
    age: 11,
    name: "Monica",
    url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/medium-sized-dogs-1613083812.jpg?crop=0.668xw:1.00xh;0.0369xw,0&resize=640:*",
  },
  {
    gender: "Female",
    age: 10,
    name: "Jared",
    url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/medium-sized-dogs-1613083812.jpg?crop=0.668xw:1.00xh;0.0369xw,0&resize=640:*",
  },
  {
    gender: "Female",
    age: 5,
    name: "Shelly",
    url: "https://www.rd.com/wp-content/uploads/2019/09/amazing-portrait-of-young-crossbreed-dog-german-shepherd-during-sunset-in-grass-e1576859426599-scaled.jpg?resize=700,466",
  },
];

const SwipeContainer = () => {
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  console.log(lastDirection);

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <Box
      d="flex"
      flexDir="column"
      gap="0.7rem"
      bg="purple.900"
      height="42rem"
      width="42.5%"
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
          fontSize="4xl"
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
        justifyContent="space-between"
        gap="1rem"
        //bg="green.200"
        px={4}
      > 
        <Icon className="animate" color="red.500" fontSize="2.7rem" as={GiBrokenHeartZone} _hover={{color:"red.600"}}/>
        <Box className="cardContainer">
          {characters.map((character) => (
            <TinderCard
              color="white"
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <Box
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
                d="flex"
                justifyContent="center"
              >
                <Box
                  //bg="red.600"  color="white"
                  bg="black" color="red.500"
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
                  <Text fontWeight="bold" fontSize="xl" >
                    {" "}
                    {character.name}, &nbsp;{character.age}, &nbsp;
                    {character.gender==="Male" ? (
                      <Icon mb={-0.5} fontWeight="bold" fontSize="lg" as = {IoMaleSharp}/>
                    ): (
                      <Icon mb={-0.5} fontWeight="bold" fontSize="lg" as = {IoFemaleSharp}/>
                    )} &nbsp; {/* <span> { lastDirection ? (
                      <Text>(You swiped {lastDirection})</Text>
                    ):(
                      <Text> (Swipe/ Drag left or right)</Text>
                    ) }</span> */}
                  </Text>
                  <Box  d="flex" alignItems="center" gap="5px">
                    <Icon fontSize="1.2rem"  as={FaInfoCircle} />
                    <Text > I like to go on long walks.</Text>
                  </Box>
                </Box>
              </Box>
            </TinderCard>
          ))}
        </Box>
        <Icon className="animate" color="red.500" fontSize="3rem" as={GiPiercedHeart} _hover={{color:"red.600"}}/>
      </Box>

    </Box>
  );
};

export default SwipeContainer;
