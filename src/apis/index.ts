import axios from 'axios';
import { PlaceDetail } from '../types/models';

const { REACT_APP_BACKEND_API, REACT_APP_GOOGLE_API_KEY } = process.env;

if (!REACT_APP_BACKEND_API || !REACT_APP_GOOGLE_API_KEY) {
  throw new Error('Env vars not defined');
}

const ENDPOINTS = Object.freeze({
  GOOGLE_AUTOCOMPLETE:
    'https://maps.googleapis.com/maps/api/place/autocomplete/json',
  GOOGLE_PLACE_DETAILS:
    'https://maps.googleapis.com/maps/api/place/details/json',
  CREATE_JOURNEY: `${REACT_APP_BACKEND_API}/journey`,
});

type GetPlacesAutocomplete = (opts: {
  input: string;
}) => Promise<GetPlacesAutocomplete[]>;
export const getPlacesAutocomplete: GetPlacesAutocomplete = async ({
  input,
}) => {
  const url = new URL(ENDPOINTS.GOOGLE_AUTOCOMPLETE);

  url.searchParams.set('input', input);
  url.searchParams.set('inputtype', 'textquery');

  url.searchParams.set('key', REACT_APP_GOOGLE_API_KEY);
  
  const res = await axios.get(url.href);
  
  return res.data.predictions;
};

type GetPlace = (placeId: string) => Promise<PlaceDetail>;
export const getPlace: GetPlace = async (placeId) => {
  const url = new URL(ENDPOINTS.GOOGLE_PLACE_DETAILS);

  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'geometry');

  url.searchParams.set('key', REACT_APP_GOOGLE_API_KEY);

  const res = await axios.get(url.href);
  
  return res.data.result;
};

export const createJourney = async (opts: any) => {
  const url = new URL(ENDPOINTS.CREATE_JOURNEY);
  return await axios.post(url.href, opts);
};
