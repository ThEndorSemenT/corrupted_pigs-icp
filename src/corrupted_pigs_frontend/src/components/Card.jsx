import React from 'react'
import { 
    Card as PigCard,
    CardBody, 
    CardFooter, 
    Stack,
    Heading,
    Button,
    Text,
    Divider,
    ButtonGroup,
    Image,
    Spacer
} from '@chakra-ui/react'

const Card = ({ value, onClick, isSelected }) => {
    return (
        <PigCard 
            size="sm"
            variant="outline"
            borderRadius={10}
            borderWidth="4px"
            borderColor={isSelected ? "blue.500" : "white"}
            onClick={onClick}
            cursor="pointer"
        >
            <CardBody>
                <div>
                <Image
                src='../public/pig1.jpeg'
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                objectFit="contain"
                boxSize="100%"
                backgroundColor="red"
                />
                </div>                
                <Text fontSize={15} fontWeight="bold">Power: {value}</Text>
            </CardBody>
            <Divider />
        </PigCard>
    );
}

export default Card