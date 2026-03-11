import Image from 'next/image';
import Link from 'next/link';
import { getGames } from '@/lib/api';
import { GameSummary } from '@/types/game';

// Recibe los query params de la URL: /catalog?category=shooter&platform=pc
export default async function CatalogPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; platform?: string; 'sort-by'?: string }>;
}) {
    // Debes hacer await para obtener los valores
    const params = await searchParams;

    let games: GameSummary[] = [];
    let error: string | null = null;

    try {
        games = await getGames({
            category: params.category ?? '',
            platform: params.platform ?? '',
            'sort-by': params['sort-by'] ?? '',
        });
    } catch (err) {
        error = err instanceof Error ? err.message : 'Error al cargar los juegos';
    }

    const categories = ['mmorpg', 'shooter', 'battle-royale', 'strategy', 'racing', 'sports', 'card', 'fighting'];
    const active = params.category ?? '';

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px' }}>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: '30px', marginBottom: '8px' }}>
                Catálogo
            </h1>
            <p style={{ color: '#7d8b9c', fontSize: '13px', marginBottom: '32px' }}>
                {games.length} juegos encontrados
            </p>

            {/* Filtros de categoría */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
                <Link className='button' href="/catalog" style={{
                    padding: '6px 16px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    border: '1px solid',
                    borderColor: active === '' ? '#00ff88' : '#1e2d3d',
                    color: active === '' ? '#00ff88' : '#7d8b9c',
                    backgroundColor: active === '' ? 'rgba(0,255,136,0.1)' : 'transparent',
                }}>
                    Todos
                </Link>
                {categories.map((cat) => (
                    <Link className='button' key={cat} href={`/catalog?category=${cat}`} style={{
                        padding: '6px 16px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        border: '1px solid',
                        borderColor: active === cat ? '#00ff88' : '#1e2d3d',
                        color: active === cat ? '#00ff88' : '#7d8b9c',
                        backgroundColor: active === cat ? 'rgba(0,255,136,0.1)' : 'transparent',
                        textTransform: 'capitalize',
                    }}>
                        {cat}
                    </Link>
                ))}
            </div>

            {error && (
                <p style={{ color: '#ff4757', textAlign: 'center', padding: '64px' }}>{error}</p>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '20px',
            }}>
                {games.map((game, i) => (
                    <Link key={game.id} href={`/games/${game.id}`}>
                        <div className="game-card card-anim" style={{
                            backgroundColor: '#111820',
                            border: '1px solid #1e2d3d',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            animationDelay: `${i * 0.04}s`,
                        }}>
                            <Image
                                src={game.thumbnail}
                                alt={game.title}
                                width={365}
                                height={206}
                                style={{ width: '100%', height: 'auto' }}
                            />
                            <div style={{ padding: '16px' }}>
                                <p style={{ color: '#00ff88', fontSize: '11px', letterSpacing: '1px', marginBottom: '6px' }}>
                                    {game.genre} · {game.platform}
                                </p>
                                <h3 style={{ fontSize: '14px', marginBottom: '6px' }}>{game.title}</h3>
                                <p style={{ color: '#7d8b9c', fontSize: '12px' }}>
                                    {game.short_description.slice(0, 75)}...
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}