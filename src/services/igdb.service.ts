export interface IGDBSuggestion {
  id: number,
  name: string,
  slug: string,
}

export async function getIGDBSuggestionsByGameName(name: string): Promise<IGDBSuggestion[]> {
    const slug_value = name
                        .replace(/ /g, "-")
                        .toLowerCase()
                        .replace(/[.,/#!$%'^&*;:{}=-_`~()]/g, "");
    const response = await fetch(`${this.serverDomain}/igdb/${slug_value}`);
    const suggestions = await response.json();

    return suggestions;
}