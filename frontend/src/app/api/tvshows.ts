export async function fetchTrendingTVShows() {
    const response = await fetch('http://localhost:3000/tv/trending');
    if (!response.ok) throw new Error('Failed to fetch trending TV shows');
    return response.json();
  }
  