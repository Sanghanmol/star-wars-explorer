import React from 'react';
import {
  Card,
  Loader,
  Title,
  Stack,
  Button,
  Center,
  Container,
  Accordion,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface DetailCardProps {
  title: string;
  details: { label: string; value: string | number }[];
  isLoading: boolean;
  error: any;
}

const DetailCard: React.FC<DetailCardProps> = ({ title, details, isLoading, error }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Center style={{ height: '80vh' }}>
        <Loader />
      </Center>
    );
  }

  if (error) {
    return <p>Error loading details</p>;
  }

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Card
        shadow="lg"
        padding="lg"
        withBorder
        style={{ backgroundColor: '#CBD5E1', color: '#232F53' }}
      >
        <Stack spacing="md">
          <Title order={2} align="center">
            {title}
          </Title>

          <Accordion variant="separated" transitionDuration={1000}>
            {details.map((detail, index) => (
              <Accordion.Item key={index} value={`detail-${index}`}>
                <Accordion.Control>
                  <strong>{detail.label}</strong>
                </Accordion.Control>
                <Accordion.Panel>
                  <p>{detail.value}</p>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>

          <Button
            onClick={() => navigate(-1)}
            style={{ marginTop: '1rem' }}
            variant="filled"
          >
            Return to List
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default DetailCard;
