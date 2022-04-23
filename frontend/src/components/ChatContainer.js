import { ViewIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Icon,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  Button,
  Text,
  FormControl,
  Spinner,
  Input,
  InputGroup,
  InputRightElement,
  Avatar, useToast
} from "@chakra-ui/react";
//import { BsChatRightDotsFill, BsChatLeftDotsFill } from "react-icons/bs";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  IoArrowBackCircleSharp,
  IoFemaleSharp,
  IoMaleSharp,
} from "react-icons/io5";
import { GiBalloonDog } from "react-icons/gi";
import "./ChatContainer.css";
import { MdSend } from "react-icons/md";
//import ScrollableChat from "./ScrollableChat";
import PawsContext from "../Context/paws-context";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";

const ChatContainer = () => {
  const [overlay, setOverlay] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersMessages, setUsersMessages] = useState(null);
  const [selectedMatchMessages, setSelectedMatchMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const initialRef = useRef();
  const { user, selectedMatch, setSelectedMatch } = useContext(PawsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
  );

  const getUsersMessages = async()=>{
    if (!selectedMatch) return;
    setLoading(true);
    try{

      const response = await axios.get("/messages" , {
        params: {userId: user?.user_id, correspondingUserId: selectedMatch?.user_id }
      });

      //console.log("user messages from server", response.data);
      setUsersMessages(response.data);
      setLoading(false);

    }catch(error){
      console.log (error);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  }

  const getSelectedMatchMessages = async()=>{
    if (!selectedMatch) return;
    setLoading(true);
    try{
      const response = await axios.get('/messages', {
        params: {userId: selectedMatch?.user_id, correspondingUserId: user?.user_id}
      });
      //console.log('selectedMatch messages from server', response.data);
      setSelectedMatchMessages(response.data);
      setLoading(false);
    }catch (error){
      console.log (error);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  }

  useEffect(() => {
    getUsersMessages();
    getSelectedMatchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedMatch])

  const messages = [];

  usersMessages?.forEach(message => {
    const formattedMessage = {}
    formattedMessage['name'] = user?.name;
    formattedMessage['img'] = user?.url;
    formattedMessage['message'] = message.message;
    formattedMessage['timestamp'] = message.timestamp
    formattedMessage['id'] = message._id;
    messages.push(formattedMessage);
  });

  selectedMatchMessages?.forEach(message => {
    const formattedMessage = {}
    formattedMessage['name'] = selectedMatch?.name;
    formattedMessage['img'] = selectedMatch?.url;
    formattedMessage['message'] = message.message;
    formattedMessage['timestamp'] = message.timestamp;
    formattedMessage['id'] = message._id
    messages.push(formattedMessage);  
  });

  //console.log (" usersMessages ", usersMessages);
  ///console.log("selected match messages", selectedMatchMessages);
  //console.log('messages in inbox', messages);
  const inOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp));

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      const message = {
        timestamp: new Date().toISOString(),
        from_userId: user?.user_id,
        to_userId: selectedMatch?.user_id,
        message: newMessage,
      };
      try {
        await axios.post("/message", { message });
        setNewMessage("");
        //console.log("meeage sent server response",response.data)
        getUsersMessages();
        getSelectedMatchMessages();
        toast({
          title: "Message Sent!",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "bottom-right",
        });
        
      } catch (error) {
        console.log(error);
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    }
  };
 
  return (
    <React.Fragment>
      {selectedMatch ? (
        <Box
          d="flex"
          flexDir="column"
          gap="1em"
          bg="purple.900"
          height="42rem"
          //width="26.5%"
          width = {{ base: "85%", md: "60%", xl: "26.5%" }}
          //color="white"
          borderRadius="7px"
          border="1.5px solid black"
          boxShadow="5px 5px 5px black"
        >
          <Box
            d="flex"
            justifyContent="space-around"
            borderBottom="4px solid black" /* #9B2C2C */
            alignItems="center"
            width="100%"
            height="16%"
            bg="yellow.400"
            borderRadius="5px"
          >
            <IconButton
              variant="ghost"
              //bg="gray.700"
              color="gray.800"
              size="md"
              textAlign="center"
              fontSize="4xl"
              fontWeight="bold"
              _hover={{ backgroundColor: "black", color: "red.600" }}
              aria-label="Go Back to Swiping"
              icon={<IoArrowBackCircleSharp />}
              onClick={() => setSelectedMatch(false)}
            />

            <Badge
              fontFamily="suez one"
              variant="solid"
              bg="black"
              color="red.600"
              fontSize="3xl"
              px={3}
              py={1}
              borderRadius="7px"
              letterSpacing="1.75px"
              _hover={{ background: "red.600", color: "white" }}
              //_hover={{ background: "black", color:"red.600"  }}
            >
              {selectedMatch.name}
            </Badge>
            <IconButton
              variant="ghost"
              //bg="gray.700"
              color="gray.800"
              size="md"
              textAlign="center"
              fontSize="4xl"
              fontWeight="bold"
              _hover={{ backgroundColor: "black", color: "red.600" }}
              aria-label="View Details"
              //d={{ base: "flex" }}
              icon={<ViewIcon />}
              onClick={() => {
                setOverlay(<OverlayOne />);
                onOpen();
              }}
            />

            <Modal
              isOpen={isOpen}
              onClose={onClose}
              size="2xl"
              initialFocusRef={initialRef}
            >
              {overlay}
              <ModalContent
                border="1.5px solid black"
                bg="purple.900"
                color="white"
                fontFamily="roboto slab"
                p={2}
              >
                <ModalHeader fontSize="4xl" borderBottom="3px solid white">
                  <Box d="flex" alignItems="center" gap="10px">
                    <Icon as={FaInfoCircle} />
                    <Text fontSize="5xl">Information</Text>
                  </Box>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody marginTop="10px" pb={5}>
                  <Box
                    d="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDir={{ base: "column", sm: "row" }}
                    bg="yellow.400"
                    gap={{base:"1.4rem", sm:"1rem"}}
                    px={2.5}
                    height={{base:"24rem", sm:"12rem"}}
                    borderRadius="10px"
                    border="1px solid black"
                  >
                    <Avatar
                      //size="lg"
                      h={44}
                      w={44}
                      name={selectedMatch.name}
                      src={selectedMatch.url}
                      border="1px solid black"
                    />

                    <Box
                      //bg="red.600"  color="white"
                      bg="black"
                      color="red.500"
                      borderRadius="1rem"
                      width="100%"
                      px={3}
                      py={1.5}
                      fontFamily="roboto slab"
                      fontWeight="bold"
                      border="1px solid black"
                      d="flex"
                      flexDirection="column"
                      alignItems="start"
                      justifyContent="center"
                      gap="4px"
                      fontSize="xl"
                      _hover={{ backgroundColor: "red.600", color: "white" }}
                      //_hover={{ background: "black", color: "red.500" }}
                    >
                      <Text>Name - {selectedMatch.name}</Text>
                      <Text>Age - {2022 - selectedMatch.year} years </Text>
                      <Text>
                        {" "}
                        Gender -{" "}
                        {selectedMatch.genderShow
                          ? selectedMatch.gender === "male"
                            ? "Male "
                            : "Female "
                          : " "}
                        {selectedMatch.genderShow ? (
                          <span>
                            {selectedMatch.gender === "Male" ? (
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
                          <span style={{ fontSize: "1.2rem" }}>
                            Gender Hidden
                          </span>
                        )}
                      </Text>

                      <Box d="flex" alignItems="center" gap="5px">
                        <Icon fontSize="1.2rem" as={FaInfoCircle} />
                        <Text fontSize="xl">{selectedMatch.about}</Text>
                      </Box>
                    </Box>
                  </Box>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>

          <Box d="flex" flexDir="column" alignItems="center" gap="1.2rem">
            <Badge
              variant="outline"
              colorScheme="yellow"
              fontSize="xl"
              fontFamily="bungee"
              px={1.5}
              letterSpacing="1.25px"
            >
              Chats
            </Badge>

            <Box
              d="flex"
              flexDir="column"
              justifyContent="flex-end"
              p={3}
              bg="yellow.300"
              w="92%"
              //h="100%"
              height="30rem"
              borderRadius="lg"
              overflowY="hidden"
              // overflow-y: auto;
              border="1px solid black"
            >
              {loading ? (
                <Spinner
                  size="xl"
                  w={20}
                  h={20}
                  alignSelf="center"
                  margin="auto"
                />
              ) : (
                <div
                  className="messages"
                  //overflow-y: auto
                >
                <ScrollableChat messages={inOrderMessages}/>
                </div>
              )}

              <FormControl
                onKeyDown={sendMessage}
                id="first-name"
                isRequired
                mt={3}
              >
                {/* <Input
                  color="black"
                  focusBorderColor="black"
                  bg="white"
                  //variant="filled"
                  //bg="#E0E0E0"
                  placeholder="Enter a message.."
                  value={newMessage}
                  //onChange={() => console.log("typing...")}
                /> */}

                <InputGroup size="md">
                  <Input
                    fontFamily="roboto slab"
                    id="text"
                    name="text"
                    type="text"
                    color="black"
                    focusBorderColor="black"
                    bg="white"
                    //variant="filled"
                    //bg="#E0E0E0"
                    placeholder="Enter a message.."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    errorBorderColor="red.300"
                  />
                  <InputRightElement width="4.5rem">
                    <IconButton
                      variant="ghost"
                      //bg="gray.700"
                      color="gray.800"
                      size="sm"
                      marginRight="-1rem"
                      //textAlign="center"
                      fontSize="2xl"
                      fontWeight="bold"
                      _hover={{ backgroundColor: "black", color: "red.600" }}
                      aria-label="Send Message"
                      //d={{ base: "flex" }}
                      icon={<MdSend />}
                      onClick={sendMessage}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          flexDir="column"
          d="flex"
          alignItems="center"
          //justifyContent="space-around"
          bg="purple.900"
          height="42rem"
          width= {{ base: "85%", md: "60%", xl: "26.5%" }}
          gap="3em"
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
              fontFamily="suez one"
              variant="solid"
              bg="black"
              color="red.600"
              fontSize="3xl"
              px={3}
              py={1}
              borderRadius="7px"
              letterSpacing="1.75px"
              _hover={{ background: "red.600", color: "white" }}
              //_hover={{ background: "black", color:"red.600"  }}
            >
              &nbsp; Inbox &nbsp;
            </Badge>
          </Box>

          <Box
            bg="yellow.300"
            height="33%"
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
              Click on a Match
              <br /> to start chatting
            </Badge>
          </Box>

          <Icon
            className="animate"
            color="yellow.500"
            h={48}
            w={48}
            as={GiBalloonDog}
          ></Icon>
        </Box>
      )}
    </React.Fragment>
  );
};

export default ChatContainer;
