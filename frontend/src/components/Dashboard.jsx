import React, { useState, useEffect } from 'react';
import { logOut } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [stockData, setStockData] = useState(null);
  const [trendingStocks, setTrendingStocks] = useState([]);
  const [keyData, setKeyData] = useState(null);
  const [trendRisk, setTrendRisk] = useState(null);

  // API endpoint placeholders - Connect to backend here
  useEffect(() => {
    // TODO: Replace with actual API calls
    fetchStockOverview();
    fetchTrendingStocks();
    fetchKeyData();
    fetchTrendRisk();
  }, []);

  const fetchStockOverview = async () => {
    // TODO: API endpoint - GET /api/stocks/overview/:symbol
    // Placeholder data
    setStockData({
      symbol: "AMZN",
      price: 228.70,
      change: -2.45,
      changePercent: -1.06
    });
  };

  const fetchTrendingStocks = async () => {
    // TODO: API endpoint - GET /api/stocks/trending
    setTrendingStocks([
      { symbol: "AAPL", price: 175.23, change: 2.45 },
      { symbol: "GOOGL", price: 142.56, change: -1.23 },
      { symbol: "TSLA", price: 248.89, change: 5.67 }
    ]);
  };

  const fetchKeyData = async () => {
    // TODO: API endpoint - GET /api/stocks/keydata/:symbol
    setKeyData({
      marketCap: "243906537062.4",
      sector: "Consumer Cyclical",
      weekHigh52: "242.52",
      weekLow52: "161.38",
      allTimeHigh: "242.06",
      allTimeLow: "81.82"
    });
  };

  const fetchTrendRisk = async () => {
    // TODO: API endpoint - GET /api/stocks/trend-risk/:symbol
    setTrendRisk({
      trend: "Bullish (3.3%)",
      risk: "Medium"
    });
  };

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const toggleAiAssistant = () => {
    // TODO: Connect to AI assistant backend when implemented
    setShowAiAssistant(!showAiAssistant);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-content">
          <h3>TRENDING STOCKS</h3>
          <div className="trending-stocks">
            {/* TODO: Connect to backend API */}
            {trendingStocks.map((stock, index) => (
              <div key={index} className="trending-stock-item">
                <span className="stock-symbol">{stock.symbol}</span>
                <span className="stock-price">${stock.price}</span>
                <span className={`stock-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search" 
              className="search-input"
              // TODO: Connect to stock search API
            />
          </div>
          
          <div className="user-profile" onClick={() => setShowUserDropdown(!showUserDropdown)}>
            <div className="user-icon">👤</div>
            {showUserDropdown && (
              <div className="user-dropdown">
                <div className="user-info-dropdown">
                  <span>Welcome, {currentUser?.displayName || currentUser?.email}</span>
                </div>
                <button onClick={handleLogOut} className="logout-dropdown-btn">
                  Log Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="dashboard-content">
          {/* Stock Overview Section */}
          <section className="stock-overview">
            <div className="overview-header">
              <h2>Overview — {stockData?.symbol || 'AMZN'}</h2>
              <div className="stock-price">
                <span className="price">{stockData?.price || '228.70'}</span>
                <span className={`change ${(stockData?.change || -2.45) >= 0 ? 'positive' : 'negative'}`}>
                  {(stockData?.change || -2.45) >= 0 ? '+' : ''}{stockData?.change || -2.45}
                </span>
              </div>
            </div>
          </section>

          {/* Chart and Key Data Section */}
          <div className="main-content-grid">
            {/* Chart Placeholder */}
            <div className="chart-container">
              <div className="chart-placeholder">
                <h3>Stock Price Chart</h3>
                <div className="chart-area">
                  {/* TODO: Integrate with charting library (Chart.js, D3.js, etc.) */}
                  {/* API endpoint: GET /api/stocks/chart/:symbol?period=1d */}
                  <p>Chart will be rendered here from backend data</p>
                </div>
              </div>
            </div>

            {/* Key Data */}
            <div className="key-data-container">
              <h3>Key data</h3>
              <div className="key-data-grid">
                {/* TODO: Connect to backend API */}
                <div className="key-data-item">
                  <span className="data-label">Market cap:</span>
                  <span className="data-value">{keyData?.marketCap || '243906537062.4'}</span>
                </div>
                <div className="key-data-item">
                  <span className="data-label">Sector:</span>
                  <span className="data-value">{keyData?.sector || 'Consumer Cyclical'}</span>
                </div>
                <div className="key-data-item">
                  <span className="data-label">52-week high:</span>
                  <span className="data-value">{keyData?.weekHigh52 || '242.52'}</span>
                </div>
                <div className="key-data-item">
                  <span className="data-label">52-week low:</span>
                  <span className="data-value">{keyData?.weekLow52 || '161.38'}</span>
                </div>
                <div className="key-data-item">
                  <span className="data-label">All time high:</span>
                  <span className="data-value">{keyData?.allTimeHigh || '242.06'}</span>
                </div>
                <div className="key-data-item">
                  <span className="data-label">All time low:</span>
                  <span className="data-value">{keyData?.allTimeLow || '81.82'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bottom-section">
            {/* Trend & Risk */}
            <div className="trend-risk-container">
              <h3>Trend & Risk</h3>
              <div className="trend-risk-content">
                {/* TODO: Connect to backend API */}
                <div className="trend-item">
                  <span className="trend-label">Trend:</span>
                  <span className="trend-value">{trendRisk?.trend || 'Bullish (3.3%)'}</span>
                </div>
                <div className="risk-item">
                  <span className="risk-label">Risk level:</span>
                  <span className="risk-value">{trendRisk?.risk || 'Medium'}</span>
                </div>
              </div>
            </div>

            {/* Detailed Stats & Filters */}
            <div className="detailed-stats-container">
              <h3>Detailed stats & filters</h3>
              <div className="stats-placeholder">
                {/* TODO: Connect to backend API */}
                {/* API endpoint: GET /api/stocks/detailed-stats/:symbol */}
                <p>Detailed statistics table will be populated from backend</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Assistant Button */}
      <button 
        className="ai-assistant-btn"
        onClick={toggleAiAssistant}
        title="AI Assistant"
      >
        🤖
      </button>

      {/* AI Assistant Modal/Panel - Placeholder */}
      {showAiAssistant && (
        <div className="ai-assistant-panel">
          <div className="ai-panel-header">
            <h3>AI Assistant</h3>
            <button 
              className="close-ai-btn"
              onClick={() => setShowAiAssistant(false)}
            >
              ×
            </button>
          </div>
          <div className="ai-panel-content">
            {/* TODO: AI Assistant UI will be designed and added later */}
            <p>AI Assistant interface will be implemented here</p>
            <p>Backend will handle the logic</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;