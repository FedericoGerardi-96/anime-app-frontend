import { Datum, ISeasonAnime } from '../../interface';

const urlBase = `${process.env.NEXT_PUBLIC_BASE_URL_BACK_END}/my-anime-list`;

const GetAnimeSeason = async (endpoint: string): Promise<ISeasonAnime> => {
  try {
    const resp = await fetch(`${urlBase}${endpoint}`, {
      cache: 'no-store',
      method: 'POST',
    });
    if (!resp.ok) {
      throw new Error('Error to get anime season');
    }
    return resp.json();
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
};

const GetAnimeTheDailyOfTheSeason = async (): Promise<Datum[]> => {
  try {
    const resp = await fetch(`${urlBase}/get-anime-day-of-the-season`, {
      cache: 'no-store',
      method: 'GET',
    });
    if (!resp.ok) {
      throw new Error('Error to get anime season');
    }
    const data: ISeasonAnime = await resp.json();

    if (!data) throw new Error('Error to get anime season');
    return data.data;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
};

export { GetAnimeSeason, GetAnimeTheDailyOfTheSeason };
