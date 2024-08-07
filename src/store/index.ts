import { configureStore } from '@reduxjs/toolkit';

import swapiReducer from '../features/swapi/swapiReducer';
import swapiRequestItemMiddleware from './middlewares/swapiRequestItemMiddleware';
import { connect } from 'pwa-helpers';
import { LitElement } from 'lit';

const store = configureStore({
  reducer: {
    swapi: swapiReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(swapiRequestItemMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export const ConnectedLitElement = connect(store)(LitElement);

export default store;
