import Image from 'next/image';
import Hero from '@/components/Hero';

// Función que trae los juegos de la API
async function getGames() {
  const response = await fetch('https://www.freetogame.com/api/games', {
    next: { revalidate: 3600 }, // caché de 1 hora
  });

  if (!response.ok) {
    throw new Error('No se pudieron cargar los juegos');
  }

  const data = await response.json();

  // La API a veces devuelve un objeto en lugar de array
  return Array.isArray(data) ? data : [];
}

export default async function HomePage() {
  // Como es Server Component podemos usar async/await directamente
  let games = [];
  let error = null;

  try {
    games = await getGames();
  } catch (err) {
    error = 'Error al conectar con la API';
  }

  return (
    <div>
      <Hero />

      <section style={{ padding: '48px 32px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '32px' }}>
          Juegos populares
        </h2>

        {/* Si hay error lo mostramos */}
        {error && (
          <p style={{ color: 'red' }}>{error}</p>
        )}

        {/* Lista de juegos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {games.slice(0, 20).map((game: any) => (
            <div key={game.id} style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #333',
            }}>
              <Image
                src={game.thumbnail}
                alt={game.title}
                width={365}
                height={206}
                style={{ width: '100%', height: 'auto' }}
              />
              <div style={{ padding: '16px' }}>
                <h3 style={{ marginBottom: '8px' }}>{game.title}</h3>
                <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '8px' }}>
                  {game.short_description.slice(0, 80)}...
                </p>
                <span style={{
                  fontSize: '12px',
                  color: '#00ff88',
                  border: '1px solid #00ff88',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}>
                  {game.genre}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}