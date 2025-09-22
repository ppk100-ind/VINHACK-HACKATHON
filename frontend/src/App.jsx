import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import './App.css';

function AuthenticatedApp() {
  const { currentUser } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  const switchToSignUp = () => setIsSignUp(true);
  const switchToSignIn = () => setIsSignUp(false);

  if (currentUser) {
    return <Dashboard />;
  }

  return (
    <>
      {isSignUp ? (
        <SignUp switchToSignIn={switchToSignIn} />
      ) : (
        <SignIn switchToSignUp={switchToSignUp} />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}

export default App;
