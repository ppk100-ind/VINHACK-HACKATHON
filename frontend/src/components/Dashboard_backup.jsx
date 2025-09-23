import React, { useState, useEffect } from 'react';
import { logOut } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { stockAPI, watchlistAPI, aiAPI, newsAPI } from '../services/api';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [stockData, setStockData] = useState(null);
  const [trendingStocks, setTrendingStocks] = useState([]);
  const [keyData, setKeyData] = useState(null);
  const [trendRisk, setTrendRisk] = useState(null);
  const [searchSymbol, setSearchSymbol] = useState('AMZN');
  const [stockNews, setStockNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // API endpoint placeholders - Connect to backend here
  useEffect(() => {
    loadAllData();
  }, [searchSymbol]);

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchStockOverview(),
      fetchTrendingStocks(),
      fetchKeyData(),
      fetchTrendRisk(),
      fetchStockNews()
    ]);
    setLoading(false);
  };

  const fetchStockOverview = async () => {
    try {
      const data = await stockAPI.getOverview(searchSymbol);
      setStockData({
        symbol: data.symbol,
        price: parseFloat(data.price) || 0,
        change: parseFloat(data.change) || 0,
        changePercent: parseFloat(data.percent_change) || 0
      });
    } catch (error) {
      console.error('Error fetching stock overview:', error);
      setStockData({
        symbol: searchSymbol,
        price: 0,
        change: 0,
        changePercent: 0,
        error: "Failed to load stock data"
      });
    }
  };

  const fetchTrendingStocks = async () => {
    try {
      const data = await stockAPI.getTrending();
      setTrendingStocks(data.trending_stocks || []);
    } catch (error) {
      console.error('Error fetching trending stocks:', error);
      setTrendingStocks([]);
    }
  };

  const fetchKeyData = async () => {
    try {
      const data = await stockAPI.getKeyData(searchSymbol);
      setKeyData({
        marketCap: data.market_cap || "N/A",
        sector: data.sector || "N/A",
        weekHigh52: data.week_high_52 || "N/A",
        weekLow52: data.week_low_52 || "N/A",
        peRatio: data.pe_ratio || "N/A",
        eps: data.eps || "N/A",
        dividendYield: data.dividend_yield || "N/A"
      });
    } catch (error) {
      console.error('Error fetching key data:', error);
      setKeyData({
        marketCap: "N/A",
        sector: "N/A",
        weekHigh52: "N/A",
        weekLow52: "N/A",
        peRatio: "N/A",
        eps: "N/A",
        dividendYield: "N/A"
      });
    }
  };

  const fetchTrendRisk = async () => {
    try {
      const data = await aiAPI.getAnalysis("AMZN");
      setTrendRisk({
        trend: data.trend || "Analysis Pending",
        risk: data.risk_level || "Unknown",
        recommendation: data.recommendation || "N/A",
        confidence: data.confidence || 0
      });
    } catch (error) {
      console.error('Error fetching trend/risk data:', error);
      setTrendRisk({
        trend: "Analysis Unavailable",
        risk: "Unknown",
        recommendation: "N/A",
        confidence: 0
      });
    }
  };

  const fetchTrendRisk = async () => {
    try {
      const data = await aiAPI.getAnalysis(searchSymbol);
      setTrendRisk({
        trend: data.trend || "Analysis Pending",
        risk: data.risk_level || "Unknown",
        recommendation: data.recommendation || "N/A",
        confidence: data.confidence || 0
      });
    } catch (error) {
      console.error('Error fetching trend/risk data:', error);
      setTrendRisk({
        trend: "Analysis Unavailable",
        risk: "Unknown",
        recommendation: "N/A",
        confidence: 0
      });
    }
  };

  const fetchStockNews = async () => {
    try {
      const data = await stockAPI.getNews(searchSymbol);
      setStockNews(data.news || []);
    } catch (error) {
      console.error('Error fetching stock news:', error);
      setStockNews([]);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const symbol = e.target.value.toUpperCase().trim();
      if (symbol && symbol !== searchSymbol) {
        setSearchSymbol(symbol);
      }
    }
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
            {trendingStocks.length > 0 ? (
              trendingStocks.map((stock, index) => (
                <div key={index} className="trending-stock-item">
                  <span className="stock-symbol">{stock.symbol}</span>
                  <span className="stock-price">${stock.price}</span>
                  <span className={`stock-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}
                  </span>
                </div>
              ))
            ) : (
              <div className="loading-message">Loading trending stocks...</div>
            )}
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
                {stockData ? (
                  <>
                    <span className="price">${stockData.price}</span>
                    <span className={`change ${stockData.change >= 0 ? 'positive' : 'negative'}`}>
                      {stockData.change >= 0 ? '+' : ''}{stockData.change} ({stockData.changePercent}%)
                    </span>
                  </>
                ) : (
                  <span className="loading">Loading price...</span>
                )}
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
                {keyData ? (
                  <>
                    <div className="key-data-item">
                      <span className="data-label">Market cap:</span>
                      <span className="data-value">{keyData.marketCap}</span>
                    </div>
                    <div className="key-data-item">
                      <span className="data-label">Sector:</span>
                      <span className="data-value">{keyData.sector}</span>
                    </div>
                    <div className="key-data-item">
                      <span className="data-label">52-week high:</span>
                      <span className="data-value">{keyData.weekHigh52}</span>
                    </div>
                    <div className="key-data-item">
                      <span className="data-label">52-week low:</span>
                      <span className="data-value">{keyData.weekLow52}</span>
                    </div>
                    <div className="key-data-item">
                      <span className="data-label">P/E Ratio:</span>
                      <span className="data-value">{keyData.peRatio}</span>
                    </div>
                    <div className="key-data-item">
                      <span className="data-label">EPS:</span>
                      <span className="data-value">{keyData.eps}</span>
                    </div>
                  </>
                ) : (
                  <div className="loading-message">Loading key data...</div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bottom-section">
            {/* Trend & Risk */}
            <div className="trend-risk-container">
              <h3>Trend & Risk</h3>
              <div className="trend-risk-content">
                {trendRisk ? (
                  <>
                    <div className="trend-item">
                      <span className="trend-label">Trend:</span>
                      <span className="trend-value">{trendRisk.trend}</span>
                    </div>
                    <div className="risk-item">
                      <span className="risk-label">Risk level:</span>
                      <span className="risk-value">{trendRisk.risk}</span>
                    </div>
                    <div className="recommendation-item">
                      <span className="recommendation-label">AI Recommendation:</span>
                      <span className="recommendation-value">{trendRisk.recommendation}</span>
                    </div>
                    {trendRisk.confidence > 0 && (
                      <div className="confidence-item">
                        <span className="confidence-label">Confidence:</span>
                        <span className="confidence-value">{Math.round(trendRisk.confidence * 100)}%</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="loading-message">Loading AI analysis...</div>
                )}
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