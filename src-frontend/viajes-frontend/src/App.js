import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Header } from './components/Header/Header';
import { Account } from './components/Account/Account';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { PersonalInfo } from './components/PersonalInfo/PersonalInfo';
import { Countries } from './components/Options/Country/Countries';
import { CountryInfoCard } from './components/Options/Country/CountryInfoCard';
import { Cities } from './components/Options/City/Cities';
import { CityInfoCard } from './components/Options/City/CityInfoCard';
import { Attractions } from './components/Options/Attraction/Attractions';
import { AttractionInfoCard } from './components/Options/Attraction/AttractionInfoCard';
import { Notification } from './components/Notification/Notification';
import { Login } from './components/Login/Login';
import { AuthProvider } from './authContext/autContext';
import { AdminUsers } from './components/AdminUsers/AdminUsers';
import { VisitedPlaces } from './components/Options/VisitedPlaces/VisitedPlaces';

export const CONNECTION = 'https://pablomerinas.ddns.net';
export const BASE_URL = `${CONNECTION}:8080/v1`;

function App() {
  document.title = 'EasyTravels' // Cambio el titulo de la pagina

  return (
    <Router basename='/easytravels' >
      <Header />
      <Routes >
        <Route path="/" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/adminUsers" element={<AdminUsers />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/personal" element={<PersonalInfo />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:country" element={<CountryInfoCard />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/cities/:city" element={<CityInfoCard />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/attractions/:attraction" element={<AttractionInfoCard />} />
        <Route path='/visitedPlaces' element={<VisitedPlaces />} />
        <Route path="/notifications" element={<Notification />} />
      </Routes>
      {/*Aqui deberia ir el footer*/}
    </Router>

  );
}

const DefaultExport = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default DefaultExport;
