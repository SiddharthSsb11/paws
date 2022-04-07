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
} from "@chakra-ui/react";
//import { BsChatRightDotsFill, BsChatLeftDotsFill } from "react-icons/bs";
import React, { useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { GiBalloonDog } from "react-icons/gi";
import "./ChatContainer.css";
//import ScrollableChat from "./ScrollableChat";

const ChatContainer = () => {
  const [selectedMatch, setSelectedMatch] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    console.log("message sent");
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
          width="25%"
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
              Kayla
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
              onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>hello profimle modal</ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
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
              bg="yellow.200"
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
                  ScrollableChat
                </div>
              )}

              <FormControl
                //onKeyDown={() => console.log("enter message sent")}
                id="first-name"
                isRequired
                mt={3}
              >
                <Input
                  color="black"
                  focusBorderColor="black"
                  bg="white"
                  //variant="filled"
                  //bg="#E0E0E0"
                  placeholder="Enter a message.."
                  //value={newMessage}
                  //onChange={() => console.log("typing...")}
                />
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
          width="25%"
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
