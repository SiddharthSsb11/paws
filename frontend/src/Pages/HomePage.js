import React from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import classes from "./HomePage.module.css";
const HomePage = () => {
  return (
    <Box margin="1rem auto" d="flex" flexDir="column" gap="1rem" color="white">
      <Box
        //className={classes.grad}
        paddingX="1.2em"
        borderRadius="7px"
        border="1px solid black"
        boxShadow="5px 5px 5px black"
        bg="#44337A"
      >
        <Heading>
          {" "}
          Paws hhhhh hhhhhh hhhhhhhhhh hhhhhhhhhhhh hhhhhhhhhhh{" "}
        </Heading>
      </Box>

      <Box bg="white">
        <Text>xyz</Text>
      </Box>
    </Box>
  );
};

export default HomePage;
