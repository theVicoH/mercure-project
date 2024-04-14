import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfilInfo } from '@/types/types';

const initialState: UserProfilInfo = {
  id: undefined,
  username: undefined,
  photo: undefined,
  createdAt: undefined,
};

const userProfil = createSlice({
  name: 'userProfil',
  initialState,
  reducers: {
    setUserProfil: (state, action: PayloadAction<UserProfilInfo>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.photo = action.payload.photo;
      state.createdAt = action.payload.photo;
    },
    clearUserProfil: state => {
      state.id = undefined;
      state.username = undefined;
      state.photo = undefined;
      state.createdAt = undefined;
    },
  },
});

export const { setUserProfil, clearUserProfil } = userProfil.actions;
export default userProfil.reducer;
