'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';

// ── Usuarios por defecto (siempre disponibles) ──
const DEFAULT_USERS = [
    { username: 'admin', email: 'admin@gmail.com', password: '1234' },
];

// Obtiene los usuarios guardados en localStorage + los por defecto
function getStoredUsers() {
    if (typeof window === 'undefined') return DEFAULT_USERS;

    const stored = localStorage.getItem('registered-users');
    const registeredUsers = stored ? JSON.parse(stored) : [];

    return [...DEFAULT_USERS, ...registeredUsers];
}

// Guarda un nuevo usuario en localStorage
function saveUser(username: string, email: string, password: string) {
    const stored = localStorage.getItem('registered-users');
    const registeredUsers = stored ? JSON.parse(stored) : [];

    registeredUsers.push({ username, email, password });
    localStorage.setItem('registered-users', JSON.stringify(registeredUsers));
}

// Simula login verificando contra localStorage
async function fakeAuthRequest(email: string, password: string) {
    await new Promise((res) => setTimeout(res, 800));

    const users = getStoredUsers();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) throw new Error('Credenciales incorrectas');

    const token = btoa(`${email}:${Date.now()}`);
    return { user: { username: user.username, email: user.email }, token };
}

// Simula registro guardando en localStorage
async function fakeRegisterRequest(username: string, email: string, password: string) {
    await new Promise((res) => setTimeout(res, 800));

    const users = getStoredUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) throw new Error('El email ya está registrado');

    saveUser(username, email, password);

    const token = btoa(`${email}:${Date.now()}`);
    return { user: { username, email }, token };
}

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuthStore();

    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        console.log('Usuarios guardados:', localStorage.getItem('registered-users'));

        try {
            let result;

            if (mode === 'login') {
                result = await fakeAuthRequest(email, password);
            } else {
                result = await fakeRegisterRequest(username, email, password);
            }

            // Guarda en Zustand (persiste en localStorage automáticamente)
            login(result.user, result.token);

            // Redirige al catálogo
            router.push('/catalog');

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error inesperado');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            backgroundImage: `
        linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)
      `,
            backgroundSize: '40px 40px',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                backgroundColor: '#0d1117',
                border: '1px solid #1e2d3d',
                borderRadius: '12px',
                padding: '40px',
            }}>
                <h1 style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: '22px',
                    color: '#00ff88',
                    letterSpacing: '2px',
                    textAlign: 'center',
                    marginBottom: '8px',
                }}>
                    NIGHTMAREGAMES
                </h1>
                <p style={{ color: '#7d8b9c', fontSize: '13px', textAlign: 'center', marginBottom: '32px' }}>
                    {mode === 'login' ? 'Inicia sesión para continuar' : 'Crea tu cuenta gratis'}
                </p>

                {/* Tabs */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    backgroundColor: '#111820',
                    borderRadius: '6px',
                    padding: '4px',
                    marginBottom: '28px',
                }}>
                    {(['login', 'register'] as const).map((m) => (
                        <button
                            key={m}
                            onClick={() => { setMode(m); setError(null); }}
                            style={{
                                padding: '8px',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontFamily: 'inherit',
                                backgroundColor: mode === m ? '#1e2d3d' : 'transparent',
                                color: mode === m ? '#00ff88' : '#7d8b9c',
                                transition: 'all 0.2s',
                            }}
                        >
                            {m === 'login' ? 'Iniciar sesión' : 'Registrarse'}
                        </button>
                    ))}
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {mode === 'register' && (
                        <div>
                            <label style={labelStyle}>Usuario</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Tu nombre de usuario"
                                required
                                style={inputStyle}
                            />
                        </div>
                    )}

                    <div>
                        <label style={labelStyle}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="correo@ejemplo.com"
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            style={inputStyle}
                        />
                    </div>

                    {error && (
                        <p style={{
                            color: '#ff4757',
                            fontSize: '12px',
                            padding: '10px 14px',
                            backgroundColor: 'rgba(255,71,87,0.1)',
                            border: '1px solid rgba(255,71,87,0.3)',
                            borderRadius: '4px',
                        }}>
                            ⚠ {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '12px',
                            backgroundColor: loading ? '#1e2d3d' : '#00ff88',
                            color: loading ? '#7d8b9c' : '#080c10',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: 700,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.2s',
                            marginTop: '4px',
                        }}
                    >
                        {loading ? 'Cargando...' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
                    </button>
                </form>

                {/* Credenciales de prueba */}
                {mode === 'login' && (
                    <div style={{
                        marginTop: '24px',
                        padding: '12px',
                        backgroundColor: '#111820',
                        borderRadius: '6px',
                        border: '1px solid #1e2d3d',
                    }}>
                        <p style={{ color: '#4a5568', fontSize: '11px', letterSpacing: '1px', marginBottom: '6px' }}>
                            CREDENCIALES DE PRUEBA
                        </p>
                        <p style={{ color: '#7d8b9c', fontSize: '12px' }}>Email: admin@gmail.com</p>
                        <p style={{ color: '#7d8b9c', fontSize: '12px' }}>Password: 1234</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    color: '#7d8b9c',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginBottom: '6px',
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: '#111820',
    border: '1px solid #1e2d3d',
    borderRadius: '6px',
    color: '#e6edf3',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
};