const API_BASE_URL = 'https://api.tvmaze.com/search/shows?q=';

export async function apiGet(queryString) {
  const response = await fetch(`${API_BASE_URL}${queryString}`);
  return response;
}
