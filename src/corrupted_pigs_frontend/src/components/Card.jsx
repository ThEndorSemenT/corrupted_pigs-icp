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
            size="xs"
            variant="outline"
            borderRadius={10}
            borderWidth="4px"
            borderColor={isSelected ? "blue.500" : "white"}
        >
            <CardBody>
                <div>
                <Image
                src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
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
            <CardFooter>
                <Button variant='solid' colorScheme='blue' onClick={onClick}>
                    Select Card
                </Button>
            </CardFooter>
        </PigCard>
    );
}

export default Card