import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import DetailCard from '../components/DetailCard';

interface FilmDetail {
  title: string;
  director: string;
  producer: string;
  release_date: string;
  episode_id: number;
  opening_crawl: string;
}

const fetchFilmDetail = async (id: string): Promise<FilmDetail> => {
  const { data } = await axios.get(`https://swapi.dev/api/films/${id}/`);
  return data;
};

const FilmDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: film, isLoading, error } = useQuery(['film', id], () => fetchFilmDetail(id!));

  if (!film) return null;

  const details = [
    { label: 'Director', value: film.director },
    { label: 'Producer', value: film.producer },
    { label: 'Release Date', value: film.release_date },
    { label: 'Episode Number', value: film.episode_id },
    { label: 'Opening Crawl', value: film.opening_crawl },
  ];

  return <DetailCard title={film.title} details={details} isLoading={isLoading} error={error} />;
};

export default FilmDetailPage;
