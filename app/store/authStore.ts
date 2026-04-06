import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    username: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;

    //Acciones: login - logout
    login: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    //Persist guarda el estado en localStorage automáticamente
    persist((set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        //Guarda el usuario y el token al hacer login
        login: (user, token) =>
            set({ user, token, isAuthenticated: true }),

        //Limpia todo al hacer logout
        logout: () =>
            set({ user: null, token: null, isAuthenticated: false }),
    }),
        {
            //Nombre de la clave en localStorage
            name: 'auth-storage',
        }
    )
);
