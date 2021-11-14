import { PlacesAutocomplete } from './models';

export interface FormValuesContext {
  departureDate: string;
  departureTime: string;

  returnDate: string;
  returnTime: string;

  journeyOriginText: string;
  journeyOriginLong: number;
  journeyOriginLat: number;

  journeyDestText: string;
  journeyDestLong: number;
  journeyDestLat: number;
}

export interface LocationOptionsContext {
  loading: boolean;
  error: boolean;
  data: PlacesAutocomplete[];
  data2: PlacesAutocomplete[];
}

export interface FormSubmitContext {
  loading: boolean;
  error: boolean;
  success: boolean;
}
