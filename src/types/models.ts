export interface PlacesAutocomplete {
  place_id: string;
  description: string;
}

export interface PlaceDetail {
  geometry: {
    location: {
      lat: string;
      lng: string;
    };
  };
}
