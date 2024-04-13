// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/types';

const storedToken = localStorage.getItem('authToken');
const storedExpiration = localStorage.getItem('authTokenExpiration');

const initialState: AuthState = {
  token: storedToken || undefined,
  expiration: storedExpiration ? parseInt(storedExpiration) : undefined,
};

const isTokenExpired = (expiration: number | undefined): boolean => {
  return expiration ? Date.now() > expiration : true;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setJwtToken: (state, action: PayloadAction<{ token: string; expiration: number }>) => {
      state.token = action.payload.token;
      state.expiration = action.payload.expiration;

      localStorage.setItem('authToken', action.payload.token || '');
      localStorage.setItem('authTokenExpiration', action.payload.expiration.toString());
    },
    removeJwtToken: (state) => {
      state.token = undefined;
      state.expiration = undefined;

      localStorage.removeItem('authToken');
      localStorage.removeItem('authTokenExpiration');
    },
    // Ajoutez une action pour vérifier et supprimer le jeton expiré
    checkAndRemoveExpiredToken: (state) => {
      if (isTokenExpired(state.expiration)) {
        state.token = undefined;
        state.expiration = undefined;

        localStorage.removeItem('authToken');
        localStorage.removeItem('authTokenExpiration');
      }
    },
  },
});

export const { setJwtToken, removeJwtToken, checkAndRemoveExpiredToken } = authSlice.actions;

export default authSlice.reducer;
