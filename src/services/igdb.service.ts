const serverDomain = process.env.REACT_APP_SERVER_DOMAIN || "";

export interface IGDBSuggestion {
  id: number,
  name: string,
  slug: string,
}

export async function getIGDBSuggestionsByGameName(name: string): Promise<IGDBSuggestion[]> {
    const slug_value = name
                        .replace(/[.,/#!$%'^&*;:{}=-_`~()]/g, "")
                        .replace(" ", "-")
                        .toLowerCase();

    const response = await fetch(`${serverDomain}/igdb/${slug_value}`);
    const suggestions = await response.json();

    return suggestions;
}