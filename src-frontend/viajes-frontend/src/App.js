import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { useAuth } from './authContext/autContext';
import { Header } from './components/Header/Header';
import HeaderBasic from './components/HeaderBasic/HeaderBasic';
import { Account } from './components/Account/Account';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { PersonalInfo } from './components/PersonalInfo/PersonalInfo';
import { Countries } from './components/Options/Country/Countries';
import { Cities } from './components/Options/City/Cities';
import { Attractions } from './components/Options/Attraction/Attractions';
import { Notification } from './components/Notification/Notification';
import { Login } from './components/Login/Login';
import { AuthProvider } from './authContext/autContext';

function App() {
  const { activeUser } = useAuth();

  return (
    <Router>
      {activeUser ? <Header /> : <HeaderBasic />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/personal" element={<PersonalInfo />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/attractions" element={<Attractions />} />
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
