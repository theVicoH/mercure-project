import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfilInfo } from '@/types/types';

const storedPseudo = localStorage.getItem('pseudo');
const storedPhoto = localStorage.getItem('photo');

const initialState: UserProfilInfo = {
  pseudo: storedPseudo || undefined,
  photo: storedPhoto || undefined,
};

const userProfil = createSlice({
  name: 'userProfil',
  initialState,
  reducers: {
    setUserProfil: (state, action: PayloadAction<UserProfilInfo>) => {
      state.pseudo = action.payload.pseudo;
      state.photo = action.payload.photo;
      localStorage.setItem('pseudo', action.payload.pseudo || '');
      localStorage.setItem('photo', action.payload.photo || '');
    },
    clearUserProfil: state => {
      state.pseudo = '';
      state.photo = undefined;
      localStorage.removeItem('pseudo');
      localStorage.removeItem('photo');
    },
  },
});

export const { setUserProfil, clearUserProfil } = userProfil.actions;
export default userProfil.reducer;
