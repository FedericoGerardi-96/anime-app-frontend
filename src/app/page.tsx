import { Suspense } from 'react';
import { SeasonAnimeBanner } from '../components';
import { SwiperSkeleton } from '../components';

export default function Home() {
  return (
    <main
      data-testid='home-page'
      className='min-h-screen container mx-auto px-10'>
      <Suspense fallback={<SwiperSkeleton />}>
        <SeasonAnimeBanner />
      </Suspense>
    </main>
  );
}
