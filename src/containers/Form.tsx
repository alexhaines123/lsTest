import React from 'react';

import moment from 'moment';

import Autocomplete from '@mui/material/Autocomplete';

import {
  FormValuesContextType,
  handleJourneyChange,
} from '../contexts/form-values';

import {
  TextField,
  FadeInTextField,
  FadeInAutocomplete,
  FadeInButton,
} from '../components/FadeInInputs';

import {
  loadLocationOptions,
  LocationOptionsContextType,
} from '../contexts/location-options';

import { FormSubmitContextType, submitForm } from '../contexts/form-submit';

const errorDateField = ({ depTime, depDate, retTime, retDate }: any) => {
  if (depDate && retDate) {
    const moDepDate = moment(`${depDate}${depTime ? ` ${depTime}` : ''}`);
    const moRetDate = moment(`${retDate}${retTime ? ` ${retTime}` : ''}`);
    if (moRetDate.isBefore(moDepDate)) {
      return true;
    }
  }
  return false;
};

export const Form: React.FC<
  FormValuesContextType & LocationOptionsContextType & FormSubmitContextType
> = ({
  formValues,
  formValuesDispatch,
  locationOptions,
  locationOptionsDispatch,
  formSubmit,
  formSubmitDispatch,
}) => {
  const displayDateFields = Boolean(
    formValues.journeyDestText && formValues.journeyOriginText,
  );
  const displayDestination = Boolean(formValues.journeyOriginText);
  const displaySubmit = Boolean(
    displayDateFields &&
      formValues.departureDate &&
      formValues.departureTime &&
      formValues.returnDate &&
      formValues.returnTime,
  );

  const dateFieldError = errorDateField({
    depTime: formValues.departureTime,
    depDate: formValues.departureDate,
    retDate: formValues.returnDate,
    retTime: formValues.returnTime,
  });
  return (
    <>
      {/* {error && <Alert severity="error">Something went wrong!</Alert>} */}
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          submitForm(formSubmitDispatch, formValues);
        }}
      >
        <Autocomplete
          fullWidth
          autoComplete
          loading={locationOptions.loading}
          renderInput={(params: any) => (
            <TextField {...params} label="Journey Origin" />
          )}
          value={formValues.journeyOriginText}
          options={locationOptions.data.map((v) => v.description)}
          // @ts-ignore
          getOptionLabel={(option) => option}
          filterOptions={(x) => x}
          onInputChange={(evt, newValue) => {
            loadLocationOptions(locationOptionsDispatch, newValue, 'data');
          }}
          onChange={(evt, newValue) => {
            formValuesDispatch({
              type: 'change',
              field: 'journeyOriginText',
              // @ts-ignore
              value: newValue || '',
            });
            handleJourneyChange({
              // @ts-ignore
              value: newValue || '',
              locationOptions,
              journeyType: 'journeyOrigin',
              dispatch: formValuesDispatch,
            });
          }}
        />
        <FadeInAutocomplete
          fullWidth
          autoComplete
          renderInput={(params: any) => (
            <TextField {...params} label="Journey Destination" />
          )}
          display={displayDestination}
          value={formValues.journeyDestText}
          options={locationOptions.data2.map((v) => v.description)}
          // @ts-ignore
          getOptionLabel={(option) => option}
          filterOptions={(x) => x}
          onInputChange={(evt, newValue) => {
            loadLocationOptions(locationOptionsDispatch, newValue, 'data2');
          }}
          onChange={(evt, newValue) => {
            formValuesDispatch({
              type: 'change',
              field: 'journeyDestText',
              // @ts-ignore
              value: newValue || '',
            });
            handleJourneyChange({
              // @ts-ignore
              value: newValue || '',
              locationOptions,
              journeyType: 'journeyDest',
              dispatch: formValuesDispatch,
            });
          }}
        />
        <FadeInTextField
          label="Departure Date"
          type="date"
          display={displayDateFields}
          value={formValues.departureDate}
          onChange={(evt: any) =>
            formValuesDispatch({
              type: 'change',
              field: 'departureDate',
              value: evt.target.value,
            })
          }
        />
        <FadeInTextField
          label="Departure Time"
          type="time"
          display={displayDateFields}
          value={formValues.departureTime}
          onChange={(evt: any) =>
            formValuesDispatch({
              type: 'change',
              field: 'departureTime',
              value: evt.target.value,
            })
          }
        />
        <FadeInTextField
          label="Return Date"
          type="date"
          display={displayDateFields}
          value={formValues.returnDate}
          error={dateFieldError}
          helperText={
            dateFieldError && 'Return date must be before return date'
          }
          onChange={(evt: any) =>
            formValuesDispatch({
              type: 'change',
              field: 'returnDate',
              value: evt.target.value,
            })
          }
        />
        <FadeInTextField
          label="Return Time"
          type="time"
          display={displayDateFields}
          value={formValues.returnTime}
          error={dateFieldError}
          helperText={
            dateFieldError && 'Return date must be before return date'
          }
          onChange={(evt: any) =>
            formValuesDispatch({
              type: 'change',
              field: 'returnTime',
              value: evt.target.value,
            })
          }
        />
        <FadeInButton
          fullWidth
          type="submit"
          // @ts-ignore
          display={displaySubmit}
          variant="contained"
        >
          Submit
        </FadeInButton>
      </form>
    </>
  );
};
