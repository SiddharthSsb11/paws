import React from "react";
import { List, ListItem, IconButton, Avatar, Badge } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/layout";
import { DeleteIcon } from "@chakra-ui/icons";
import { AiFillMessage } from "react-icons/ai";

const matches = [
  {
    id: 1,
    name: "Lyla",
    imageUrl:
      "https://www.rover.com/blog/wp-content/uploads/2019/12/uniquefemaledog.jpg",
    matchedDate: "6 March 2022",
    age: "4",
  },

  {
    id: 2,
    name: "Kayla",
    imageUrl:
      "https://www.dognamegenerator.net/wp-content/uploads/2020/11/female-dog-names-usa.jpg",
    matchedDate: "5 March 2022",
    age: "3",
  },

  {
    id: 3,
    name: "Kayla",
    imageUrl:
      "https://www.dognamegenerator.net/wp-content/uploads/2020/11/female-dog-names-usa.jpg",
    matchedDate: "5 March 2022",
    age: "3",
  },
  {
    id: 4,
    name: "Kayla",
    imageUrl:
      "https://www.dognamegenerator.net/wp-content/uploads/2020/11/female-dog-names-usa.jpg",
    matchedDate: "5 March 2022",
    age: "3",
  },
  {
    id: 5,
    name: "Kayla",
    imageUrl:
      "https://www.dognamegenerator.net/wp-content/uploads/2020/11/female-dog-names-usa.jpg",
    matchedDate: "5 March 2022",
    age: "3",
  },
];

const MatchList = () => {
  return (
    <List
      d="flex"
      flexDir="column"
      gap="1rem"
      //py={1}
      px={2.5}
      alignItems="center"
      justifyContent="start"
      maxH="30em" //25-30
      overflow="auto"
      //bg="purple.500"
      width="100%"
      borderRadius="7px"
    >
      {matches.map((match) => (
        <ListItem
          key={match.id}
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderRadius="7px"
          border="1.5px solid black"
          bg="yellow.300"
          width="100%"
          p={1.5}
          //cursor="pointer"
          _hover={{ background: "yellow.400" }}
        >
          <Box
            d="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="0.5em"
          >
            <Avatar
              size="md"
              //h={20}w={20}
              name={match.name}
              src={match.imageUrl}
              border="1px solid black"
            />

            <Badge
              fontFamily="roboto slab"
              fontWeight="bold"
              variant="solid"
              bg="red.600"
              color="white"
              //fontSize="1.1em"
              fontSize="1em"
              px={1}
              borderRadius="7px"
              letterSpacing="1.5px"
              //_hover={{ background: "black", color:"red.600"  }}
            >
              {match.name}
            </Badge>
          </Box>

          <Box>
            <IconButton
              variant="ghost"
              bg="gray.700"
              color="green.500"
              size="sm"
              fontSize="xl"
              _hover={{ background: "black", color: "green.600" }}
              aria-label="Delete Transaction"
              icon={<AiFillMessage />}
              mr={2}
              onClick={() => console.log("message")}
            />
            <IconButton
              variant="ghost"
              bg="gray.700"
              color="red.500"
              size="sm"
              fontSize="xl"
              _hover={{ background: "black", color: "red.600" }}
              aria-label="Delete Transaction"
              icon={<DeleteIcon />}
              onClick={() => console.log("delete match")}
            />
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default MatchList;
