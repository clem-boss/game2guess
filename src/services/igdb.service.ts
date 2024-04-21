const serverDomain = process.env.REACT_APP_GAME2GUESS_SERVER_DOMAIN || "";

export interface IGDBSuggestion {
  id: number,
  name: string,
  slug: string,
}

export async function getIGDBSuggestionsByGameName(name: string): Promise<IGDBSuggestion[]> {
  const response = await fetch(`${serverDomain}/igdb`, {method: "POST", body: name});
  const suggestions = await response.json();
  
  return suggestions.map((s: any) => s.name);
}