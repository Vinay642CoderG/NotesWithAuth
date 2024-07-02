import {createContext, useContext} from 'react'

const AppContext = createContext()

const AppContextProvider = AppContext.Provider;

const useAppContext = ()=>useContext(AppContext);

export {AppContext, AppContextProvider, useAppContext};