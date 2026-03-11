import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section style={{
            padding: '100px 32px',
            borderBottom: '1px solid #1e2d3d',
            backgroundImage: `
        linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)
      `,
            backgroundSize: '40px 40px',
        }}>
            {/* Flex container: texto a la izquierda, imagen a la derecha */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '48px',
            }}>
                <div style={{ flex: 1 }}>
                    <h1 style={{
                        fontFamily: 'Orbitron, monospace',
                        fontSize: 'clamp(30px, 7vw, 65px)',
                        fontWeight: 900,
                        lineHeight: 1,
                        marginBottom: '24px',
                    }}>
                        DESCUBRE<br />
                        <span style={{ color: '#00ff88' }}>LOS MEJORES</span><br />
                        JUEGOS GRATIS
                    </h1>
                    <p style={{ color: '#7d8b9c', fontSize: '16px', fontWeight: 'bold', marginBottom: '40px', maxWidth: '480px' }}>
                        Más de 400 juegos free-to-play. Filtra por género y encuentra tu próximo favorito.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <Link className='button' href="/catalog" style={{
                            padding: '12px 32px',
                            backgroundColor: '#00ff88',
                            color: '#080c10',
                            borderRadius: '4px',
                            fontWeight: 600,
                            fontSize: '14px',
                        }}>
                            Explorar catálogo →
                        </Link>
                        <Link className='button' href="/catalog?category=shooter" style={{
                            padding: '12px 32px',
                            border: '1px solid #1e2d3d',
                            borderRadius: '4px',
                            fontSize: '14px',
                            color: '#e6edf3',
                        }}>
                            Ver Shooters
                        </Link>
                    </div>
                </div>
                {/* Imagen */}
                <div style={{
                    flex: 1,
                    maxWidth: '400px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginRight: '25px'
                }}>
                </div>
                <div className="holographic-container">
                    <div className="holographic-card">
                        <Image className='hero-image'
                            src="/fondo.png"
                            alt="Featured game"
                            width={400}
                            height={400}
                            style={{ width: '100%', height: 'auto' }}
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}