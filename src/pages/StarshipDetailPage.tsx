import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import DetailCard from '../components/DetailCard';

interface StarshipDetail {
  name: string;
  model: string;
  manufacturer: string;
  starship_class: string;
  cost_in_credits: string;
  max_atmosphering_speed: string;
}

const fetchStarshipDetail = async (id: string): Promise<StarshipDetail> => {
  const { data } = await axios.get(`https://swapi.dev/api/starships/${id}/`);
  return data;
};

const StarshipDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: starship, isLoading, error } = useQuery(['starship', id], () => fetchStarshipDetail(id!));

  if (!starship) return null;

  const details = [
    { label: 'Model', value: starship.model },
    { label: 'Manufacturer', value: starship.manufacturer },
    { label: 'Class', value: starship.starship_class },
    { label: 'Cost', value: `${starship.cost_in_credits} credits` },
    { label: 'Max Speed', value: `${starship.max_atmosphering_speed} km/h` },
  ];

  return <DetailCard title={starship.name} details={details} isLoading={isLoading} error={error} />;
};

export default StarshipDetailPage;
