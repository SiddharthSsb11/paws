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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const ChatContainer = () => {
  const [selectedMatch, setSelectedMatch] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
      <Badge variant="outline" colorScheme="yellow" fontSize="xl" fontFamily="bungee" px={1.5}
      letterSpacing="1.25px"
    >
    Chats
    </Badge>
      </Box>
    </Box>
  );
};

export default ChatContainer;
