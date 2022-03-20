import React from "react";
import {
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
  Badge,
  Button,
  Square,
} from "@chakra-ui/react";
import { FaPaw } from "react-icons/fa";
import { BiBone } from "react-icons/bi";
import { Image } from "@chakra-ui/react";
import CoverImage from "./img.png";
import { useNavigate } from "react-router-dom";

//import classes from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      margin="2rem auto"
      d="flex"
      flexDir="column"
      gap="1rem"
      color="white"
      //width="60%"
    >
      <Box
        //className={classes.grad}
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="4em"
        px={5}
        py={3.5}
        borderRadius="7px"
        border="1.5px solid black"
        boxShadow="5px 5px 5px black"
        bg="purple.900"
      >
        <Box
          d="flex"
          alignItems="center"
          gap="1em"
          textAlign="left"
          bg="red.600"
          py={1.5}
          px={4}
          color="yellow.400"
          borderRadius="7px"
          _hover={{ transform: "scale(1.04)" }}
          cursor="pointer"
        >
          <Icon as={FaPaw} w={12} h={12} />
          <Heading fontFamily="Bevan">P A W S </Heading>
        </Box>
        <Box d="flex" alignItems="center" gap="0.5em" fontFamily="Suez One">
          <Button
            fontWeight="bold"
            colorScheme="yellow"
            width="100%"
            //style={{ marginTop: "15px" }}
            onClick={() => navigate("/gallery")}
            //isLoading={loading}
            //disabled={user}
            fontSize="lg"
          >
            Sneak-Peek
          </Button>

          <Button
            fontWeight="bold"
            colorScheme="yellow"
            width="100%"
            //style={{ marginTop: "15px" }}
            onClick={() => console.log("clicked--3")}
            //isLoading={loading}
            //disabled={user}
            fontSize="lg"
          >
            Guest Login
          </Button>
        </Box>
      </Box>

      <Box
        bg="purple.900"
        //px={5}
        p={5}
        borderRadius="7px"
        border="1.5px solid black"
        boxShadow="5px 5px 5px black"
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="4em"
      >
        <Box
          d="flex"
          flexDir="column"
          alignItems="start"
          //justifyContent="space-between"
          gap="1.6em"
        >
          <Text fontSize="3xl" fontFamily="Suez One">
            Your pet 😻 can't swipe <br /> but it has you 🐶.
          </Text>
          <Text fontSize="md" fontFamily="Suez One" color="gray.300">
            A Pawwfect match 💘 is a Purrfect profile away.
          </Text>

          <Box d="flex" alignItems="center" gap="1em">
            <Box
              as={Button}
              bg="white"
              onClick={() => console.log("get started")}
              p={2.5}
              size="lg"
              _hover={{ backgroundColor: "yellow.400" }}
            >
              <Square
                color="black"
                bg="red.500"
                fontSize="2xl"
                p={1}
                borderRadius="7px"
                mr={3}
              >
                <Icon as={FaPaw} />
              </Square>
              <Text color="black" fontSize="xl" fontFamily="Suez One">
                Get Started
              </Text>
            </Box>

            <Box
              as={Button}
              bg="white"
              onClick={() => console.log("login")}
              p={2.5}
              size="lg"
              _hover={{ backgroundColor: "yellow.400" }}
            >
              <Square
                color="black"
                bg="red.500"
                fontSize="2xl"
                p={1}
                borderRadius="7px"
                mr={3}
              >
                <Icon as={BiBone} />
              </Square>
              <Text color="black" fontSize="xl" fontFamily="Suez One">
                Login
              </Text>
            </Box>
          </Box>
        </Box>

        <Image
          src={CoverImage}
          alt="Cats & Dogs"
          objectFit="cover"
          height="210px"
          width="380px"
        />
      </Box>
    </Box>
  );
};

export default HomePage;
