'use client';
import Image from 'next/image';
import { default as NextLink } from 'next/link';
import useSWR from 'swr';
import { Card, CardHeader, CardBody } from '@nextui-org/react';

import { ISeasonAnime } from '../../interface';

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const DayAnimeList = () => {
  const { data, isLoading, error } = useSWR<ISeasonAnime>(
    'http://localhost:3001/my-anime-list/get-anime-day-of-the-season',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const today = new Date();
  const dayName = daysOfWeek[today.getDay()];
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Error to get animes...</p>;
  return (
    <section className='mt-8' id='animesOfTheDay'>
      <h2 className='mb-8'>Animes on day: {dayName}</h2>
      <div className='flex flex-wrap items-center justify-center gap-6'>
        {data.data.map((anime) => (
          <Card
            key={anime.mal_id}
            className='p-4 w-72 h-[24rem] flex items-center justify-center'>
            <CardHeader className='pb-0 pt-2 px-4 flex-col h-1/4 text-center'>
              <NextLink href={`/anime/${anime.mal_id}`}>
                <h4 className='font-bold'>{anime.title}</h4>
              </NextLink>
              <NextLink href={`/anime/${anime.mal_id}`}>
                <p className='text-tiny uppercase font-bold'>
                  {anime.title_japanese}
                </p>
              </NextLink>
            </CardHeader>
            <CardBody className='overflow-visible py-2 h-3/4'>
              <NextLink href={`/anime/${anime.mal_id}`}>
                <Image
                  draggable={false}
                  alt={anime.title}
                  className='object-cover rounded-xl w-full h-60'
                  src={anime.images.webp.large_image_url}
                  width={270}
                  height={270}
                />
              </NextLink>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};
