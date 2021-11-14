import React from 'react';

import { Typography, Box, Button } from '@material-ui/core';

// @ts-ignore
import { FormValuesContextType } from '../contexts/form-values';
import { FormSubmitContextType } from '../contexts/form-submit';

export const Success: React.FC<FormValuesContextType & FormSubmitContextType> =
  ({ formValues, formValuesDispatch, formSubmitDispatch }) => {
    return (
      <>
        <Box mb={2}>
          <Typography variant="h4">Your Journey was created!</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Journey Origin</Typography>
          <Typography>{formValues.journeyOriginText}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Journey Destination</Typography>
          <Typography>{formValues.journeyDestText}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Departure Date</Typography>
          <Typography>{formValues.departureDate}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Departure Time</Typography>
          <Typography>{formValues.departureTime}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Return Date</Typography>
          <Typography>{formValues.returnDate}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Return Time</Typography>
          <Typography>{formValues.returnTime}</Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            formValuesDispatch({ type: 'resetState' });
            formSubmitDispatch({ type: 'resetState' });
          }}
        >
          Create Another
        </Button>
      </>
    );
  };
