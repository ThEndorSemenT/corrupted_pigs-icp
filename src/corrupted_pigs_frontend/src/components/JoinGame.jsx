import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {VStack } from '@chakra-ui/react';

const JoinGame = ({setJoiningGame, principalId}) => {

  return (
    <VStack gap={10}>
      <Button colorScheme='gray' size='md' onClick={() => principalId && setJoiningGame(true)}>
        Join 'Strongest'
      </Button>
      <Button colorScheme='gray' size='md'>
        Join 'Lucky'
      </Button>
      <Button colorScheme='gray' size='md'>
        Join 'Multiplayer'
      </Button>
    </VStack>
  )
}

export default JoinGame
