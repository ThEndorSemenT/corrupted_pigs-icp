import { React, useEffect, useState } from 'react'
import {
  Card as PigCard,
  CardBody,
  Badge,
  Divider,
  Image,
} from '@chakra-ui/react'
import { corrupted_pigs_nft } from "../../../declarations/corrupted_pigs_nft";
import axios from 'axios';

const Card = ({ pig_id, onClick, isSelected }) => {
  const [nftPng, setNftPng] = useState(null);

  useEffect(() => {
    const getImageData = async () => {
      let image = await corrupted_pigs_nft.getImageData(pig_id);
      setNftPng(image);
    }

    getImageData();

  }, [])

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
          src={nftPng}
          borderRadius='lg'
          objectFit="contain"
        />
        <Badge colorScheme='green' fontSize='0.7em' position='absolute' bottom='30px' right='30px'>
          {pig_id}
        </Badge>
      </CardBody>
      <Divider />
    </PigCard>
    );
  }

  export default Card
