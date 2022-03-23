import React, { useRef, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Icon,
  Badge,
  Button,
  Square,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { VStack } from "@chakra-ui/layout";
//import { Button } from "@chakra-ui/button";
//import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { FaPaw } from "react-icons/fa";
import { MdSwipe } from "react-icons/md";
import { BiBone } from "react-icons/bi";
import { Image } from "@chakra-ui/react";
import CoverImage from "./img.png";
import { useNavigate } from "react-router-dom";
import {GiDogBowl, GiDogHouse} from "react-icons/gi";
import "./HomePage.css";

//import classes from "./HomePage.module.css";

const HomePage = () => {
  const [overlay, setOverlay] = useState("");
  const [show, setShow] = useState(false);

  const initialRef = useRef();
  //const finalRef = useRef();
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
  );

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => setShow(!show);

  return (
    <div className="home">
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

            {/* <Button
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
            </Button> */}
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

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        //isCentered
        size="md"
        //border="1.5px solid black"
        //bg="purple.900"
        initialFocusRef={initialRef}
      >
        {overlay}
        <ModalContent
          border="1.5px solid black"
          bg="purple.900"
          color="white"
          fontFamily="Suez One"
          p={1}
        >
          <ModalHeader fontSize="4xl">
            Login & Start
            <span>
              <Icon ml={4} color="yellow.400" as={MdSwipe} />
            </span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing="1.2rem">
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  //ref={initialRef}
                  //variant="filled"
                  type="email"
                  focusBorderColor="yellow.400"
                  placeholder="Enter Your Email Address"
                  errorBorderColor="red.300"
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    type={show ? "text" : "password"}
                    //variant="filled"
                    focusBorderColor="yellow.400"
                    placeholder="Enter password"
                    errorBorderColor="red.300"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      colorScheme="yellow"
                      h="1.75rem"
                      size="sm"
                      onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Box d="flex" alignItems="center" justifyContent="space-between" w="100%">
                <Box w="45%"
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
                    <Icon as={GiDogBowl} />
                  </Square>
                  <Text color="black" fontSize="xl" fontFamily="Suez One">
                    Login
                  </Text>
                </Box>

                <Box w="45%"
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
                  Guest
                  </Text>
                </Box>
              </Box>

              <Box
                as={Button}
                bg="white"
                onClick={() => console.log("signup")}
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
                  <Icon as={GiDogHouse} />
                </Square>
                <Text color="black" fontSize="xl" fontFamily="Suez One" >
                  New to the Club&nbsp; ? &nbsp;Register &nbsp;&#10132;
	
                </Text>
              </Box>

            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default HomePage;
