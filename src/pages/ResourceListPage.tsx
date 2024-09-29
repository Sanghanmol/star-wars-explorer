import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Table, Loader, Button, Container, ScrollArea, Center } from '@mantine/core';

interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
}

const fetchPeople = async (): Promise<Person[]> => {
  const { data } = await axios.get('https://swapi.dev/api/people/');
  return data.results;
};

const ResourceListPage: React.FC = () => {
  const { data, isLoading, error } = useQuery(['people'], fetchPeople);
  const navigate = useNavigate();
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();

  if (isLoading) return (
    <Center style={{ height: '80vh' }}>
      <Loader />
    </Center>
  );

  if (error) return <p>Error loading people</p>;

  const filteredData = data?.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container style={{ marginTop: '2.3rem', minHeight: '300' }}>
      <ScrollArea style={{ height: '450px' }}>
        <Table withBorder highlightOnHover horizontalSpacing="md" verticalSpacing="md" striped>
          <thead style={{ position: 'sticky', top: 0, backgroundColor: '#DADBE2', zIndex: 1 }}>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((person, index) => (
              <tr key={index}>
                <td>{person.name}</td>
                <td>{person.height}</td>
                <td>{person.mass}</td>
                <td>{person.gender}</td>
                <td>
                  <Button
                    onClick={() => navigate(`/resources/${index + 1}`)}
                    color="primary"
                    variant="outline"
                    radius="md"
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
};

export default ResourceListPage;
