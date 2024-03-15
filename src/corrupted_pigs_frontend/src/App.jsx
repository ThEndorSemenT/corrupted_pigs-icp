import { useState } from 'react';
import { corrupted_pigs_backend } from 'declarations/corrupted_pigs_backend';
import Game from "./components/Game";
import JoinGame from './components/JoinGame';
import Navbar from './components/Navbar';
import { Container } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

function App() {
  const [roomId, setRoomId] = useState(null);
  const [player1Cards, setPlayer1Cards] = useState([1, 10, 3]); // Sample cards for player 1
  const [player2Cards, setPlayer2Cards] = useState([4, 5, 6]); // Sample cards for player 2
  return (
    <div>
      <Navbar />
      <Container marginTop={20}>
        {!roomId ? (
          <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
              <Tab>Play!</Tab>
              <Tab>Institutions</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <JoinGame />
              </TabPanel>
              <TabPanel>
                <p>Institutions:</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          <Game player1Cards={player1Cards} player2Cards={player2Cards} />
          )}
      </Container>
    </div>
  );
};

export default App;
