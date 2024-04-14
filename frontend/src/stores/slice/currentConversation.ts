import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentConversationState {
  conversationId: number | null;
}

const initialState: CurrentConversationState = {
  conversationId: null,
};

const currentConversationSlice = createSlice({
  name: 'currentConversation',
  initialState,
  reducers: {
    setCurrentConversation: (state, action: PayloadAction<number>) => {
      state.conversationId = action.payload;
    },
    clearCurrentConversation: (state) => {
      state.conversationId = null;
    },
  },
});

export const { setCurrentConversation, clearCurrentConversation } = currentConversationSlice.actions;
export default currentConversationSlice.reducer;
