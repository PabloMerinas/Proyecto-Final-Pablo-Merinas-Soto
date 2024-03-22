import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import RegisterPage from './pages/register/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountPage from './pages/account/AccountPage';
import LoginPage from './pages/login/LoginPage';
import PersonalInfoPage from './pages/personalInfo/PersonalInfo';
import CountriesPage from './pages/options/CountriesPage'
import CitiesPage from './pages/options/CitiesPage';
import AttractionsPage from './pages/options/AttractionsPage';
import IttinerariesPage from './pages/options/ItinerariesPage';
import AdminPage from './pages/admin/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/personal" element={<PersonalInfoPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path='/countries' element={<CountriesPage />} />
        <Route path='/cities' element={<CitiesPage />} />
        <Route path='/attractions' element={<AttractionsPage />} />
        <Route path='/itineraries' element={<IttinerariesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
