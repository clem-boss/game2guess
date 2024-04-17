const serverDomain = process.env.REACT_APP_GAME2GUESS_SERVER_DOMAIN || "";

export interface Game2GuessDocument {
    title: CryptoValue;
    images: string[];
};

export interface CryptoValue {
    key: string;
    encryptedValue: string;
}
  
export async function getGameDocument(): Promise<Game2GuessDocument> {
    const response = await fetch(`${serverDomain}/document`);
    const gameDocument = await response.json();

    return gameDocument;
}