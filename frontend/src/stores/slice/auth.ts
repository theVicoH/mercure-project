import { AuthState } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const storedToken = localStorage.getItem('authToken');
const storedExpiration = localStorage.getItem('authTokenExpiration');

const initialState: AuthState = {
  jwt: storedToken || undefined,
  expiration: storedExpiration ? parseInt(storedExpiration) : undefined,
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

      localStorage.setItem('authToken', action.payload.jwt || '');
      localStorage.setItem(
        'authTokenExpiration',
        action.payload.expiration.toString()
      );
    },
    removeJwtToken: state => {
      state.jwt = undefined;
      state.expiration = undefined;

      localStorage.removeItem('authToken');
      localStorage.removeItem('authTokenExpiration');
    },

    checkAndRemoveExpiredToken: state => {
      if (isTokenExpired(state.expiration)) {
        state.jwt = undefined;
        state.expiration = undefined;

        localStorage.removeItem('authToken');
        localStorage.removeItem('authTokenExpiration');
      }
    },
  },
});

export const { setJwtToken, removeJwtToken, checkAndRemoveExpiredToken } =
  authSlice.actions;

export default authSlice.reducer;
