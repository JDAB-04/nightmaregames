import { Twitter, Youtube, MessageCircle, Twitch } from "lucide-react";

export default function Footer() {
    return (
        <footer style={{
            backgroundColor: '#0d1117',
            borderTop: '1px solid #1e2d3d',
            marginTop: '80px',
        }}>
            {/* Sección principal */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '60px 32px 40px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '48px',
            }}>

                {/* Columna 1 — Brand */}
                <div>
                    <h3 style={{
                        fontFamily: 'Orbitron, monospace',
                        fontSize: '17px',
                        color: '#00ff88',
                        letterSpacing: '2px',
                        marginBottom: '16px',
                    }}>
                        NIGHTMARE GAMES
                    </h3>
                    <p style={{ color: '#7d8b9c', fontSize: '13px', lineHeight: 1.7, marginBottom: '24px' }}>
                        Tu base de datos de juegos free-to-play. Descubre, filtra y encuentra tu próximo juego favorito.
                    </p>
                    {/* Redes sociales */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {[
                            { icon: <Twitter size={16} className="twitter-icon" />, href: 'https://x.com' },
                            { icon: <Youtube size={16} className="youtube-icon" />, href: 'https://youtube.com' },
                            { icon: <MessageCircle size={16} className="message-icon" />, href: 'https://discord.com' },
                            { icon: <Twitch size={16} className="twitch-icon" />, href: 'https://twitch.tv' },
                        ].map(({ icon, href }, i) => (
                            <a key={i} href={href} className="social-icon" style={{
                                width: '36px',
                                height: '36px',
                                border: '1px solid #1e2d3d',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#7d8b9c',
                                transition: 'border-color 0.2s, color 0.2s',
                            }}>
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Columna 2 — Explorar */}
                <div>
                    <h4 style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: '#e6edf3',
                        marginBottom: '20px',
                    }}>
                        Explorar
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            { label: 'Inicio', href: '/' },
                            { label: 'Catálogo', href: '/catalog' },
                            { label: 'MMORPG', href: '/catalog?category=mmorpg' },
                            { label: 'Shooters', href: '/catalog?category=shooter' },
                            { label: 'Battle Royale', href: '/catalog?category=battle-royale' },
                        ].map(({ label, href }) => (
                            <li key={label}>
                                <a href={href} className="footer-link" style={{
                                    color: '#7d8b9c',
                                    fontSize: '13px',
                                    transition: 'color 0.2s',
                                }}>
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Columna 3 — Legal */}
                <div>
                    <h4 style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: '#e6edf3',
                        marginBottom: '20px',
                    }}>
                        Legal
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            'Términos y condiciones',
                            'Política de privacidad',
                            'Política de cookies',
                            'Aviso legal',
                        ].map((item) => (
                            <li key={item}>
                                <a href="#" className="footer-link" style={{
                                    color: '#7d8b9c',
                                    fontSize: '13px',
                                    transition: 'color 0.2s',
                                }}>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Columna 4 — API */}
                <div>
                    <h4 style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: '#e6edf3',
                        marginBottom: '20px',
                    }}>
                        Datos
                    </h4>
                    <p style={{ color: '#7d8b9c', fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>
                        Información proporcionada por la API pública de FreeToGame.
                    </p>
                    <a className="button" href="https://www.freetogame.com/api-doc" target="_blank" rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            border: '1px solid #1e2d3d',
                            borderRadius: '4px',
                            color: '#00ff88',
                            fontSize: '12px',
                        }}>
                        Ver documentación →
                    </a>
                </div>

            </div>

            {/* Barra inferior */}
            <div style={{
                borderTop: '1px solid #1e2d3d',
                padding: '20px 32px',
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <p style={{ color: '#4a5568', fontSize: '12px' }}>
                    © {new Date().getFullYear()} Nightmare Games — Todos los derechos reservados
                </p>
            </div>
        </footer>
    );
}