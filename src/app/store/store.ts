import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { testSlice } from '../../features/scratch/testSlice';
import { eventSlice } from '../../features/events/form/eventSlice';
import { modalSlice } from '../common/modals/modalSlice';
import { authSlice } from '../../features/auth/authSlice';
import { profileSlice } from '../../features/profiles/profileSlice';
import { photoSlice } from '../../features/profiles/photoSlice';
import { followSlice } from '../../features/profiles/follow/followSlice';

export const store = configureStore({
  reducer: {
    test: testSlice.reducer,
    events: eventSlice.reducer,
    modal: modalSlice.reducer,
    auth: authSlice.reducer,
    profiles: profileSlice.reducer,
    photos: photoSlice.reducer,
    follows: followSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
