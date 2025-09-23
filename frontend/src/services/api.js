import axios from 'axios';

// Configure base URL for API calls
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens (if needed later)
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.detail || error.message || 'An error occurred';
    console.error('API Error:', errorMessage);
    throw new Error(errorMessage);
  }
);

// Stock API endpoints
export const stockAPI = {
  // Get stock overview (price + company info)
  getOverview: (symbol) => api.get(`/stocks/overview/${symbol}`),
  
  // Get current stock price
  getPrice: (symbol) => api.get(`/stocks/price/${symbol}`),
  
  // Get trending stocks
  getTrending: () => api.get('/stocks/trending'),
  
  // Get key financial data
  getKeyData: (symbol) => api.get(`/stocks/keydata/${symbol}`),
  
  // Get stock news
  getNews: (symbol) => api.get(`/stocks/news/${symbol}`),
  
  // Get chart data
  getChart: (symbol, period = '1d') => api.get(`/stocks/chart/${symbol}?period=${period}`),
};

// Watchlist API endpoints
export const watchlistAPI = {
  // Get user's watchlist
  getWatchlist: (userId) => api.get(`/watchlist/${userId}`),
  
  // Add stock to watchlist
  addToWatchlist: (userId, symbol) => api.post(`/watchlist/${userId}/add/${symbol}`),
  
  // Remove stock from watchlist
  removeFromWatchlist: (userId, symbol) => api.delete(`/watchlist/${userId}/remove/${symbol}`),
};

// AI API endpoints
export const aiAPI = {
  // Get AI analysis for a stock
  getAnalysis: (symbol) => api.get(`/ai/analysis/${symbol}`),
  
  // Get AI prediction
  getPrediction: (symbol) => api.get(`/ai/prediction/${symbol}`),
  
  // Get AI recommendations
  getRecommendations: () => api.get('/ai/recommendations'),
};

// News API endpoints
export const newsAPI = {
  // Get general market news
  getMarketNews: () => api.get('/news/market'),
  
  // Get news for specific stock
  getStockNews: (symbol) => api.get(`/news/stock/${symbol}`),
};

export default api;