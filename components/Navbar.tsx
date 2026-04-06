'use client';

import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';

export default function Navbar() {
    const { isAuthenticated, user } = useAuthStore();
    const pathname = usePathname();

    return (
        <nav style={{
            backgroundColor: 'rgba(8,12,16,0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid #1e2d3d',
            padding: '0 32px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}>
            <Link href="/" style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: '25px',
                fontWeight: 900,
                color: '#00ff88',
                letterSpacing: '2px',
            }}>
                NIGHTMARE GAMES
            </Link>

            <div style={{ display: 'flex', gap: '32px' }}>
                {[
                    { href: '/', label: 'Inicio' },
                    { href: '/catalog', label: 'Catálogo' },
                ].map(({ href, label }) => (
                    <Link key={href} href={href} style={{
                        fontSize: '15px',
                        fontWeight: 'bold',
                        color: pathname == href ? '#00ff88' : '#e6edf3',
                        borderBottom: pathname === href ? '2px solid #00ff88' : '2px solid transparent',
                        paddingBottom: '4px',
                        transition: 'color 0.2s',
                    }}>
                        {label}
                    </Link>
                ))}
            </div>
            {isAuthenticated ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: '#7d8b9c', fontSize: '12px' }}>
                        👾 {user?.username}
                    </span>
                    <LogoutButton />
                </div>
            ) : (
                <Link href="/login" style={{
                    padding: '6px 16px',
                    backgroundColor: '#00ff88',
                    color: '#080c10',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 700,
                }}>
                    Iniciar sesión
                </Link>
            )}
        </nav >
    );
}