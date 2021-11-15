import React from 'react';

import { Helmet } from 'react-helmet';

import { Container, Grid, Typography, Box } from '@material-ui/core';

import { useFormValuesContext } from '../contexts/form-values';
import { useLocationOptionsContext } from '../contexts/location-options';
import { useFormSubmitContext } from '../contexts/form-submit';

import { Form } from './Form';
import { Map } from './Map';
import { Success } from './Success';
import { NavBar } from '../components/NavBar';

export const View = () => {
  const { formValues, formValuesDispatch } = useFormValuesContext();
  const { locationOptions, locationOptionsDispatch } =
    useLocationOptionsContext();
  const { formSubmit, formSubmitDispatch } = useFormSubmitContext();

  const showMap = Boolean(
    formValues.journeyOriginLat && formValues.journeyDestLat,
  );
  const success = formSubmit.success;
  return (
    <>
      <Helmet>
        <title>Create a new Journey - Liftshare</title>
      </Helmet>
      <Box mb={2}>
        <NavBar />
      </Box>

      <Container>
        {success && (
          <Success
            formValues={formValues}
            formValuesDispatch={formValuesDispatch}
            formSubmit={formSubmit}
            formSubmitDispatch={formSubmitDispatch}
          />
        )}
        {!success && (
          <>
            <Box mb={2}>
              <Typography variant="h4">Create a new Journey</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item md={4}>
                <Form
                  formValues={formValues}
                  formValuesDispatch={formValuesDispatch}
                  locationOptions={locationOptions}
                  locationOptionsDispatch={locationOptionsDispatch}
                  formSubmit={formSubmit}
                  formSubmitDispatch={formSubmitDispatch}
                />
              </Grid>
              <Grid item md={8}>
                {showMap && (
                  <Map
                    origin={{
                      lat: formValues.journeyOriginLat,
                      long: formValues.journeyOriginLong,
                    }}
                    dest={{
                      lat: formValues.journeyDestLat,
                      long: formValues.journeyDestLong,
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </>
  );
};
