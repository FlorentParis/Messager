import {configureStore} from '@reduxjs/toolkit';
import channelReducer from '../features/ChannelSlice';
import userLoggedReducer from '../features/UserLoggedSlice';

export const store = configureStore({
  reducer: {
    userLogged: userLoggedReducer,
    channel: channelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
