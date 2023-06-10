import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '111-12-56' },
    { id: 'id-2', name: 'Tony Kline', number: '222-89-12' },
    { id: 'id-3', name: 'Leha Kline', number: '333-89-12' },
    { id: 'id-4', name: 'Bary Kline', number: '444-89-12' },
    { id: 'id-5', name: 'Gery Kline', number: '555-89-12' },
  ],
  filter: '',
};

const persistConfig = {
  key: 'phoneBook',
  storage,
};

export const phoneBookSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContact: (state, action) => {
      return { ...state, contacts: [...state.contacts, action.payload] };
    },
    deleteContact: (state, action) => {
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        ),
        filter: state.filter === action.payload ? '' : state.filter,
      };
    },
    filter: (state, action) => {
      if (action.payload === '') {
        return { ...state, filter: '' };
      }
      return {
        ...state,
        filter: action.payload.toLowerCase(),
      };
    },
  },
});

export const contactReducer = phoneBookSlice.reducer;
export const { addContact, deleteContact, filter } = phoneBookSlice.actions;

const persistedReducer = persistReducer(persistConfig, contactReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
