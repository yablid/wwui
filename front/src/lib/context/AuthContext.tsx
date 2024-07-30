// src/lib/context/AuthContext.tsx
import React, {
    createContext,
    useMemo, useState,
    ReactNode,
    useCallback,
    useEffect
} from 'react';
import { UserData } from '@appTypes/types';
import axiosInstance from '@lib/api/axiosInstance';

type IAuthContext = {
    userData: UserData | null;
    setUserData: (userData: UserData | null) => void;
    handleLogout: () => void;
}

const defaultAuthContext: IAuthContext = {
    userData: null,
    setUserData: () => {},
    handleLogout: () => {}
};

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  console.log("Loading AuthProvider...");

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
      console.log("authContext userData changed: ", userData);
  }, [userData]);

  const handleLogout = useCallback(async () => {
    console.log("Sending logout with userData", userData);
    await axiosInstance.post('api/logout');
    setUserData(null);
    localStorage.removeItem('accessToken');
  }, [userData]);

  const value = useMemo(() => ({
    userData,
    setUserData,
    handleLogout
  }), [userData, handleLogout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthContext, useAuth };
