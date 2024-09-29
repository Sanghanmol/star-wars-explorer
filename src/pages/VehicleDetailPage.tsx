import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import DetailCard from '../components/DetailCard';

interface VehicleDetail {
  name: string;
  model: string;
  manufacturer: string;
  vehicle_class: string;
  cost_in_credits: string;
  max_atmosphering_speed: string;
}

const fetchVehicleDetail = async (id: string): Promise<VehicleDetail> => {
  const { data } = await axios.get(`https://swapi.dev/api/vehicles/${id}/`);
  return data;
};

const VehicleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: vehicle, isLoading, error } = useQuery(['vehicle', id], () => fetchVehicleDetail(id!));

  if (!vehicle) return null;

  const details = [
    { label: 'Model', value: vehicle.model },
    { label: 'Manufacturer', value: vehicle.manufacturer },
    { label: 'Class', value: vehicle.vehicle_class },
    { label: 'Cost', value: `${vehicle.cost_in_credits} credits` },
    { label: 'Max Speed', value: `${vehicle.max_atmosphering_speed} km/h` },
  ];

  return <DetailCard title={vehicle.name} details={details} isLoading={isLoading} error={error} />;
};

export default VehicleDetailPage;
