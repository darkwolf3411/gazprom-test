import { personApi } from './../services/person';
import { configureStore, combineReducers, MiddlewareArray, getDefaultMiddleware} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    [personApi.reducerPath]: personApi.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(personApi.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']