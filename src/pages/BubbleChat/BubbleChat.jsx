import { Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function BubbleChat(props = {text: '', isWriter: true, username: '', createdAt: ''}) {
    const {text, isWriter, username, createdAt} = props;
  return (
    <Flex direction='row' justifyContent='flex-start'>
        <Container borderRadius="20px" backgroundColor={isWriter ? 'green.100' : 'gray.100'}>           
            <Text marginBottom='5px'><b>{username}</b> | {createdAt}</Text>
             <Text>{text}</Text>
        </Container>
    </Flex> 
  )
}
