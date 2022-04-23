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
  Checkbox,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaPaw } from "react-icons/fa";
import "./OnBoardingPage.css";
//import { ArrowForwardIcon } from "@chakra-ui/icons";
import { MdSwipe } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { VStack, HStack } from "@chakra-ui/layout";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import {useCookies} from "react-cookie"

const OnBoardingPage = () => {
  const [show, setShow] = useState(false);
  const [genderShow, setGenderShow] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [species, setSpecies] = useState("cat");
  const [speciesInterest, setSpeciesInterest] = useState("cat");
  const [gender, setGender] = useState("female");
  const [matches, setMatches] = useState([]);

  const [setCookies] = useCookies(['user']);

  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = () => setShow(!show);
  const handleGenderShow = () => setGenderShow(!genderShow);

  //console.log({name, email, password, about, day, month, year, imageUrl, gender, species, speciesInterest, matches});

  const submitHandler = async () => {
    setLoading(true);

    console.log("signup button clicked");

    if (!name || !email || !password || !confirmpassword || !about || !day || !month || !year || !imageUrl) {
      toast({
        title: "Please Fill all the required feilds",
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
      setLoading(false);
      return;
    }

    if(day>31 || day<0 || month>12 || month<0 || year>2022 || year<2005){
      toast({
        title: "Incorrrect Date format",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    //console.log(name, email, "on Signup name email"); 

    try {
       const config = {
        headers: { "Content-type": "application/json" },
      }; 

      const response = await axios.post(
        "/signup",
        {
          name, email, password,
          about,
          day, month, year, 
          genderShow, gender,
          species, speciesInterest,
          imageUrl, matches
        },
         config 
      );
      console.log(response.data);

      localStorage.setItem("pawsUserDetails", JSON.stringify( response.data.userDetails));

      //setCookie('Email', response.data.email);
      //setCookie('UserId', response.data.userId);
      //setCookie('AuthToken', response.data.token);
      //setCookie('UserDetails', response.data.userDetails);

      
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
      const success = response.status === 201;
      if(success) navigate("/dashboard");

      window.location.reload();
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Oops! Something went wrong. Reload and try again.",
        //description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const pawsUserDetails = JSON.parse(localStorage.getItem("pawsUserDetails"));

    if (pawsUserDetails /* || authToken */) navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="back">
      <Box
        d="flex"
        flexDir="column"
        width="97.5%"
        //bg="white"
        gap="1em"
        margin="1.4em auto"
        px={1}
      >
        <Box
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          //gap="4em"
          px={{base:2, md:6}}
          py={2.5}
          borderRadius="7px"
          border="1.5px solid black"
          boxShadow="5px 5px 5px black"
          bg="purple.900"
        >
          <Box
            d="flex"
            alignItems="center"
            gap={{base:"0.25em", md:"1em"}}
            textAlign="left"
            bg="red.600"
            py={1.5}
            px={{base:1, md:2.5, lg:4}}
            color="yellow.400"
            borderRadius="7px"
            _hover={{ transform: "scale(1.02)" }}
            cursor="pointer"
            onClick={() => navigate("/")}
          >
            <Icon as={FaPaw} w={{base:"6", md:"8", lg:"12"}} h={{base:"6", md:"8", lg:"12"}}
              
            />
            <Heading fontFamily="Bevan" d={{ base: "none", sm: "flex" }} fontSize={{base:"lg",sm:"xl", md:"2xl", lg:"4xl"}}>
              P A W S{" "}
            </Heading>
          </Box>

          <Badge
            fontFamily="bungee"
            variant="solid"
            colorScheme="gray"
            //d={{ base: "none", md: "flex" }}
            fontSize={{base:"sm",sm:"lg", md:"xl", lg:"3xl"}}
            px={{base:1.5, md:2.5}}
            borderRadius="7px"
            _hover={{ background: "gray.600" }}
          >
            Create &nbsp; Account
          </Badge>
          {/* <Text fontSize="3xl" fontFamily="Suez One"> Create Account </Text> */}

          <Button
            rightIcon={<MdSwipe />}
            //fontWeight="bold"
            colorScheme="yellow"
            //width="100%"
            onClick={submitHandler}
            fontFamily="Suez One"
            fontSize={{base:"sm", sm:"lg", md:"xl", lg:"3xl"}}
            isLoading={loading}
            //disabled={false}
          >
            Submit & Start
          </Button>
        </Box>

        <Box
          d="flex"
          flexDirection={{ base: "column", md: "row" }}
          fontFamily="Suez One"
          justifyContent="space-between"
          alignItems="center"
          px={{base:2.5, md:6}}
          py={4}
          borderRadius="7px"
          border="1.5px solid black"
          boxShadow="5px 5px 5px black"
          bg="purple.900"
          color="white"
        >
          <VStack spacing="1.7em" width={{ base: "75%", md: "25%" }} alignSelf={{ base: "center", md: "start" }}>
            <FormControl id="firstName" isRequired>
              <FormLabel fontSize={{ base: "2xl", md: "xl", lg:"2xl" }} htmlFor="firstName" color="yellow.300">
                Name
              </FormLabel>
              <Input
                fontFamily="roboto slab"
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
              <FormLabel fontSize={{ base: "2xl", md: "xl", lg:"2xl" }} color="yellow.300">
                Email Address
              </FormLabel>
              <Input
                fontFamily="roboto slab"
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
              <FormLabel fontSize={{ base: "2xl", md: "xl", lg:"2xl" }} color="yellow.300">
                Password
              </FormLabel>
              <InputGroup size="md">
                <Input
                  fontFamily="roboto slab"
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

            <FormControl id="password" isRequired>
              <FormLabel fontSize={{ base: "2xl", md: "xl", lg:"2xl" }} color="yellow.300">
                Confirm Password
              </FormLabel>
              <InputGroup size="md">
                <Input
                  fontFamily="roboto slab"
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
            </FormControl>

            <FormControl id="dob" isRequired fontFamily="roboto slab">
              <FormLabel
                fontSize={{ base: "2xl", md: "xl", lg:"2xl" }}
                color="yellow.300"
                fontFamily="Suez One"
              >
                🎂 Birthday
              </FormLabel>
              <HStack spacing={4}>
                <Input
                  htmlSize="xs"
                  width="auto"
                  placeholder="DD"
                  id="dob_day"
                  name="dob_day"
                  type="number"
                  onChange={(e) => setDay(e.target.value)}
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
                  onChange={(e) => setMonth(e.target.value)}
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
                  onChange={(e) => setYear(e.target.value)}
                  focusBorderColor="yellow.400"
                  errorBorderColor="red.300"
                />
              </HStack>
            </FormControl>
          </VStack>

          <VStack spacing="1.8em" width={{ base: "75%", md: "30%" }} mt={{base:6, md:0}} alignSelf={{ base: "center", md: "start" }}>
            <FormControl as="fieldset" isRequired>
              <FormLabel fontSize={{ base: "2xl", md: "xl", lg:"2xl" }} color="yellow.300">
                I am a{" "}
              </FormLabel>
              <RadioGroup
                onChange={setSpecies}
                value={species}
                defaultValue="cat"
              >
                <HStack spacing="1.2rem">
                  <Radio
                    value="cat"
                    colorScheme="yellow"
                    size="lg"
                    id="cat"
                    name="cat"
                  >
                    Cat 😻
                  </Radio>
                  <Radio
                    value="dog"
                    colorScheme="yellow"
                    size="lg"
                    id="dog"
                    name="dog"
                  >
                    Dog 🐶
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl as="fieldset" isRequired>
              <FormLabel fontSize={{ base: "2xl", md: "xl", lg:"2xl" }} color="yellow.300">
                Gender
              </FormLabel>
              <RadioGroup
                onChange={setGender}
                value={gender}
                defaultValue="female"
              >
                <HStack spacing="1.2rem">
                  <Radio
                    value="female"
                    colorScheme="yellow"
                    size="lg"
                    id="female"
                    name="female"
                  >
                    Female &nbsp;♀️
                  </Radio>
                  <Radio
                    value="male"
                    colorScheme="yellow"
                    size="lg"
                    id="male"
                    name="male"
                  >
                    Male &nbsp;♂️
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl as="fieldset" isRequired>
              <FormLabel fontSize={{ base: "2xl", md: "xl", lg:"2xl" }} color="yellow.300">
                Show Me{" "}
              </FormLabel>
              <RadioGroup
                defaultValue="cat"
                onChange={setSpeciesInterest}
                value={speciesInterest}
              >
                <HStack spacing="1.2rem">
                  <Radio
                    value="cat"
                    colorScheme="yellow"
                    size="lg"
                    id="cat"
                    name="cat"
                  >
                    Cats
                  </Radio>
                  <Radio
                    value="dog"
                    colorScheme="yellow"
                    size="lg"
                    id="dog"
                    name="dog"
                  >
                    Dogs
                  </Radio>
                  <Radio
                    value="everyone"
                    colorScheme="yellow"
                    size="lg"
                    id="everyone"
                    name="everyone"
                  >
                    Everyone
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <Checkbox
              alignSelf="start"
              size="md"
              colorScheme="yellow"
              onChange={handleGenderShow}
              defaultChecked
            >
              Show Gender on my profile.
            </Checkbox>

            <FormControl id="about" isRequired>
              <FormLabel fontSize={{ base: "2xl", md: "xl", lg:"2xl" }} htmlFor="about" color="yellow.300">
                About Me
              </FormLabel>
              <Textarea
                fontFamily="Roboto Slab"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="I like to stare at my reflection..."
                size="md"
                id="about"
                name="about"
                focusBorderColor="yellow.400"
                errorBorderColor="red.300"
              />
            </FormControl>
          </VStack>

          <VStack spacing="0.4em" width={{ base: "75%", md: "35%" }} mt={{base:6, md:0}} alignSelf={{ base: "center", md: "start" }}>
            <FormControl id="url" isRequired>
              <FormLabel fontSize="xl" htmlFor="url" color="yellow.300">
                Profile Picture
              </FormLabel>
              <Input
                fontFamily="Roboto Slab"
                id="url"
                type="url"
                placeholder="Enter URL for profile picture..."
                onChange={(e) => setImageUrl(e.target.value)}
                name="url"
                focusBorderColor="yellow.400"
                errorBorderColor="red.300"
                size="sm"
              />
            </FormControl>

            {imageUrl ? (
              <Image
                boxSize="460px"
                src={imageUrl}
                //src="https://bit.ly/dan-abramov"
                alt="profile-picture-preview"
                width="100%"
                //height="100%"
                //objectFit="contain"
                borderRadius="7px"
                objectFit="cover"
                //border="1px solid black"
              />
            ) : (
              <Text fontSize="xs" color="gray.200" fontFamily="Roboto Slab">
                **To see a preview of your profile picture, please enter a valid
                URL of your choice.
              </Text>
            )}
          </VStack>
        </Box>
      </Box>
    </div>
  );
};

export default OnBoardingPage;
