import React, { createContext, useContext, useReducer } from 'react';

import { Record } from 'immutable';

import { FormValuesContext } from '../types/contexts';

const initialContext: FormValuesContext = {
  departureDate: '',
  departureTime: '',
  returnDate: '',
  returnTime: '',

  journeyOriginText: '',
  journeyOriginLong: '',
  journeyOriginLat: '',

  journeyDestText: '',
  journeyDestLong: '',
  journeyDestLat: '',
};

type ActionTypes = 'change';
type ContextRecordType = typeof ContextRecordInst;

interface ActionResult {
  type: ActionTypes;
  field: keyof FormValuesContext;
  value: string;
}

interface ContextType {
  state: ContextRecordType;
  dispatch: (opts: ActionResult) => void;
}

const ContextRecord = Record(initialContext);
const ContextRecordInst = new ContextRecord();
const Context = createContext<ContextType>(undefined);

const Reducer = (state: ContextRecordType, action: ActionResult) => {
  switch (action.type) {
    case 'change':
      return state.set(action.field, action.value);
    default:
      throw new Error('Unsupported action type');
  }
};

export const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, ContextRecordInst);

  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useFormValuesContext = () => useContext(Context);

export default useFormValuesContext;
