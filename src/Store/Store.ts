import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore, Tuple } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';

import weatherReducer from './weatherSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['GeneralData'],
};

const rootReducer = combineReducers({
  Weather: weatherReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => new Tuple(logger),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
