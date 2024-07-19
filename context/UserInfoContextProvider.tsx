"use client";

import { Dispatch, createContext, useState } from "react";

type UserInfoContextType = {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};

const initialState: UserInfoContextType = {
  userId: "",
  setUserId: () => {},
};

export const UserInfoContext = createContext<UserInfoContextType>(initialState);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string>("");

  return (
    <UserInfoContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserContextProvider;
