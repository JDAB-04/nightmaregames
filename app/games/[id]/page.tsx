import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGameById } from '@/lib/api';

export default async function GamePage({ params }: { params: { id: string } }) {
    let game;

    try {
        game = await getGameById(params.id);
    } catch {
        notFound();
    }

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 32px' }}>

            {/* Breadcrumb */}
            <p style={{ color: '#7d8b9c', fontSize: '13px', marginBottom: '24px' }}>
                <Link href="/" style={{ color: '#7d8b9c' }}>Inicio</Link>
                {' / '}
                <Link href="/catalog" style={{ color: '#7d8b9c' }}>Catálogo</Link>
                {' / '}
                <span style={{ color: '#00ff88' }}>{game.title}</span>
            </p>

            {/* Hero del juego */}
            <div style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '40px',
            }}>
                <Image
                    src={game.thumbnail}
                    alt={game.title}
                    width={1280}
                    height={720}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    priority
                />
                <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    padding: '40px 32px 32px',
                    background: 'linear-gradient(to top, rgba(8,12,16,1), transparent)',
                }}>
                    <span style={{
                        fontSize: '11px', color: '#00ff88', letterSpacing: '2px',
                        border: '1px solid #00ff88', padding: '2px 10px', borderRadius: '4px',
                        marginBottom: '12px', display: 'inline-block',
                    }}>
                        {game.genre}
                    </span>
                    <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(24px, 4vw, 48px)', marginTop: '8px' }}>
                        {game.title}
                    </h1>
                </div>
            </div>

            {/* Contenido */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 280px',
                gap: '32px',
            }}>
                {/* Descripción */}
                <div>
                    <h2 style={{ fontSize: '16px', marginBottom: '16px', color: '#00ff88' }}>Descripción</h2>
                    <p style={{ color: '#7d8b9c', lineHeight: 1.8, fontSize: '14px', marginBottom: '32px' }}>
                        {game.description}
                    </p>

                    {/* Capturas */}
                    {game.screenshots?.length > 0 && (
                        <>
                            <h2 style={{ fontSize: '16px', marginBottom: '16px', color: '#00ff88' }}>Capturas</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                                {game.screenshots.map((s) => (
                                    <Image key={s.id} src={s.image} alt="screenshot" width={365} height={206}
                                        style={{ width: '100%', borderRadius: '6px' }} />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Sidebar */}
                <div style={{
                    backgroundColor: '#111820',
                    border: '1px solid #1e2d3d',
                    borderRadius: '8px',
                    padding: '24px',
                    height: 'fit-content',
                }}>
                    <h3 style={{ fontSize: '13px', color: '#00ff88', marginBottom: '16px', letterSpacing: '1px' }}>
                        FICHA TÉCNICA
                    </h3>
                    {[
                        ['Desarrollador', game.developer],
                        ['Publisher', game.publisher],
                        ['Plataforma', game.platform],
                        ['Género', game.genre],
                        ['Estreno', game.release_date],
                    ].map(([label, value]) => (
                        <div key={label} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #1e2d3d' }}>
                            <p style={{ fontSize: '11px', color: '#4a5568', marginBottom: '2px' }}>{label}</p>
                            <p style={{ fontSize: '13px', color: '#e6edf3' }}>{value}</p>
                        </div>
                    ))}

                    <a href={game.game_url} target="_blank" rel="noopener noreferrer" style={{
                        display: 'block',
                        marginTop: '20px',
                        padding: '12px',
                        backgroundColor: '#00ff88',
                        color: '#080c10',
                        textAlign: 'center',
                        borderRadius: '4px',
                        fontWeight: 700,
                        fontSize: '14px',
                    }}>
                        ▶ Jugar Gratis
                    </a>
                </div>
            </div>
        </div>
    );
}