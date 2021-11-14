import React, { createContext, useContext, useReducer } from 'react';

import { Record } from 'immutable';

import { FormValuesContext, LocationOptionsContext } from '../types/contexts';
import { getPlace } from '../apis';

const initialContext: FormValuesContext = {
  departureDate: '',
  departureTime: '',
  returnDate: '',
  returnTime: '',

  journeyOriginText: '',
  journeyOriginLong: 0,
  journeyOriginLat: 0,

  journeyDestText: '',
  journeyDestLong: 0,
  journeyDestLat: 0,
};

type ActionTypes =
  | 'change'
  | 'journeyOriginChange'
  | 'journeyDestChange'
  | 'resetState';
type ContextRecordType = typeof ContextRecordInst;

interface ActionResult {
  type: ActionTypes;
  field?: keyof FormValuesContext;
  value?: string;
}

export interface FormValuesContextType {
  formValues: ContextRecordType;
  formValuesDispatch: (opts: ActionResult) => void;
}

const ContextRecord = Record(initialContext);
const ContextRecordInst = new ContextRecord();
const Context = createContext<FormValuesContextType>(undefined!);

const Reducer = (state: ContextRecordType, action: ActionResult) => {
  switch (action.type) {
    case 'change':
      return state.set(action.field!, action.value!);
    case 'resetState':
      return ContextRecordInst;
    default:
      throw new Error('Unsupported action type');
  }
};

export const handleJourneyChange = async ({
  value,
  locationOptions,
  journeyType,
  dispatch,
}: {
  value: string;
  locationOptions: LocationOptionsContext;
  journeyType: 'journeyOrigin' | 'journeyDest';
  dispatch: (opts: ActionResult) => void;
}) => {
  const dataType = journeyType === 'journeyOrigin' ? 'data' : 'data2';

  const place = locationOptions[dataType].find((v) => v.description === value);
  if (!place) {
    return;
  }
  const res = await getPlace(place.place_id);
  const latField =
    journeyType === 'journeyOrigin' ? 'journeyOriginLat' : 'journeyDestLat';
  const longField =
    journeyType === 'journeyOrigin' ? 'journeyOriginLong' : 'journeyDestLong';

  dispatch({
    type: 'change',
    field: latField,
    value: res.geometry.location.lat,
  });
  dispatch({
    type: 'change',
    field: longField,
    value: res.geometry.location.lng,
  });
};

export const FormValuesProvider: React.FC = ({ children }) => {
  const [formValues, formValuesDispatch] = useReducer(
    Reducer,
    ContextRecordInst,
  );

  const value = { formValues, formValuesDispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useFormValuesContext = () => useContext(Context);
