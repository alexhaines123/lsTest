import React, { createContext, useContext, useReducer } from 'react';

import { Record } from 'immutable';

import { LocationOptionsContext } from '../types/contexts';

const initialContext: LocationOptionsContext = {
  loading: false,
  error: false,
  data: [],
  data2: [],
};

type ActionTypes = 'data' | 'data2' | 'loading' | 'error';
type ContextRecordType = typeof ContextRecordInst;

interface ActionResult {
  type: ActionTypes;
  value?: any[];
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
    case 'loading':
      return state.set('loading', true);
    case 'error':
      return state.set('error', true);
    case 'data':
      return state.set('data', action.value);
    case 'data2':
      return state.set('data2', action.value);
    default:
      throw new Error('Unsupported action type');
  }
};

export const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, ContextRecordInst);

  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useLocationOptionsContext = () => useContext(Context);

export default useLocationOptionsContext;
