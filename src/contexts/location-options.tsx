import React, { createContext, useContext, useReducer } from 'react';

import { Record } from 'immutable';

import { getPlacesAutocomplete } from '../apis/';

import { LocationOptionsContext } from '../types/contexts';

const initialContext: LocationOptionsContext = {
  loading: false,
  error: false,
  data: [],
  data2: [],
};

type ActionTypes = 'data' | 'data2' | 'loading' | 'error' | 'resetState';
type Dispatch = (opts: Action) => void;
type ContextRecordType = typeof ContextRecordInst;

interface Action {
  type: ActionTypes;
  value?: any[] | boolean;
}

export interface LocationOptionsContextType {
  locationOptions: ContextRecordType;
  locationOptionsDispatch: Dispatch;
}

const ContextRecord = Record(initialContext);
const ContextRecordInst = new ContextRecord();
const Context = createContext<LocationOptionsContextType>(undefined!);

const Reducer = (state: ContextRecordType, action: Action) => {
  switch (action.type) {
    case 'loading':
      return state.set('loading', true);
    case 'error':
      return state.set('error', true);
    case 'data':
      // @ts-ignore
      return state.set('data', action.value);
    case 'data2':
      // @ts-ignore
      return state.set('data2', action.value);
    case 'resetState':
      return ContextRecordInst;
    default:
      throw new Error('Unsupported action type');
  }
};

export const loadLocationOptions = async (
  dispatch: Dispatch,
  input: string,
  type: 'data' | 'data2',
) => {
  dispatch({ type: 'loading', value: true });
  dispatch({ type: 'error', value: false });
  try {
    const res = await getPlacesAutocomplete({ input });
    dispatch({ type, value: res });
    dispatch({ type: 'loading', value: false });
  } catch (e) {
    dispatch({ type: 'error', value: true });
    dispatch({ type: 'loading', value: false });
  }
};

export const LocationOptionsProvider: React.FC = ({ children }) => {
  const [locationOptions, locationOptionsDispatch] = useReducer(
    Reducer,
    ContextRecordInst,
  );

  const value = { locationOptions, locationOptionsDispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useLocationOptionsContext = () => useContext(Context);
