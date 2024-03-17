import React, { useEffect, useState } from 'react'
import {
  Container,
  SimpleGrid,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button
} from "@chakra-ui/react"
import Card from './Card';
import { corrupted_pigs_backend } from '../../../declarations/corrupted_pigs_backend';

const Game = ({
  player1Cards,
  player2Cards,
  principalId
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedCard1, setSelectedCard1] = useState(null);
    const [selectedCard2, setSelectedCard2] = useState(null);
    const [winner, setWinner] = useState(null);
    const [player, setPlayer] = useState(null);
    const [text, setText] = useState("");

    useEffect(() => {

      const clearQueue = async () => {
        if(text == "") {
          let text1 = await corrupted_pigs_backend.cleanQueue();
          setText(text1);
        }
        console.log(text);
      }

      const joinGame = async () => {
        if(!player) {
          let player1 = await corrupted_pigs_backend.joinGame(principalId, [10, 11, 12]);
          setPlayer(player1);
        }
        console.log(player);
      }


      //clearQueue();
      joinGame();
    }, [player, text]);

    const handleCardSelection = (card, player) => {
      if (player === 1) {
        setSelectedCard1(card);
      } else if (player === 2) {
        setSelectedCard2(card);
        determineWinner(card);
      }
    };

    const determineWinner = (card2) => {
      if (selectedCard1 > card2) {
        setWinner(1);
      } else if (selectedCard1 < card2) {
        setWinner(2);
      } else {
        setWinner('tie');
      }
      onOpen();
    };

    const resetGame = () => {
      setSelectedCard1(null);
      setSelectedCard2(null);
      setWinner(null);
    };

    return (
      <Container id="gameboard" maxW="80%" style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column", height: "100%"}}>
        <Text fontSize={32} fontWeight="bold">Game Board</Text>
        {(player === undefined) ? (
          <p>Loading playerId...</p>
          ) : (
          <>
            <p>{"MatchId:" + player}</p>
          </>
        )}
        <div>
          <h3>Player 1</h3>
          <SimpleGrid spacing={4} style={{display: "flex", flexDirection: "row"}}>
            {player1Cards.map((pig_id, index) => (
              <Card key={index} pig_id={pig_id} onClick={() => handleCardSelection(pig_id, 1)} isSelected={selectedCard1 === pig_id} />
            ))}
          </SimpleGrid>
        </div>

        <div style={{marginTop: "20px"}}>
          <SimpleGrid spacing={4} style={{display: "flex", flexDirection: "row"}}>
            {player2Cards.map((pig_id, index) => (
              <Card key={index} pig_id={pig_id} onClick={() => handleCardSelection(pig_id, 2)} isSelected={selectedCard2 === pig_id} />
            ))}
          </SimpleGrid>
          <h3>Player 2</h3>
        </div>

        {winner && (
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Game Finished!</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {winner === 'tie' ? (
                <p>It's a tie!</p>
                ) : (
                  <p>Player {winner} wins!</p>
              )}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={resetGame}>
                Play Again
              </Button>
              <Button onClick={onClose}>Return Home</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        )}
    </Container>
    );
}

export default Game
