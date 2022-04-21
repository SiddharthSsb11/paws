import React, { useEffect, useState} from "react";
import {
  Box,
  Text,
  Image,
  Button,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {} from "@chakra-ui/react";
import gal1 from "./img/gal1.jpg";
import gal2 from "./img/gal2.jpg";
import gal3 from "./img/gal3.jpg";
import gal4 from "./img/gal4.jpg";
import gal5 from "./img/gal5.jpg";
import gal6 from "./img/gal6.jpg";
import gal7 from "./img/gal7.jpg";
import gal8 from "./img/gal8.jpg";
import gal9 from "./img/gal9.jpg";
import gal10 from "./img/gal10.jpg";
import gal11 from "./img/gal11.jpg";
import gal12 from "./img/gal12.jpg";
import gal13 from "./img/gal13.jpg";
import gal14 from "./img/gal14.jpg";
//import gal15 from "./img/gal15.jpg";
//import gal16 from "./img/gal16.jpg";
//import gal17 from "./img/gal17.jpg";
//import gal18 from "./img/gal18.jpg";
//import gal19 from "./img/gal19.jpg";
//import gal20 from "./img/gal20.jpg";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";
import "./GalleryPage.css";

const GalleryPage = () => {

  const [overlay, setOverlay] = useState("");

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const pawsUserDetails = JSON.parse(localStorage.getItem("pawsUserDetails"));

    if (pawsUserDetails /* || authToken */) navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="back">
      <Box d="flex" margin="2rem auto" flexDir="column" gap="1rem" width={{ base: "92.5%", md: "85%" }}>
        <Box
          bg="purple.900"
          //color="black"
          fontFamily="Suez One"
          //py={1.5}
          d="flex"
          flexDir={{ base: "column", md: "row" }}
          alignItems="center" gap="0.5rem"
          justifyContent="space-between"
          p={{base:2, md:5}}
          borderRadius="7px"
          border="1.5px solid black"
          boxShadow="5px 5px 5px black"
          //_hover={{ backgroundColor: "purple.900" }}
        >
          <Text fontSize={{base:"lg", md:"3xl"}} color="white" textAlign="left">
            {" "}
            Meet local pets 🐕 and pet lovers 🐈‍ for  friendship,
            play-dates 🦴 or fun outdoor playing 🦦.{" "}
          </Text>{" "}
          <Box d="flex" flexDir={{ base: "row", md: "column" }} gap="0.5em" alignItems="center" 
            alignSelf={{ base: "start", md: "center" }}
          >
            <Button
              leftIcon={<ArrowBackIcon />}
              fontWeight="bold"
              colorScheme="yellow"
              //width="100%"
              //style={{ marginTop: "15px" }}
              onClick={() => navigate("/")}
              //isLoading={loading}
              //disabled={user}
              fontSize={{base:"sm", md:"xl"}}
            >
              Go Back
            </Button>
            <AuthModal overlay={overlay}>
              <Button
                rightIcon={<ArrowForwardIcon />}
                fontWeight="bold"
                colorScheme="yellow"
                //width="100%"
                //style={{ marginTop: "15px" }}
                onClick={() => {
                  setOverlay(<OverlayOne />);
                  onOpen();
                }}
                //isLoading={loading}
                //disabled={user}
                fontSize={{base:"sm", md:"xl"}}
              >
                Dive In
              </Button>
            </AuthModal>
          </Box>
        </Box>
        <Box boxShadow="5px 5px 5px black">
          <section className="gallery">
            <figure className="gallery__item gallery__item--1 ">
              <Image src={gal1} alt="gallery img 1" className="gallery__img" />
            </figure>
            <figure className="gallery__item gallery__item--2 ">
              <Image src={gal2} alt="gallery img 2" className="gallery__img" />
            </figure>
            <figure className="gallery__item gallery__item--3 ">
              <Image src={gal3} alt="gallery img 3" className="gallery__img" />
            </figure>
            <figure className="gallery__item gallery__item--4 ">
              <Image src={gal4} alt="gallery img 4" className="gallery__img" />
            </figure>
            <figure className="gallery__item gallery__item--5 ">
              <Image src={gal5} alt="gallery img 5" className="gallery__img" />
            </figure>
            <figure className="gallery__item gallery__item--6 ">
              <Image src={gal6} alt="gallery img 6" className="gallery__img" />
            </figure>
            <figure className="gallery__item gallery__item--7 ">
              <Image src={gal7} alt="gallery img 7" className="gallery__img" />
            </figure>
            <figure className="gallery__item gallery__item--8 ">
              <Image src={gal8} alt="gallery img 8" className="gallery__img" />
            </figure>
            <figure className="gallery__item gallery__item--9 ">
              <Image src={gal9} alt="gallery img 9" className="gallery__img" />
            </figure>
            <figure className="gallery__item gallery__item--10 ">
              <Image
                src={gal10}
                alt="gallery img 10"
                className="gallery__img"
              />
            </figure>
            <figure className="gallery__item gallery__item--11 ">
              <Image
                src={gal11}
                alt="gallery img 11"
                className="gallery__img"
              />
            </figure>
            <figure className="gallery__item gallery__item--12 ">
              <Image
                src={gal12}
                alt="gallery img 12"
                className="gallery__img"
              />
            </figure>
            <figure className="gallery__item gallery__item--13 ">
              <Image
                src={gal13}
                alt="gallery img 13"
                className="gallery__img"
              />
            </figure>
            <figure className="gallery__item gallery__item--14 ">
              <Image
                src={gal14}
                alt="gallery img 14"
                className="gallery__img"
              />
            </figure>
          </section>
        </Box>
      </Box>
    </div>
  );
};

export default GalleryPage;
