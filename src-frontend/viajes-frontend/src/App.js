import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import RegisterPage from './pages/register/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountPage from './pages/account/AccountPage';
import LoginPage from './pages/login/LoginPage';
import PersonalInfoPage from './pages/personalInfo/PersonalInfo';
import CountriesPage from './pages/countries/CountriesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/personal" element={<PersonalInfoPage />} />
        <Route path='/countries' element={<CountriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
