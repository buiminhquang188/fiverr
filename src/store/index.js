
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage";
import authReducer from "containers/shared/Auth/module/reducer";
import { USER_FIVER } from "containers/shared/Auth/module/types";

const rootReducer = combineReducers({
    authReducer,
});

const persistConfig = {
    key: USER_FIVER,
    storage,
    whitelist: ['authReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };