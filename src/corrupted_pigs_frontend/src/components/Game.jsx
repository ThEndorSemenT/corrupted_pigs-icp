import React, { useEffect, useRef, useState } from 'react'
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
  principalId,
  setJoiningGame
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedCard1, setSelectedCard1] = useState(null);
    const [selectedCard2, setSelectedCard2] = useState(null);
    const [winner, setWinner] = useState(null);
    const [player, setPlayer] = useState(null);
    const [text, setText] = useState("");
    const [matchId, setMatchId] = useState(null);

    const intervalIdRef = useRef(null);

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
          let player1 = await corrupted_pigs_backend.joinGame(principalId, [4, 5, 6]);
          setPlayer(player1);
          startCheckGameStartInterval();
        }
        console.log(player);
      }

      console.log(principalId);
      joinGame();
    }, [player, text]);

    const startCheckGameStartInterval = () => {
      intervalIdRef.current = setInterval(async () => {
        await checkGameStart();
      }, 3000); // 3 seconds
    }

    const checkGameStart = async () => {
      const _match = await corrupted_pigs_backend.checkGameStart(principalId);
      if(_match.err){
        console.log(_match)
      }
      else if(_match.ok){
        clearInterval(intervalIdRef.current);
        setMatchId(_match.ok.id);
        console.log(_match);
      }
    };

    const handleCardSelection = async (card, player) => {
      setSelectedCard2(card);
      console.log(matchId);
      let play = await corrupted_pigs_backend.makePlay(principalId, matchId, card);
      console.log(play);
      intervalIdRef.current = setInterval(async () => {
        await determineWinner();
      }, 3000); // 3 seconds
    };

    const determineWinner = async () => {
      const winner = await corrupted_pigs_backend.checkWinner(matchId);
      console.log("Winner:" + winner);
      if(winner == "Error"){
        return;
      }
      if (winner == principalId) {
        setWinner("You Won!");
        clearInterval(intervalIdRef.current);
      } else if (winner == "Tie") {
        setWinner('Tie');
        clearInterval(intervalIdRef.current);
      } else {
        setWinner("You Lost!");
        clearInterval(intervalIdRef.current);
      }
      onOpen();
    };

    const resetGame = async () => {
      await corrupted_pigs_backend.cleanQueue();
      setSelectedCard1(null);
      setSelectedCard2(null);
      setWinner(null);
      onClose();
      setJoiningGame(false);
    };

    return (
      <Container id="gameboard" maxW="80%" style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column", height: "100%"}}>
        <Text fontSize={32} fontWeight="bold">Game Board</Text>
        <div>
          <h3>Opponent</h3>
          <SimpleGrid spacing={4} style={{display: "flex", flexDirection: "row"}}>
            {player1Cards.map((pig_id, index) => (
              <Card key={index} pig_id={pig_id} />
            ))}
          </SimpleGrid>
        </div>

        <div style={{marginTop: "20px"}}>
          <SimpleGrid spacing={4} style={{display: "flex", flexDirection: "row"}}>
            {player2Cards.map((pig_id, index) => (
              <Card key={index} pig_id={pig_id} onClick={() => handleCardSelection(pig_id, 2)} isSelected={selectedCard2 === pig_id} />
            ))}
          </SimpleGrid>
          <h3>You</h3>
        </div>

        {winner && (
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Game Finished!</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {winner === 'Tie' ? (
                <p>It's a tie!</p>
                ) : (
                  <p>{winner}</p>
              )}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' onClick={resetGame}>
                Return Home
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        )}
    </Container>
    );
}

export default Game
