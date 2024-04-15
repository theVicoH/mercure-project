import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserId } from '@/types/types';


const initialState: UserId = {
  id: undefined,
};

const userId = createSlice({
  name: 'userProfil',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<UserId>) => {
      state.id = action.payload.id;
  
    },
    clearUserId: (state) => {
      state.id = undefined;
    },
  },
});

export const { setUserId, clearUserId } = userId.actions;
export default userId.reducer;
