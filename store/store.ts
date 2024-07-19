import { configureStore } from "@reduxjs/toolkit";
import chatObjectReducer from "./ChatSlice";
import friendsReducer from "./FriendsSlice";
import chatBarReducer from "./ChatBarSlice";

export const store = configureStore({
  reducer:{
    chatObject: chatObjectReducer,
    friends:friendsReducer,
    chatAppBar:chatBarReducer
  }
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
