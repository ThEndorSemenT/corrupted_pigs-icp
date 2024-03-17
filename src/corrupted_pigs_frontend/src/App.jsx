import { useEffect, useState } from 'react';
import Game from "./components/Game";
import JoinGame from './components/JoinGame';
import Navbar from './components/Navbar';
import { Container } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

function App() {
  const [authClient, setAuthClient] = useState(null);
  const [principalId, setPrincipalId] = useState(null);
  const [joiningGame, setJoiningGame] = useState(false);
  const [player1Cards, setPlayer1Cards] = useState([1, 2, 3]); // Sample cards for player 1
  const [player2Cards, setPlayer2Cards] = useState([4, 5, 6]); // Sample cards for player 2

  return (
    <div style={{maxHeight: "100vh", width: "100%"}}>
      <Navbar
        authClient={authClient}
        setAuthClient={setAuthClient}
        principalId={principalId}
        setPrincipalId={setPrincipalId}
      />
        {!joiningGame ? (
          <Container marginTop={20}>
            <Tabs isFitted variant='enclosed'>
              <TabList mb='1em'>
                <Tab>Play!</Tab>
                <Tab>Marketplace</Tab>
                <Tab>Institutions</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <JoinGame setJoiningGame={setJoiningGame} principalId={principalId}/>
                </TabPanel>

                <TabPanel>
                  <h3>Acquire your NFTs</h3>
                </TabPanel>

                <TabPanel>
                  <h3>Institutions:</h3>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container>
        ) : (
          <Game
            player1Cards={player1Cards}
            player2Cards={player2Cards}
            principalId={principalId}
          />
          )}
    </div>
  );
};

export default App;
