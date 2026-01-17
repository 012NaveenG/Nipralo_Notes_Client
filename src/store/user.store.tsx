import { createContext, useContext, useEffect, useState } from "react";
import { logoutUser } from "../api/user.api";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

// types/user.types.ts
export interface User {
    id: number;
    name: string;
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: React.ReactNode;
}

const LOCAL_STORAGE_KEY = "auth_user";

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    // ✅ Load user from localStorage on app start
    useEffect(() => {
        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // ✅ Save user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
    }, [user]);

    const logout = async () => {
        try {
            setUser(null);
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            const message = await logoutUser()
            toast.success(message)
        } catch (error) {
            const err = error as AxiosError<any>
            toast.error(err.message)
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
