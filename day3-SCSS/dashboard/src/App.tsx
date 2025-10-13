
import { useAppSelector } from './hooks';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  return <div className="app-container">{isAuthenticated ? <Dashboard /> : <LoginPage />}</div>;
}

export default App;
