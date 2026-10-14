import { useEffect, useState, type ReactElement } from "react";
import type { UserI } from "../interfaces/userI";
import { authServices } from "../services/authService";
import { authContext } from "./authContext";
import { queryClient } from "./queryClientProvider";


export default function AuthContextProvider({ children, }: { children: ReactElement }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<UserI | undefined>();
    const [isLoading, setIsLoading] = useState(() => {
        return !!localStorage.getItem('token');
    });


    useEffect(() => {
        if (localStorage.getItem('token')) {
            async function restoreSession() {
                try {
                   await initializeSession();
                } catch {
                    setIsLoggedIn(false);
                    localStorage.removeItem('token')
                } finally {
                    setIsLoading(false);
                }
            }
            restoreSession()
        }
    }, []);

    function logout() {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserData(undefined);
        queryClient.clear();
        
    }

    async function initializeSession(){
        const {data} =  await authServices.getUserData();
        setUserData(data.user);
        setIsLoggedIn(true);
    }

    return (
        <authContext.Provider value={{ isLoggedIn, isLoading, setIsLoggedIn, userData, logout, initializeSession }}>
            {children}
        </authContext.Provider>
    )
}
