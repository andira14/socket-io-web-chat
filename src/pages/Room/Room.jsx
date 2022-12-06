import React, { useEffect, useRef, useState } from 'react'
import { Button, ChakraProvider, Container, Flex, Textarea } from '@chakra-ui/react'
import BubbleChat from '../BubbleChat/BubbleChat'
import { useNavigate, useLocation } from 'react-router-dom'
import io from 'socket.io-client';
import config from '../../config/config';

export default function Room() {
    const state = useLocation().state;
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const [mention, setMention] = useState('');

    const socket = useRef(null);

    useEffect(() => {
        if(socket.current === null){
            socket.current = io(config.hostname);
            if(state === null){
                return navigate('/')
            }
            socket.current.connect();
            socket.current.emit('all', {message: `${state.username} just joined`});
            socket.current.on(state.username, (message) => {
                alert(message.message);
            });
            socket.current.on('all', (message) => {
                setChats((old) => [
                    ...old, 
                    {
                        createdAt: message.createdAt, 
                        text: message.message, 
                        username: message.username || 'system'
                    }]);
            });
        }
    }, []);
    
    const currentUsername = state.username;
  return (
    <ChakraProvider resetCSS>
        <Container minHeight="80vh" maxHeight="70vh" overflow='scroll'>
            {
                chats.map((element) => {
                    const {text, username, createdAt} = element;
                    return (
                        <Container marginBottom='10px'>
                            <BubbleChat text={text} isWriter={currentUsername === username} username={username} createdAt={createdAt}/>
                        </Container>
                    )
                })
            }
        </Container>
        <Container marginTop='20px'>
            <input placeholder='Mention...' marginRight="20px" onChange={(event) => {
                setMention(event.target.value.toLowerCase());
            }} value={mention}/>
            <Flex direction='row' alignItems='center'>
                <Textarea placeholder='Message...' noOfLines="1" marginRight="20px" onChange={(event) => {
                    setMessage(event.target.value);
                }} value={message}/>
                <Button onClick={() => {
                    socket.current.emit('all', {username: currentUsername, message, mention}); setMessage(''); setMention('');
                }}>Send</Button>
            </Flex>
        </Container>
    </ChakraProvider>
  )
}
