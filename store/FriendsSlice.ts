import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type FriendsType = {
  friends: {
    name: string | null;
    id: string;
    email: string;
    image: string | null;
  }[];
};

const initialState: FriendsType = {
  friends: [],
};

export const FriendsListSlice = createSlice({
  name: "friend list",
  initialState,

  reducers: {
    addFriend: (
      state,
      action: PayloadAction<{
        name: string | null;
        id: string;
        email: string;
        image: string | null;
      }>
    ) => {
      state.friends.push(action.payload);
    },

    addFriends: (
      state,
      action: PayloadAction<
        {
          name: string | null;
          id: string;
          email: string;
          image: string | null;
        }[]
      >
    ) => {
      state.friends = [...action.payload];
    },
  },
});

export const { addFriend,addFriends } = FriendsListSlice.actions;

export default FriendsListSlice.reducer;
