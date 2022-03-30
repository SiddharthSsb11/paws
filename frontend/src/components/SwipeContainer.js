import React, { useState } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import TinderCard from "react-tinder-card";
import './SwipeContainer.css'

const characters = [
    {
      name: "Richard Hendricks",
      url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/medium-sized-dogs-1613083812.jpg?crop=0.668xw:1.00xh;0.0369xw,0&resize=640:*",
    },
    {
      name: "Erlich Bachman",
      url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/medium-sized-dogs-1613083812.jpg?crop=0.668xw:1.00xh;0.0369xw,0&resize=640:*",
    },
    {
      name: "Monica Hall",
      url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/medium-sized-dogs-1613083812.jpg?crop=0.668xw:1.00xh;0.0369xw,0&resize=640:*",
    },
    {
      name: "Jared Dunn",
      url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/medium-sized-dogs-1613083812.jpg?crop=0.668xw:1.00xh;0.0369xw,0&resize=640:*",
    },
    {
      name: "Dinesh Chugtai",
      url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/medium-sized-dogs-1613083812.jpg?crop=0.668xw:1.00xh;0.0369xw,0&resize=640:*",
    },
  ];

const SwipeContainer = () => {

    const [lastDirection, setLastDirection] = useState();

    const swiped = (direction, nameToDelete) => {
      console.log("removing: " + nameToDelete);
      setLastDirection(direction);
    };
    console.log(lastDirection);
    const outOfFrame = (name) => {
      console.log(name + " left the screen!");
    };
  return (
    <div className="swipeContainer">
          <div className="cardContainer">
            {characters.map((character) => (
              <Box d="flex">
                <TinderCard
                  className="swipe"
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.name)}
                  onCardLeftScreen={() => outOfFrame(character.name)}
                >
                  <div
                    style={{ backgroundImage: "url(" + character.url + ")" }}
                    className="card"
                  >
                    <h3>{character.name}</h3>
                  </div>
                </TinderCard>
              </Box>
            ))}
          </div>
          <div className="swipeInfo">
          {lastDirection ? (
            <h2 className="infoText">You swiped {lastDirection}</h2>
          ) : (
            <h2>Swipe/Drag left or right</h2>
          )}
          </div>
          
        </div>
  )
}

export default SwipeContainer