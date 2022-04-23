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
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { MdSwipe } from "react-icons/md";
import { BiBone } from "react-icons/bi";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router-dom";
import { GiDogBowl, GiDogHouse } from "react-icons/gi";
import axios from "axios";
import {useCookies} from "react-cookie"

const AuthModal = ({ children, overlay }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const initialRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);

    if (!email || !password) {
      toast({
        title: "Something went wrong.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      /* const config = {
        headers: { "Content-type": "application/json" },
      }; */

      const response = await axios.post( "/login", { email, password }, /*config*/);

      console.log("data from server on login", response.data);

      setCookie('Email', response.data.email);
      setCookie('UserId', response.data.userId);
      setCookie('AuthToken', response.data.token);

      //setCookie('UserDetails', response.data.userDetails);  
      // console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000, 
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("pawsUserDetails", JSON.stringify( response.data.userDetails));

      setLoading(false);
      const success = response.status === 201;
      if(success) navigate("/dashboard");
      window.location.reload();

    } catch (error) {

      toast({
        title: "Error Occured!",
        //description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }

  };

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
          <ModalHeader fontSize="4xl" borderBottom="2px solid white">
            Login & Start
            <span>
              <Icon ml={4} color="yellow.400" as={MdSwipe} />
            </span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5} mt={3.5}>
            <VStack spacing="1.5rem">
              <FormControl id="email" isRequired>
                <FormLabel fontSize="xl" color="yellow.300" htmlFor="email">Email</FormLabel>
                <Input
                  id="email" 
                  ref={initialRef}
                  name="email"
                  type="email"
                  focusBorderColor="yellow.400"
                  placeholder="Enter Your Email Address"
                  errorBorderColor="red.400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel htmlFor="password" fontSize="xl" color="yellow.300">Password</FormLabel>
                <InputGroup size="md">
                  <Input id="password"
                    type={show ? "text" : "password"}
                    name="password"
                    focusBorderColor="yellow.400"
                    placeholder="Enter password"
                    errorBorderColor="red.400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* <FormControl id="checkbox" isRequired>
                <Checkbox
                  colorScheme="yellow"
                  textAlign="left"
                  onChange={() => console.log("checked")}
                  size="md"
                >
                  <Text fontSize="xs" fontFamily="Suez One" color="gray.300">
                    To proceed further, check the box to agree our terms and policies.
                  </Text>
                </Checkbox>
              </FormControl> */}

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
                  onClick={submitHandler}
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
                  onClick={() => {
                    setEmail("duke@test.com");
                    setPassword("testtest");
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
                onClick={() => navigate("/onboarding")}
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
