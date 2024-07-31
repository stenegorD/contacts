import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { contactsApi } from "./reducers/contacts/api";


const rootReducer = combineReducers({
    // contacts: contactsSlice.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
});



export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            contactsApi.middleware,
        )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
