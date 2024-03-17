import React from 'react'
import Card from './Card';
import { Grid, GridItem } from '@chakra-ui/react'
import {VStack } from '@chakra-ui/react';

const MarketPlace = () => {
  let cards = [
    0,
    1,
    2,
    3,
    4,
    5,
    // 6,
    // 7,
    // 8,
    // 9,
    // 10,
    // 11,
    // 12,
    // 13,
    // 14,
    // 15
  ]

  return (
    <>
      <h3>Acquire your NFTs</h3>

      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {cards.map((index, pig_id) => (
          <GridItem w='100%' bg='blue.500'>
            <Card pig_id={pig_id} />
          </GridItem>
        ))}
      </Grid>
    </>
  )
}

export default MarketPlace
