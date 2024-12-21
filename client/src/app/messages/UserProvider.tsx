"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the context
interface UserContextType {
  selectedUserId: string | null;
  setSelectedUserId: (userId: string) => void;

  username: string | null;
  setUsername: (username: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ selectedUserId, setSelectedUserId, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};