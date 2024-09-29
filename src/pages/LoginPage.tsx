import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput, Title, Stack, Container, Card, Text } from '@mantine/core';
import { useAppStore } from '../store/app.store';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!username || !password) {
      setErrorMessage('Username and password are required.');
      return;
    }
    
    const isSuccess = login(username, password);
    if (isSuccess) {
      navigate('/resources');
    } else {
      setErrorMessage('Invalid username or password.');
    }
  };

  return (
    <Container style={{ maxWidth: 400, margin: '0 auto', paddingTop: '130px' }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%', backgroundColor: '#DADBE2'}}>
        <Stack align="center" spacing="lg">
          <Title>Login</Title>
          {errorMessage && <Text color="red">{errorMessage}</Text>}
          <TextInput
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleSubmit}>Login</Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default LoginPage;
