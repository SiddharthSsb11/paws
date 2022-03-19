import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
const GalleryPage = () => {
  return (
    <Box d="flex" margin="2rem auto" flexDir="column" gap="1rem">
      <Box
        bg="gray.100"
        color="black"
        fontFamily="Suez One"
        py={1.5}
        px={4}
        borderRadius="7px"
      >
        <Text fontSize="3xl" color="black"> Meet local pets 🐩 and pet lovers 🐈‍⬛ for <br /> friendship, play-dates 🦴 or fun outdoor playing 🐾. </Text>
      </Box>
      <section>
      
      </section>
    </Box>
  );
};

export default GalleryPage;
