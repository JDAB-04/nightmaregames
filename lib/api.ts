import { GameSummary, GameDetail } from '@/types/game';

const BASE_URL = 'https://www.freetogame.com/api';

// Función base reutilizable para todos los fetches
async function fetchAPI<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value) url.searchParams.append(key, value);
        });
    }

    const response = await fetch(url.toString(), {
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudieron cargar los datos`);
    }

    return response.json();
}

// Trae lista de juegos con filtros opcionales
export async function getGames(params?: Record<string, string>): Promise<GameSummary[]> {
    const data = await fetchAPI<GameSummary[] | { status: number }>('/games', params);
    return Array.isArray(data) ? data : [];
}

// Trae el detalle de un juego por ID
export async function getGameById(id: string): Promise<GameDetail> {
    return fetchAPI<GameDetail>('/game', { id });
}