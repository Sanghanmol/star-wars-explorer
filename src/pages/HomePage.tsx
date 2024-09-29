import React from 'react';
import { Container, Title, Text, Stack, Space } from '@mantine/core';

const HomePage: React.FC = () => {
  return (
    <Container style={{ marginTop: '150px', textAlign: 'center' }}>
      <Stack spacing="lg">
        <Title order={1}>Welcome to the Star Wars Resource Explorer</Title>
        <Text size="lg">
          Explore the characters, vehicles, starships, and films from the Star Wars universe.
        </Text>
        <Space w="xl" />
        <Text size="lg" color="#4963AE">
          Please log in to continue...
        </Text>
      </Stack>
    </Container>
  );
};

export default HomePage;
