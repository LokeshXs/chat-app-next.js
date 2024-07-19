import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ChatMessage {
  
    message: string;
    recepientId: string;
    senderId: string;
    timeDate: string;
}

export interface ChatObjectState {
  chatMessages: ChatMessage[];

  recepientId: string;
}

const initialState: ChatObjectState = {
  chatMessages: [],
  recepientId: "",
};

export const ChatObjectSlice = createSlice({
  name: "chat object",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.chatMessages.push(action.payload);
    },
    addMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      console.log(action.payload);
     state.chatMessages =  state.chatMessages.concat(action.payload)
    },
    setRecepient: (state, action: PayloadAction<string>) => {
      state.recepientId = action.payload;
    },
  },
});

export const { addMessage,addMessages, setRecepient } = ChatObjectSlice.actions;
export default ChatObjectSlice.reducer;
