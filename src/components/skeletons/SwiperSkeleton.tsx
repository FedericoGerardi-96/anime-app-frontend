'use client';
import { Skeleton } from '@nextui-org/react';

export const SwiperSkeleton = () => {
  return (
    <div className='flex justify-center gap-6'>
      <div>
        <Skeleton className='w-32 h-40 rounded-md' />
        <Skeleton className='flex rounded-lg w-full h-2 mt-2' />
      </div>
      <div>
        <Skeleton className='w-32 h-40 rounded-md xl:block hidden' />
        <Skeleton className='flex rounded-lg w-full h-2 mt-2' />
      </div>
      <div>
        <Skeleton className='w-32 h-40 rounded-md xl:block hidden' />
        <Skeleton className='flex rounded-lg w-full h-2 mt-2' />
      </div>
      <div>
        <Skeleton className='w-32 h-40 rounded-md lg:block hidden' />
        <Skeleton className='flex rounded-lg w-full h-2 mt-2' />
      </div>
      <div>
        <Skeleton className='w-32 h-40 rounded-md md:block hidden' />
        <Skeleton className='flex rounded-lg w-full h-2 mt-2' />
      </div>
      <div>
        <Skeleton className='w-32 h-40 rounded-md sm:block hidden' />
        <Skeleton className='flex rounded-lg w-full h-2 mt-2' />
      </div>
    </div>
  );
};
