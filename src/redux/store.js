import { configureStore, Tuple } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'; // imports from redux-persist
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { generalReducer } from './general/generalSlice';

const persistConfig = {
    // configuration object for redux-persist
    key: 'root',
    storage, // define which storage to use
    transforms: [
        encryptTransform({
            secretKey: 'task',
            onError: function (error) {
                // Handle the error.
                console.log('error in encryptopn store', error);
            },
        }),
    ],
};

const rootReducer = combineReducers({
    general: generalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // create a persisted reducer

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: () => new Tuple(thunk),
});

const persistor = persistStore(store); // used to create the persisted store, persistore will be used in the next step

export { store, persistor };
