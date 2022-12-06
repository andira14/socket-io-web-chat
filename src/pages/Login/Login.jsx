import React, {useState} from 'react'
import {
    ChakraProvider,
    Container,
    Flex,
    Text,
    Input,
    Button
  } from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom';
import config from '../../config/config';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

  return (
    <ChakraProvider resetCSS>
      <Container minWidth="100vw" minHeight="100vh">
        <Container height={500}>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="stretch"
            minHeight="100%"
          >
            <Flex justifyContent="center" mb={50}>
              <Text fontSize="3xl">Group Chat Webinar Eduwork</Text>
            </Flex>
            <Flex justifyContent="flex-start" alignItems="center" mb={50}>
              <Input placeholder="Username" variant="outline" size="lg" onChange={(event) => {setUsername(event.target.value.toLowerCase())}} value={username} />
            </Flex>
            <Flex alignItems="center" mb={50}>
              <Input size="lg" placeholder="Password" type="password" onChange={(event) => {setPassword(event.target.value)}} />
            </Flex>
            <Flex justifyContent="center" alignItems="center">
              <Button variant="solid" size="md" marginRight="10px" onClick={async () => {
                const result = await fetch(`${config.hostname}/login`, {
                    method: 'POST', 
                    body: JSON.stringify({username, password}),
                    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
                  }
                );
                const success = await result.json();
                if(!result.ok || !success){
                  return alert('Username not registered');
                }
                alert('Directing you to chat room');
                return navigate('/room', {state:{username}});
              }}
                  >
                JOIN!!
              </Button>
              <Button variant="solid" size="md" marginLeft="10px" onClick={async () => {
                const result = await fetch(`${config.hostname}/register`, {
                  method: 'POST', 
                  body: JSON.stringify({username, password}),
                  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
                }
              )
              const success = await result.json();
              if(!result.ok ||  !success){
                return alert('Username already used');
              }
              alert('Directing you to chat room');
              return navigate('/room', {state:{username}});
            }}>
                REGISTER
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Container>
    </ChakraProvider>
  )
}
