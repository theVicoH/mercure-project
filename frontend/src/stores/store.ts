import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth';
import toasterNotifReducer from './slice/toasterNotif';
import userProfilReducer from './slice/userProfil';
import currentConversationReducer from './slice/currentConversation';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = {
  auth: persistReducer(persistConfig, authReducer),
  showToaster: toasterNotifReducer,
  userProfil: userProfilReducer,
  currentConversation: currentConversationReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
