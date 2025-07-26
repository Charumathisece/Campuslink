// Central API utility for CampusLink
// All API calls should use this base URL

export const BASE_URL = "https://campuslink-backend.onrender.com";

export async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'API Error');
  }
  return response.json();
}
