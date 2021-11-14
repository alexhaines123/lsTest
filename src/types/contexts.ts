export interface FormValuesContext {
  departureDate: string;
  departureTime: string;

  returnDate: string;
  returnTime: string;

  journeyOriginText: string;
  journeyOriginLong: string;
  journeyOriginLat: string;

  journeyDestText: string;
  journeyDestLong: string;
  journeyDestLat: string;
}

export interface LocationOptionsContext {
  loading: boolean;
  error: boolean;
  data: any[];
  data2: any[];
}
