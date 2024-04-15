import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@/types/types';

const initialState: AuthState = {
  jwt: undefined,
  expiration: undefined,
};

const isTokenExpired = (expiration: number | undefined): boolean => {
  return expiration ? Date.now() > expiration : true;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setJwtToken: (
      state,
      action: PayloadAction<{ jwt: string; expiration: number }>
    ) => {
      state.jwt = action.payload.jwt;
      state.expiration = action.payload.expiration;
    },
    removeJwtToken: state => {
      state.jwt = undefined;
      state.expiration = undefined;
    },
    checkAndRemoveExpiredToken: state => {
      if (isTokenExpired(state.expiration)) {
        state.jwt = undefined;
        state.expiration = undefined;
      }
    },
  },
});

export const { setJwtToken, removeJwtToken, checkAndRemoveExpiredToken } = authSlice.actions;

export default authSlice.reducer;
