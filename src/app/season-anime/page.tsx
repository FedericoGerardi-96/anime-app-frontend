import { Suspense } from 'react';
import {
  DayAnimeList,
  SeasonAnimeTable,
  SwiperSkeleton,
} from '../../components';

export const metadata = {
  title: 'Season Animes',
  description: 'Season Animes List',
};

const SeasonAnime = async () => {
  // const dayAnimesList = await getDayAnimeSeason();

  return (
    <main className='mx-auto container px-6 py-4'>
      <h1 className='mb-10'>Season Animes</h1>
      <Suspense fallback={<SwiperSkeleton />}>
        <SeasonAnimeTable />
      </Suspense>
      <Suspense fallback={<SwiperSkeleton />}>
        <DayAnimeList />
      </Suspense>
    </main>
  );
};

export default SeasonAnime;
