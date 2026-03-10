'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
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
                fontSize: '18px',
                fontWeight: 900,
                color: '#00ff88',
                letterSpacing: '2px',
            }}>
                GAMEVAULT
            </Link>

            <div style={{ display: 'flex', gap: '32px' }}>
                {[
                    { href: '/', label: 'Inicio' },
                    { href: '/catalog', label: 'Catálogo' },
                ].map(({ href, label }) => (
                    <Link key={href} href={href} style={{
                        fontSize: '13px',
                        color: pathname === href ? '#00ff88' : '#7d8b9c',
                        borderBottom: pathname === href ? '2px solid #00ff88' : '2px solid transparent',
                        paddingBottom: '4px',
                        transition: 'color 0.2s',
                    }}>
                        {label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}