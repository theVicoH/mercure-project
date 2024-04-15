import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentConversationState {
  conversationId: number | null;
  friendUsername: string | null;
  friendPhoto: string | null;
}

const initialState: CurrentConversationState = {
  conversationId: null,
  friendUsername: null,
  friendPhoto: null,
};

const currentConversationSlice = createSlice({
  name: 'currentConversation',
  initialState,
  reducers: {
    setCurrentConversation: (
      state,
      action: PayloadAction<{
        conversationId: number;
        friendUsername: string;
        friendPhoto: string;
      }>
    ) => {
      (state.conversationId = action.payload.conversationId),
        (state.friendUsername = action.payload.friendUsername),
        (state.friendPhoto = action.payload.friendPhoto);
    },
    clearCurrentConversation: state => {
      state.conversationId = null;
      state.friendUsername = null;
      state.friendPhoto = null;
    },
  },
});

export const { setCurrentConversation, clearCurrentConversation } =
  currentConversationSlice.actions;
export default currentConversationSlice.reducer;
