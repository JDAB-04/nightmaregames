export interface GameSummary {
    id: number;
    title: string;
    thumbnail: string;
    short_description: string;
    genre: string;
    platform: string;
    developer: string;
    publisher: string;
    release_date: string;
    game_url: string;
    freetogame_profile_url: string;
}

export interface GameDetail extends GameSummary {
    description: string;
    status: string;
    screenshots: { id: number; image: string; }[];
    minimum_system_requirements: {
        os: string;
        processor: string;
        memory: string;
        graphics: string;
        storage: string;
    };
}
