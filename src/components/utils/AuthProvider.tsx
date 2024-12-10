import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    username: string;
    role: string;
}

interface AuthContextType {
    user: DecodedToken | null;
    setUser: React.Dispatch<React.SetStateAction<DecodedToken | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<DecodedToken | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                console.log("Decoded token:", decoded); // Log decoded token for debugging
                setUser({
                    username: decoded.username,
                    role: decoded.role,
                });
            } catch (error) {
                console.error("Invalid token", error);
            }
        } else {
            console.error("Token not found in localStorage");
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
