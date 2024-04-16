import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotiState {
  username: string | null;
  message: string | null;
  photo: {
    type: 'Buffer';
    data: number[];
  } | null;
}

const initialState: NotiState = {
  username: null,
  message: null,
  photo: null,
};

const NotifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<{
        username: string;
        message: string;
        photo: { type: 'Buffer'; data: number[] };
      }>
    ) => {
      state.username = action.payload.username;
      state.message = action.payload.message;
      state.photo = action.payload.photo;
    },
    clearNotification: state => {
      state.username = null;
      state.message = null;
      state.photo = null;
    },
  },
});

export const { setNotification, clearNotification } = NotifSlice.actions;
export default NotifSlice.reducer;
