import { getAnimeSeason } from '../../services/myAnimeList/myAnimeList.service';
import { SeasonAnimeSwiper } from '..';

const getSeasonAnimes = async () => {
  const seasonAnime = await getAnimeSeason('/1/10');
  return seasonAnime;
};

export const SeasonAnimeBanner = async () => {
  const seasonAnime = await getSeasonAnimes();
  return (
    <div>
      <SeasonAnimeSwiper seasonAnime={seasonAnime} />
    </div>
  );
};
