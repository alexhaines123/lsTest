import React, { createContext, useContext, useReducer } from 'react';

import { Record } from 'immutable';

import { createJourney } from '../apis/';

import { FormSubmitContext, FormValuesContext } from '../types/contexts';

const initialContext: FormSubmitContext = {
  loading: false,
  error: false,
  success: false,
};

type ActionTypes = 'loading' | 'error' | 'success' | 'resetState';
type Dispatch = (opts: Action) => void;
type ContextRecordType = typeof ContextRecordInst;

interface Action {
  type: ActionTypes;
  value?: any[] | boolean;
}

export interface FormSubmitContextType {
  formSubmit: ContextRecordType;
  formSubmitDispatch: Dispatch;
}

const ContextRecord = Record(initialContext);
const ContextRecordInst = new ContextRecord();
const Context = createContext<FormSubmitContextType>(undefined!);

const Reducer = (state: ContextRecordType, action: Action) => {
  switch (action.type) {
    case 'loading':
      return state.set('loading', true);
    case 'error':
      return state.set('error', true);
    case 'success':
      return state.set('success', true);
    case 'resetState':
      return ContextRecordInst;
    default:
      throw new Error('Unsupported action type');
  }
};

export const submitForm = async (
  dispatch: Dispatch,
  formValues: FormValuesContext,
) => {
  dispatch({ type: 'loading', value: true });
  dispatch({ type: 'error', value: false });
  try {
    await createJourney(formValues);
    dispatch({ type: 'loading', value: false });
    dispatch({ type: 'success', value: true });
  } catch (e) {
    dispatch({ type: 'loading', value: false });
    dispatch({ type: 'success', value: true });
  }
};

export const FormSubmitProvider: React.FC = ({ children }) => {
  const [formSubmit, formSubmitDispatch] = useReducer(
    Reducer,
    ContextRecordInst,
  );

  const value = { formSubmit, formSubmitDispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useFormSubmitContext = () => useContext(Context);
