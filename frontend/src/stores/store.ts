import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import authReducer from './slice/auth';
import toasterNotifReducer from './slice/toasterNotif';
import userIdReducer from './slice/userId';
import currentConversationReducer from './slice/currentConversation';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'currentConversation', 'userId'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  showToaster: toasterNotifReducer,
  userId: userIdReducer,
  currentConversation: currentConversationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
