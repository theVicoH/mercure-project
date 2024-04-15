import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth';
import toasterNotifReducer from './slice/toasterNotif';
import userIdReducer from './slice/userId';
import currentConversationReducer from './slice/currentConversation';


const store = configureStore({
  reducer: {
    auth: authReducer,
    showToaster: toasterNotifReducer,
    userId: userIdReducer,
    currentConversation: currentConversationReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
