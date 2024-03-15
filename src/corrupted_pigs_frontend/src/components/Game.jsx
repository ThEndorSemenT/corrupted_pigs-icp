import React, { useState } from 'react'
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
  Button,
} from "@chakra-ui/react"
import Card from './Card';

const Game = ({player1Cards, player2Cards}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedCard1, setSelectedCard1] = useState(null);
    const [selectedCard2, setSelectedCard2] = useState(null);
    const [winner, setWinner] = useState(null);
  
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
      <Container maxW="80%" style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column", height: "100vh"}}>
        <Text fontSize={32} fontWeight="bold">Game Board</Text>
        <div>
          <h3>Player 1</h3>
          <SimpleGrid spacing={4} style={{display: "flex", flexDirection: "row"}}>
            {player1Cards.map((card, index) => (
              <Card key={index} value={card} onClick={() => handleCardSelection(card, 1)} isSelected={selectedCard1 === card} />
            ))}
          </SimpleGrid>
        </div>
        <div>
          <SimpleGrid spacing={4} style={{display: "flex", flexDirection: "row"}}>
            {player2Cards.map((card, index) => (
              <Card key={index} value={card} onClick={() => handleCardSelection(card, 2)} isSelected={selectedCard2 === card} />
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