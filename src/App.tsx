import React from 'react';

import { FormValuesProvider } from './contexts/form-values';
import { LocationOptionsProvider } from './contexts/location-options';
import { FormSubmitProvider } from './contexts/form-submit';

import './App.css';

import { View } from './containers/View';

const App: React.FC = () => {
  return (
    <>
      <FormSubmitProvider>
        <FormValuesProvider>
          <LocationOptionsProvider>
            <View />
          </LocationOptionsProvider>
        </FormValuesProvider>
      </FormSubmitProvider>
    </>
  );
};

export default App;
