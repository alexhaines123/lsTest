import React, { useCallback, useState, memo } from 'react';

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import { Box } from '@material-ui/core';

const { REACT_APP_GOOGLE_API_KEY } = process.env;

if (!REACT_APP_GOOGLE_API_KEY) {
  throw new Error('Env vars not defined');
}

interface MapProps {
  origin: {
    lat: number;
    long: number;
  };
  dest: {
    lat: number;
    long: number;
  };
}

const containerStyle = {
  //   width: '400px',
  height: '95vh',
};

const center = ({ origin, dest }: MapProps) => {
  if (origin.lat) {
    return {
      lat: origin.lat,
      lng: origin.long,
    };
  }
};

export const Map: React.FC<MapProps> = memo(({ origin, dest }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_GOOGLE_API_KEY,
  });

  const [map, setMap] = useState<any>(null);

  const onLoad = useCallback(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      map.fitBounds(bounds);
      setMap(map);
    }
  }, [map]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <>
      {isLoaded && (
        <>
          <Box mt={2} mb={2}>
            <GoogleMap
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
              center={center({ origin, dest })}
              mapContainerStyle={containerStyle}
            >
              {origin.lat && origin.long && (
                <Marker position={{ lat: origin.lat, lng: origin.long }} />
              )}
              {dest.lat && dest.long && (
                <Marker position={{ lat: dest.lat, lng: dest.long }} />
              )}
            </GoogleMap>
          </Box>
        </>
      )}
    </>
  );
});
