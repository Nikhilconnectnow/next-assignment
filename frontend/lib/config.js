// API Configuration for development and production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  PROFILE: `${API_BASE_URL}/api/profile`,
  ITEMS: `${API_BASE_URL}/api/items`,
};

export const getItemsEndpoint = (query = '') => {
  return query ? `${API_ENDPOINTS.ITEMS}?q=${encodeURIComponent(query)}` : API_ENDPOINTS.ITEMS;
};

export const getItemEndpoint = (id) => `${API_ENDPOINTS.ITEMS}/${id}`;
