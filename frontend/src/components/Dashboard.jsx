import React from 'react';
import { logOut } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome to Stock Trading Analyser</h1>
        <div className="user-info">
          <span>Welcome, {currentUser?.email}</span>
          <button onClick={handleLogOut} className="logout-button">
            Log Out
          </button>
        </div>
      </header>
      <main className="dashboard-content">
        <p>This is your main dashboard. The UI design from Figma will be integrated here.</p>
        {/*main application*/}
      </main>
    </div>
  );
};

export default Dashboard;