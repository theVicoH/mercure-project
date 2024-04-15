import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  jwt?: string;
  expiration?: number;
}

const initialState: AuthState = {
  jwt: undefined,
  expiration: undefined,
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
  },
});

export const { setJwtToken, removeJwtToken } = authSlice.actions;
export default authSlice.reducer;
