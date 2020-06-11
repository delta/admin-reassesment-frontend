import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
    loading: false
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const toggleLoading = () => {
        dispatch({
            type: 'TOGGLE_LOADING'
        })
    }
  
  
    return (<GlobalContext.Provider value={{
        loading: state.loading,
        toggleLoading
    }}>
      {children}
    </GlobalContext.Provider>);
  }

