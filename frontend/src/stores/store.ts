import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth';
import toasterNotifReducer from './slice/toasterNotif';
import userProfilReducer from './slice/userProfil';
import currentConversationReducer from './slice/userProfil';

const store = configureStore({
  reducer: {
    auth: authReducer,
    showToaster: toasterNotifReducer,
    userProfil: userProfilReducer,
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
