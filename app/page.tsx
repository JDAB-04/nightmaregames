import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import { getGames } from '@/lib/api';
import { GameSummary } from '@/types/game';

export default async function HomePage() {
  let games: GameSummary[] = [];
  let error: string | null = null;

  try {
    const all = await getGames({ 'sort-by': 'popularity' });
    games = all.slice(0, 6);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Error desconocido';
  }

  return (
    <div>
      <Hero />

      <section style={{ padding: '64px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: '35px' }}>
            Más populares
          </h2>
          <Link href="/catalog" style={{ color: '#00ff88', fontSize: '15px' }}>
            Ver todos →
          </Link>
        </div>

        {error && (
          <p style={{ color: '#ff4757', padding: '32px', textAlign: 'center' }}>{error}</p>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {games.map((game, i) => (
            <Link key={game.id} href={`/games/${game.id}`}>
              <div className="game-card card-anim" style={{
                backgroundColor: '#111820',
                border: '1px solid #1e2d3d',
                borderRadius: '8px',
                overflow: 'hidden',
                animationDelay: `${i * 0.07}s`,
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
                    {game.genre}
                  </p>
                  <h3 style={{ fontSize: '15px', marginBottom: '8px' }}>{game.title}</h3>
                  <p style={{ color: '#7d8b9c', fontSize: '12px', lineHeight: 2 }}>
                    {game.short_description.slice(0, 80)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}