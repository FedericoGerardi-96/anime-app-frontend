import { Datum, ISeasonAnime } from '../../interface';
import { GetAnimeSeason, GetAnimeTheDailyOfTheSeason } from '../../adapter';

// const getByName = async (name: string) => {
//   const anime = await myAnimeListAdapter.GetAnimeSeason(
//     `/anime?q=${name}&limit=10`
//   );
//   return anime;
// };

const getDayAnimeSeason = async (): Promise<Datum[]> => {
  const seasonAnime: Datum[] = await GetAnimeTheDailyOfTheSeason();
  return seasonAnime;
};

const getAnimeSeason = async (url: string): Promise<ISeasonAnime> => {
  const seasonAnime: ISeasonAnime = await GetAnimeSeason(
    `/get-anime-season${url}`
  );  
  return seasonAnime;
};

export { getAnimeSeason, getDayAnimeSeason };
