import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Text, Loader, Title, Badge, Group, Stack, Button, Center, Container, Space } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface PersonDetail {
  name: string;
  height: string;
  mass: string;
  gender: string;
  skin_color: string;
  eye_color: string;
  hair_color: string;
  films: string[];
  vehicles: string[];
  starships: string[];
}

interface FilmDetail {
  title: string;
  director: string;
  release_date: string;
}

const fetchPersonDetail = async (id: string): Promise<PersonDetail> => {
  const { data } = await axios.get(`https://swapi.dev/api/people/${id}/`);
  return data;
};

const extractIdFromUrl = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

const BadgesList: React.FC<{ items: string[]; title: string; resourceType: string }> = ({ items, title, resourceType }) => {
  const navigate = useNavigate();

  return (
    <Stack align="center">
      <Title order={3}>{title}</Title>
      <Group>
        {items.length ? (
          items.map((item, index) => (
            <Badge
              key={index}
              color="grape"
              size="lg"
              variant="light"
              onClick={() => navigate(`/${resourceType}/${extractIdFromUrl(item)}`)}
              style={{ cursor: 'pointer' }}
            >
              {title.slice(0, -1)} {index + 1}
            </Badge>
          ))
        ) : (
          <Text>No {title}</Text>
        )}
      </Group>
    </Stack>
  );
};

const ResourceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: person, isLoading, error } = useQuery(['person', id], () => fetchPersonDetail(id!));

  if (isLoading) {
    return (
      <Center style={{ height: '80vh' }}>
        <Loader />
      </Center>
    );
  }

  if (error) {
    return <p>Error fetching resource detail</p>;
  }

  const { name, height, mass, gender, skin_color, eye_color, hair_color, films, vehicles, starships } = person!;

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Card shadow="sm" padding="lg" withBorder style={{ backgroundColor: '#DADBE2', color: '#232F53' }}>
        <Stack align="center" spacing="md">
          <Title>{name}</Title>
          <Stack align="center">
            <Group position="apart" mt="md" mb="xs">
              <Text><strong>Height:</strong> {height} cm</Text>
              <Space w="xl" />
              <Text><strong>Mass:</strong> {mass} kg</Text>
              <Space w="xl" />
              <Text><strong>Gender:</strong> {gender}</Text>
            </Group>
            <Group position="apart" mt="md" mb="xs">
              <Text><strong>Skin Colour:</strong> {skin_color}</Text>
              <Space w="xl" />
              <Text><strong>Eye Color:</strong> {eye_color}</Text>
              <Space w="xl" />
              <Text><strong>Hair Color:</strong> {hair_color}</Text>
            </Group>
          </Stack>

          <BadgesList items={films} title="Films" resourceType="films" />
          <Group position="apart" mt="md" mb="xs">
            <BadgesList items={vehicles} title="Vehicles" resourceType="vehicles" />
            <Space w="xl" />
            <BadgesList items={starships} title="Starships" resourceType="starships" />
          </Group>

          <Button onClick={() => navigate('/resources')} style={{ marginTop: '1rem' }}>
          Back to Resources
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default ResourceDetailPage;
