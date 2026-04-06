'use client'

import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    const { logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <button onClick={handleLogout} className="logout-btn" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            backgroundColor: 'transparent',
            border: '1px solid #1e2d3d',
            borderRadius: '4px',
            color: '#7d8b9c',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s',
        }}>
            <LogOut size={14} />
            Salir
        </button>
    );
}
