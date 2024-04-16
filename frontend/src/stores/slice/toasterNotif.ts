import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToasterNotiState {
  notification: string | null;
  isError: boolean;
}

const initialState: ToasterNotiState = {
  notification: null,
  isError: false,
};

const toasterNotifSlice = createSlice({
  name: 'toaster',
  initialState,
  reducers: {
    setToasterNotification: (
      state,
      action: PayloadAction<{ message: string; isError: boolean }>
    ) => {
      state.notification = action.payload.message;
      state.isError = action.payload.isError;
    },
    clearToasterNotification: state => {
      state.notification = null;
      state.isError = false;
    },
  },
});

export const { setToasterNotification, clearToasterNotification } = toasterNotifSlice.actions;
export default toasterNotifSlice.reducer;
