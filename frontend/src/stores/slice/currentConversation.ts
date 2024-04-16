import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentConversationState {
  conversationId: number | null;
  friendId: number | null;
  friendUsername: string | null;
  friendPhoto: string | null;
}

const initialState: CurrentConversationState = {
  conversationId: null,
  friendId: null,
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
        friendId: number;
        friendUsername: string;
        friendPhoto: string;
      }>
    ) => {
      (state.conversationId = action.payload.conversationId),
        (state.friendId = action.payload.friendId),
        (state.friendUsername = action.payload.friendUsername),
        (state.friendPhoto = action.payload.friendPhoto);
    },
    clearCurrentConversation: state => {
      state.conversationId = null;
      state.friendId = null;
      state.friendUsername = null;
      state.friendPhoto = null;
    },
  },
});

export const { setCurrentConversation, clearCurrentConversation } =
  currentConversationSlice.actions;
export default currentConversationSlice.reducer;
