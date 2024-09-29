import React from 'react';
import { Group, Text, Anchor, Container, Stack } from '@mantine/core';

const Footer: React.FC = () => {
  return (
    <Container
      fluid
      style={{
        width: '100%',
        padding: '10px 0', 
        backgroundColor: '#6F728F',
      }}
    >
      <Stack align="center">
        <Text>© {new Date().getFullYear()} Script Assist. All rights reserved.</Text>
        <Group spacing="lg">
          <Anchor href="/privacy-policy" target="_blank" size="sm">Privacy Policy</Anchor>
          <Anchor href="/terms-of-service" target="_blank" size="sm">Terms of Service</Anchor>
          <Anchor href="/contact" target="_blank" size="sm">Contact Us</Anchor>
        </Group>
      </Stack>
    </Container>
  );
};

export default Footer;
