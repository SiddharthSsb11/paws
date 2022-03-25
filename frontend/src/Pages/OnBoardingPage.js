import {
  Badge,
  Box,
  Heading,
  Icon,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPaw } from "react-icons/fa";
import "./OnBoardingPage.css";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { VStack, HStack } from "@chakra-ui/layout";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";

const OnBoardingPage = () => {
  const [show, setShow] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [speciesValue, setSpeciesValue] = useState('');

  console.log(speciesValue);

  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = () => setShow(!show);

  let handleTextareaChange = (e) => {
    let inputValue = e.target.value;
    setTextAreaValue(inputValue);
  };

  const submitHandler = async () => {
    setLoading(true);

    console.log("signup button clicked");

    if (!name || !email || !password /* || !confirmpassword */) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    console.log(name, email, "on Signup name email");
  };

  return (
    <div className="back">
      <Box
        d="flex"
        flexDir="column"
        width="75%"
        //bg="white"
        gap="1em"
        margin="0.8rem auto"
        px={1}
      >
        <Box
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          //gap="4em"
          px={5}
          py={2.5}
          borderRadius="7px"
          border="1.5px solid black"
          boxShadow="5px 5px 5px black"
          bg="purple.900"
        >
          <Box
            d="flex"
            alignItems="center"
            gap="0.8em"
            textAlign="left"
            bg="red.600"
            py={1}
            px={2.5}
            color="yellow.400"
            borderRadius="7px"
            _hover={{ transform: "scale(1.02)" }}
            cursor="pointer"
            onClick={() => navigate("/")}
          >
            <Icon as={FaPaw} w={8} h={8} />
            <Heading fontFamily="Bevan" fontSize="3xl">
              P A W S{" "}
            </Heading>
          </Box>

          <Badge
            fontFamily="bungee"
            variant="solid"
            colorScheme="gray"
            fontSize="2xl"
            px={2.5}
            borderRadius="7px"
            _hover={{ background: "gray.600" }}
          >
            Create &nbsp; Account
          </Badge>
          {/* <Text fontSize="3xl" fontFamily="Suez One"> Create Account </Text> */}

          <Button
            leftIcon={<ArrowBackIcon />}
            //fontWeight="bold"
            colorScheme="yellow"
            //width="100%"
            onClick={() => navigate("/")}
            fontFamily="Suez One"
            fontSize="xl"
          >
            Go Back
          </Button>
        </Box>

        <Box
          d="flex"
          fontFamily="Suez One"
          justifyContent="space-around"
          alignItems="center"
          px={2}
          py={3}
          borderRadius="7px"
          border="1.5px solid black"
          boxShadow="5px 5px 5px black"
          bg="purple.900"
          color="white"
        >
          <VStack spacing="1.4em" width="40%">
            <FormControl id="firstName" isRequired>
              <FormLabel fontSize="xl" htmlFor="firstName">
                Name
              </FormLabel>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
                name="firstName"
                focusBorderColor="yellow.400"
                errorBorderColor="red.300"
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel fontSize="xl">Email Address</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Your Email Address"
                onChange={(e) => setEmail(e.target.value)}
                //variant="filled"
                focusBorderColor="yellow.400"
                errorBorderColor="red.300"
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel fontSize="xl">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  id="paswword"
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  // variant="filled"
                  focusBorderColor="yellow.400"
                  errorBorderColor="red.300"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    fontWeight="bold"
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

            {/* <FormControl id="password" isRequired>
              <FormLabel fontSize="lg">Confirm Password</FormLabel>
              <InputGroup size="md">
                <Input
                  id="paswword"
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  //variant="filled"
                  focusBorderColor="yellow.400"
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
            </FormControl> */}

            <FormControl id="dob" isRequired>
              <FormLabel fontSize="xl">🎂 Birthday</FormLabel>
              <HStack spacing={4}>
                <Input
                  htmlSize="xs"
                  width="auto"
                  placeholder="DD"
                  id="dob_day"
                  name="dob_day"
                  type="number"
                  onChange={console.log("day")}
                  focusBorderColor="yellow.400"
                  errorBorderColor="red.300"
                />
                <Input
                  htmlSize="xs"
                  width="auto"
                  placeholder="MM"
                  id="dob_month"
                  name="dob_month"
                  type="number"
                  onChange={console.log("month")}
                  focusBorderColor="yellow.400"
                  errorBorderColor="red.300"
                />
                <Input
                  htmlSize="xs"
                  width="auto"
                  id="dob_year"
                  placeholder="YYYY"
                  name="dob_year"
                  type="number"
                  onChange={() =>console.log("year")}
                  focusBorderColor="yellow.400"
                  errorBorderColor="red.300"
                />
              </HStack>
            </FormControl>

            <FormControl as="fieldset" isRequired>
              <FormLabel fontSize="xl">I am a :</FormLabel>
              <RadioGroup onChange={setSpeciesValue} value={speciesValue}>
                <HStack spacing="1.2rem">
                  <Radio value="Cat" colorScheme="yellow" size="lg" id="cat" name="cat">
                    Cat 😻
                  </Radio>
                  <Radio value="Dog" colorScheme="yellow" size="lg" id="dog" name="dog">
                    Dog 🐶
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </VStack>

          <VStack spacing="1em" width="40%">
            <FormControl id="text" isRequired>
              <FormLabel fontSize="xl">About Me</FormLabel>
              <Textarea
                value={textAreaValue}
                onChange={handleTextareaChange}
                placeholder="I like to stare at my reflection..."
                size="sm"
                focusBorderColor="yellow.400"
              />
            </FormControl>
          </VStack>
        </Box>
      </Box>
    </div>
  );
};

export default OnBoardingPage;
