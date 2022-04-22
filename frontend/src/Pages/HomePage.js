import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Icon,
  Button,
  Square,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPaw } from "react-icons/fa";
import { Image } from "@chakra-ui/react";
import CoverImage from "./img.png";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import AuthModal from "../components/AuthModal";
import { useCookies } from "react-cookie";

//import classes from "./HomePage.module.css";

const HomePage = () => {
  const [overlay, setOverlay] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  //const authToken = cookies.AuthToken;
  const navigate = useNavigate();


  useEffect(() => {
    const pawsUserDetails = JSON.parse(localStorage.getItem("pawsUserDetails"));

    if (pawsUserDetails /* || authToken */) navigate("/dashboard");
  }, [navigate]);

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  //const handleClick = () => setShow(!show);

  return (
    <div className="home">
      <Box
        margin="2rem auto"
        d="flex"
        flexDir="column"
        gap="1rem"
        color="white"
        //width="60%"
        px={{base:2, md:3}}
      >
        <Box
          //className={classes.grad}
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          gap="2.5em"
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
            gap={{base:"0.6em", md:"1em"}}
            textAlign="left"
            bg="red.600"
            py={1.5}
            px={{base:"2", md:"4"}}
            color="yellow.400"
            borderRadius="7px"
            _hover={{ transform: "scale(1.04)" }}
            cursor="pointer"
          >
            <Icon as={FaPaw} w={{base:"6", md:"12"}} h={{base:"6", md:"12"}} />
            <Heading fontFamily="Bevan" fontSize={{base:"xl", md:"4xl"}}>P A W S </Heading>
          </Box>
          <Box d="flex" alignItems="center" /* gap="0.5em" */ fontFamily="Suez One">
            <Button
              fontWeight="bold"
              colorScheme="yellow"
              width="100%"
              //style={{ marginTop: "15px" }}
              onClick={() => navigate("/gallery")}
              //isLoading={loading}
              //disabled={user}
              fontSize={{base:"sm", md:"lg"}}
            >
              Sneak-Peek
            </Button>
          </Box>
        </Box>

        <Box
          bg="purple.900"
          //px={5}
          p={5}
          //py={6}
          borderRadius="7px"
          border="1.5px solid black"
          boxShadow="5px 5px 5px black"
          d="flex"
          flexDirection={{base:"column", md:"row"}}
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
            <Text fontSize={{base:"2xl", md:"3xl"}} fontFamily="Suez One">
              Your pet 😻 can't swipe <br /> but it has you 🐶.
            </Text>
            <Text fontSize={{base:"sm", md:"md"}} fontFamily="Suez One" color="gray.300">
              A Pawwfect match 💘 is a Purrfect profile away.
            </Text>

            <AuthModal overlay={overlay}>
              <Box
                as={Button}
                bg="white"
                onClick={() => {
                  setOverlay(<OverlayOne />);
                  onOpen();
                }}
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
            </AuthModal>
          </Box>

          <Image
            src={CoverImage}
            alt="Cats & Dogs"
            objectFit="cover"
            height={{base:'160px', md:'210px'}}
            width={{base:'285px', md:'380px'}}
          />
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
