"use client"
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authsclice"; 
import {persistReducer,persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage";
import orgReducer from "./org/orgSlice"
import storyReducer from "./story/storySlice"
import postReducer from "../state/posts/postSlice"




const persistConfig=
{
    key:"root",
    storage,
    version:1

}

const persistedReducer = persistReducer(persistConfig,authReducer)
const rootReducer = combineReducers({
  auth:persistedReducer,
  org: orgReducer,
  story:storyReducer,
  post:postReducer,

})

export const store = configureStore({
  reducer:rootReducer
})
export  const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;