import React from 'react';

import styled from 'styled-components';

import { TextField as TextFieldMUI, Button } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';

const FADE_IN_CSS = `
  transition: opacity 3s;
  opacity: 0%;
  visibility: hidden;
`;

export const TextField = (params: any) => (
  <TextFieldMUI
    {...params}
    InputLabelProps={{ shrink: true }}
    margin="normal"
    variant="outlined"
    fullWidth
  />
);

export const FadeInTextField = styled(TextField)`
  ${FADE_IN_CSS}
  ${(props: any) =>
    props.display &&
    `
    opacity: 100%;
    visibility: visible
    `}
`;

export const FadeInAutocomplete = styled(Autocomplete)`
  ${FADE_IN_CSS}
  ${(props: any) =>
    props.display &&
    `
    opacity: 100%;
    visibility: visible
    `}
`;

export const FadeInButton = styled(Button)`
  ${FADE_IN_CSS}
  ${(props: any) =>
    props.display &&
    `
    opacity: 100%;
    visibility: visible
    `}
`;
