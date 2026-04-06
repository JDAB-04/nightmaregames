//Client Component porque usa el store y useRouter
'use client';

import { useAuthStore } from '@/app/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

//Si el usuario no está autenticado lo redirige al login
export default function RutaProtegida({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    //Mientras realiza la verificación muestra un spinner de carga
    if (!isAuthenticated) {
        return null;
    }

    //Si está autenticado muestra la página
    return <>{children}</>;
}