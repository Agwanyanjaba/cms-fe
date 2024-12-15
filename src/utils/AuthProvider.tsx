import React, { createContext, useContext, useState } from "react";

interface User {
    username: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (newUser: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("username");
        console.log("Initializing user from localStorage:", savedUser);
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (newUser: User) => {
        console.log("Logging in user:", newUser);
        setUser(newUser);
        localStorage.setItem("username", JSON.stringify(newUser));
    };

    const logout = () => {
        console.log("Logging out user...");
        setUser(null);
        localStorage.removeItem("username");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
