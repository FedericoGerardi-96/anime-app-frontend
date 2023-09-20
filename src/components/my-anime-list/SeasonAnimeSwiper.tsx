'use client';
import { default as NextLink } from 'next/link';
import Image from 'next/image';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Autoplay]);
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Divider, Link } from '@nextui-org/react';

import { ISeasonAnime } from '../../interface';

type props = {
  seasonAnime: ISeasonAnime;
};

export const SeasonAnimeSwiper = async ({ seasonAnime }: props) => {
  return (
    <section id='seasonAnimeBanner' className='my-20'>
      <h2 className='text-2xl font-bold my-6'>Animes of the season</h2>
      {seasonAnime && (
        <Swiper
          slidesPerView={1}
          spaceBetween={5}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={true}
          modules={[Pagination, Navigation]}
          className='mySwiper px-10'>
          {seasonAnime.data.map((anime, i) => (
            <SwiperSlide key={i}>
              <div className='flex flex-col gap-4 text-center justify-center items-center'>
                <Image
                  width={300}
                  height={400}
                  className='object-cover'
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                />
                <NextLink
                  href={`/anime/${anime.mal_id}`}
                  passHref
                  legacyBehavior>
                  <Link className='overflow-hidden overflow-ellipsis text-white whitespace-break-spaces max-w-full'>
                    {anime.title}
                  </Link>
                </NextLink>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <Divider className='my-8' orientation='horizontal' />
      <div className='w-full text-end'>
        <NextLink href='/season-anime' passHref legacyBehavior>
          <Link className='text-'>See more...</Link>
        </NextLink>
      </div>
    </section>
  );
};
