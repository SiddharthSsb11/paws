import React, { useRef, useState } from "react";
import {
  Box,
  Text,
  Icon,
  Button,
  Square,
  Modal,
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
import { MdSwipe } from "react-icons/md";
import { BiBone } from "react-icons/bi";
//import CoverImage from "./img.png";
//import { useNavigate } from "react-router-dom";
import { GiDogBowl, GiDogHouse } from "react-icons/gi";

const AuthModal = ({ children, overlay }) => {
  const [show, setShow] = useState(false);

  const initialRef = useRef();
  //const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => setShow(!show);

  return (
    <React.Fragment>
    
      {children && <span onClick={onOpen}>{children}</span>}

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        //isCentered
        size="lg"
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
          p={2.5}
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
                  ref={initialRef}
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

              <Box
                d="flex"
                alignItems="center"
                justifyContent="space-between"
                w="100%"
              >
                <Box
                  w="45%"
                  as={Button}
                  bg="white"
                  onClick={() => console.log("login")}
                  p={2.5}
                  size="lg"
                  //mt={2}
                  _hover={{ backgroundColor: "yellow.400" }}
                >
                  <Square
                    color="black"
                    bg="red.500"
                    fontSize="2xl"
                    p={1}
                    borderRadius="7px"
                    mr={3.5}
                  >
                    <Icon as={GiDogBowl} />
                  </Square>
                  <Text color="black" fontSize="xl" fontFamily="Suez One">
                    Login
                  </Text>
                </Box>

                <Box
                  w="45%"
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
                    mr={3.5}
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
                w="100%"
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
                <Text color="black" fontSize="xl" fontFamily="Suez One">
                  New to the Club&nbsp; ? &nbsp;Register &nbsp;&#10132;
                </Text>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default AuthModal;
