import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import RegisterPage from './pages/register/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountPage from './pages/account/AccountPage';
import LoginPage from './pages/login/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
