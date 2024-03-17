import React from 'react'
import {
  Card as PigCard,
  CardBody,
  Badge,
  Divider,
  Image,
} from '@chakra-ui/react'

const Card = ({ value, onClick, isSelected }) => {
  return (
    <PigCard
      size="sm"
      variant="outline"
      borderRadius={10}
      borderWidth="4px"
      borderColor={isSelected ? "blue.500" : "aliceblue"}
      onClick={onClick}
      cursor="pointer"
    >
      <CardBody>
        <Image
          src='../public/pig1.jpeg'
          alt='Green double couch with wooden legs'
          borderRadius='lg'
          objectFit="contain"
        />
        <Badge colorScheme='green' fontSize='0.7em' position='absolute' bottom='30px' right='30px'>
          {value}
        </Badge>
      </CardBody>
      <Divider />
    </PigCard>
    );
  }

  export default Card
