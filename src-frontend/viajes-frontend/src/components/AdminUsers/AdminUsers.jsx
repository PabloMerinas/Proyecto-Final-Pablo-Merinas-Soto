import React, { useState, useEffect } from 'react';
import { useAuth } from "../../authContext/autContext";
import { Navigate } from "react-router-dom";
import { getAllUsers } from '../../service/userService';
import { getCountries } from '../../service/countryService';
import { getCities } from '../../service/cityService';
import { getAttractions } from '../../service/attractionService';

import './adminUsers.css';

export const AdminUsers = () => {
    const [optionData, setOptionData] = useState([]);
    const [filteredItem, setFilteredItem] = useState([]);
    const [searchText, setSearchText] = useState('');
    // Comprobamos que este logeado
    const { activeUser } = useAuth();
    // Dependiendo de la opcion seleccionada mostrara un menu u otro.
    const [selectedOption, setSelectedOption] = useState(1);

    // Métodos para recuperar los datos dependiendo de la opcion seleccionada.
    useEffect(() => {
        // Recupero el token
        const token = localStorage.getItem("authToken");
        async function fetchUsers() {
            try {
                const usersData = await getAllUsers(token);
                setOptionData(usersData);
                setFilteredItem(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        async function fetchCountries() {
            try {
                const countriesData = await getCountries(token);
                setOptionData(countriesData);
                setFilteredItem(countriesData);
            } catch (error) {
                console.error('Error fetching countries: ', error);
            }
        }
        async function fetchCities() {
            try {
                const citiesData = await getCities(token);
                setOptionData(citiesData);
                setFilteredItem(citiesData);
            } catch (error) {
                console.error('Error fetching cities: ', error);
            }
        }
        async function fetchAttractions() {
            try {
                const attractionsData = await getAttractions(token);
                setOptionData(attractionsData);
                setFilteredItem(attractionsData);
            } catch (error) {
                console.error('Error fetching attractions: ', error);
            }
        }

        switch (selectedOption) {
            case 1:
                fetchUsers();
                break;
            case 2:
                fetchCountries();
                break;
            case 3:
                fetchCities();
                break;
            case 4:
                fetchAttractions();
                break;
            default:
                fetchUsers();
        }
    }, [selectedOption]);

    // Regresa al login si se accede sin logearse antes
    if (!activeUser) {
        return <Navigate to="/" />;

    }

    // Actualiza el estado del searchtext
    const handleInputChange = (event) => {
        setSearchText(event.target.value || '');
        filterItem(event.target.value || ''); // Llamo al metodo para filtrar ( Lo dejo aqui para que se vaya actualizando solo)

    };
    // Metodo para filtrar usuarios
    const filterItem = (text) => {
        // Dependiendo de que opcion este renderizada se filtrara por una opcion u otra.
        let filtered;
        switch (selectedOption) {
            case 1:
                filtered = optionData.filter(user =>
                    user.username.toLowerCase().includes(text.toLowerCase())
                );
                break;
            case 2:
                filtered = optionData.filter(country =>
                    country.country.toLowerCase().includes(text.toLowerCase())
                );
                break;
            case 3:
                filtered = optionData.filter(city =>
                    city.city.toLowerCase().includes(text.toLowerCase())
                );
                break;
            case 4:
                filtered = optionData.filter(attraction =>
                    attraction.attraction.toLowerCase().includes(text.toLowerCase())
                );
                break;
            default:
                filtered = optionData.filter(user =>
                    user.username.toLowerCase().includes(text.toLowerCase())
                );
        }
        setFilteredItem(filtered);
    };


    // Partes HTML
    const Modules = () => {
        const handleModuleClick = (option) => {
            setSelectedOption(option);
            setSearchText(''); // Si cambio de opcion se borra lo que tenga en la barra de busqueda.
        };

        return (
            <div className="modules-container">
                <div className="modules-depth4-frame2">
                    <div className="modules-depth5-frame0">
                        <div className="modules-depth6-frame0">
                            <span className="modules-text">
                                <span>Modules</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="modules-depth4-frame3">
                    <div className="modules-depth5-frame01">
                        <div className="modules-depth6-frame01">
                            <div className="modules-depth7-frame0">
                                <div className="modules-depth8-frame0">
                                    <div className="modules-depth9-frame0">
                                        <span className="modules-text02" onClick={() => handleModuleClick(1)}>
                                            <span className={selectedOption === 1 ? 'selected-option' : ''}>Users</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="modules-depth7-frame1">
                                <div className="modules-depth8-frame01">
                                    <div className="modules-depth9-frame01">
                                        <span className="modules-text04" onClick={() => handleModuleClick(2)}>
                                            <span className={selectedOption === 2 ? 'selected-option' : ''}>Countries</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="modules-depth7-frame2">
                                <div className="modules-depth8-frame02">
                                    <div className="modules-depth9-frame02">
                                        <span className="modules-text06" onClick={() => handleModuleClick(3)}>
                                            <span className={selectedOption === 3 ? 'selected-option' : ''}>Cities</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="modules-depth7-frame3">
                                <div className="modules-depth8-frame03">
                                    <div className="modules-depth9-frame03">
                                        <span className="modules-text08" onClick={() => handleModuleClick(4)}>
                                            <span className={selectedOption === 4 ? 'selected-option' : ''}>Attractions</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="modules-depth7-frame4">
                                <div className="modules-depth8-frame04">
                                    <div className="modules-depth9-frame04">
                                        <span className="modules-text10" onClick={() => handleModuleClick(5)}>
                                            <span>Itineraries</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Dependiendo de la opcion seleccionada mostrara un componente u otro.
    let ComponentToRender; // Este sera el componente que se va a renderizar.
    let textToFind; // Este es el texto para el la barra de busqueda.
    switch (selectedOption) {
        case 1:
            ComponentToRender = AdminUser;
            textToFind = 'users';
            break;
        case 2:
            ComponentToRender = AdminCountries;
            textToFind = 'countries';
            break;
        case 3:
            ComponentToRender = AdminCities;
            textToFind = 'cities';
            break;
        case 4:
            ComponentToRender = AdminAttractions;
            textToFind = 'attractions';
            break;
        default:
            ComponentToRender = AdminUser;
            textToFind = 'users';
    }

    return (
        <div className="users-principal-container">
            <div className="users-principal-users">
                <div className="users-principal-nivel4-frame0">
                    <div className="users-principal-nivel5-frame0">
                        <div className="users-principal-nivel6-frame0">
                            <span className="users-principal-text">
                                <span>Users</span>
                            </span>
                        </div>
                    </div>
                </div>
                < Modules />
                <div className="users-principal-nivel4-frame1">
                    <div className="users-principal-nivel5-frame01">
                        <div className="users-principal-nivel6-frame01">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="users-principal-nivel6-frame1">
                            <div className="users-principal-nivel7-frame01">
                                <span className="users-principal-text02">
                                    <input
                                        type="text"
                                        value={searchText}
                                        onChange={handleInputChange}
                                        placeholder={`Find ${textToFind}`} style={{ backgroundColor: 'transparent', width: '860px', border: 'none' }}
                                    /> </span>
                            </div>
                        </div>
                    </div>
                    <div className="users-principal-nivel6-frame20">
                        <span>Add</span>
                    </div>
                </div>
            </div>
            <ComponentToRender filteredData={filteredItem} />
        </div>
    )
}


// HTML para usuarios
const AdminUser = ({ filteredData }) => {
    return (
        <div className="users-principal-nivel4-frame2">
            <div className="users-principal-nivel5-frame02">
                <div className="users-principal-nivel6-frame02">
                    <div className="users-principal-nivel7-frame02">
                        <div className="users-principal-nivel8-frame0">
                            <div className="users-principal-nivel9-frame0">
                                <div className="users-principal-nivel10-frame0">
                                    <span className="users-principal-text04">
                                        <span>User</span>
                                    </span>
                                </div>
                            </div>
                            <div className="users-principal-nivel9-frame0">
                                <div className="users-principal-nivel10-frame0">
                                    <span className="users-principal-text04">
                                        <span>Email</span>
                                    </span>
                                </div>
                            </div>
                            <div className="users-principal-nivel9-frame1">
                                <div className="users-principal-nivel10-frame001">
                                    <span className="users-principal-text06">
                                        <span>Username</span>
                                    </span>
                                </div>
                            </div>
                            <div className="users-principal-nivel9-frame2">
                                <div className="users-principal-nivel10-frame002">
                                    <span className="users-principal-text08">
                                        <span>Rol</span>
                                    </span>
                                </div>
                            </div>
                            <div className="users-principal-nivel9-frame3">
                                <div className="users-principal-nivel10-frame003">
                                    <span className="users-principal-text10">
                                        <span>Phone</span>
                                    </span>
                                </div>
                            </div>
                            <div className="users-principal-nivel9-frame4">
                                <div className="users-principal-nivel10-frame004">
                                    <span className="users-principal-text12">
                                        <span>Actions</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="users-principal-nivel7-frame1">
                        {filteredData.map(user => (
                            <form key={user.username}>
                                {generateUser(user)}
                            </form>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
// Metodo para generar la linea del usuario
function generateUser(user) {
    return (
        <div className="users-principal-nivel8-frame01">
            <div className="users-principal-nivel9-frame01 ">
                <div className="users-principal-text199">
                    <span className="users-principal-text199">
                        <span>
                            <img className='admin-user-profile-img' src={user.imgUrl} alt='Profile'></img></span>
                    </span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame01">
                <div className="users-principal-nivel10-frame006">
                    <span className="users-principal-text16">
                        <span>{user.email ? user.email : 'default'}</span>
                    </span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame11">
                <div className="users-principal-nivel10-frame007">
                    <span className="users-principal-text18">
                        <span>{user.username ? user.username : 'default'}</span>
                    </span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame21">
                <div className="users-principal-nivel10-frame008">
                    <span className="users-principal-text20">
                        <span>{user.roles ? user.roles.join(', ') : 'default'}</span>
                    </span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame31">
                <div className="users-principal-nivel10-frame009">
                    <span className="users-principal-text22">{user.phone ? user.phone : 'No added'}</span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame41">
                <div className="users-principal-nivel10-frame010">
                    <span className="users-principal-text23">
                        <span></span>
                    </span>
                </div>
            </div>

        </div>

    )
}

// HTML para paises
const AdminCountries = ({ filteredData }) => {
    return (
        <div className="users-principal-nivel4-frame2">
            <div className="users-principal-nivel5-frame02">
                <div className="users-principal-nivel6-frame02">
                    <div className="users-principal-nivel7-frame02">
                        <div className="users-principal-nivel8-frame0">
                            <div className="users-principal-nivel9-frame0">
                                <div className="users-principal-nivel10-frame0">
                                    <span className="users-principal-text04">
                                        <span>Country</span>
                                    </span>
                                </div>
                            </div>
                            <div className="users-principal-nivel9-frame0">
                                <div className="users-principal-nivel10-frame0">
                                    <span className="users-principal-text04">
                                        <span>Population</span>
                                    </span>
                                </div>
                            </div>
                            <div className="users-principal-nivel9-frame1">
                                <div className="users-principal-nivel10-frame001">
                                    <span className="users-principal-text06">
                                        <span>Capital</span>
                                    </span>
                                </div>
                            </div>
                            <div className="users-principal-nivel9-frame2">
                                <div className="users-principal-nivel10-frame002">
                                    <span className="users-principal-text08">
                                        <span>Country Code</span>
                                    </span>
                                </div>
                            </div>
                            <div className="users-principal-nivel9-frame3">
                                <div className="users-principal-nivel10-frame003">
                                    <span className="users-principal-text10">
                                        <span>Currency</span>
                                    </span>
                                </div>
                            </div>
                            <div className="users-principal-nivel9-frame4">
                                <div className="users-principal-nivel10-frame004">
                                    <span className="users-principal-text12">
                                        <span>Actions</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="users-principal-nivel7-frame1">
                        {filteredData.map(country => (
                            <form key={country.country}>
                                {generateCountry(country)}
                            </form>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
// Metodo para generar la linea del pais
function generateCountry(country) {
    console.log(country)
    return (
        <div className="users-principal-nivel8-frame01">
            <div className="users-principal-nivel9-frame01 ">
                <div className="users-principal-text199">
                    <span className="users-principal-text199">
                        <span>{country.country ? country.country : 'default'}</span>
                    </span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame01">
                <div className="users-principal-nivel10-frame006">
                    <span className="users-principal-text16">
                        <span>{country.population ? country.population : 'default'}</span>
                    </span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame11">
                <div className="users-principal-nivel10-frame007">
                    <span className="users-principal-text18">
                        <span>{country.capital ? country.capital : 'default'}</span>
                    </span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame21">
                <div className="users-principal-nivel10-frame008">
                    <span className="users-principal-text20">
                        <span>{country.countryCode ? country.countryCode : 'default'}</span>
                    </span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame31">
                <div className="users-principal-nivel10-frame009">
                    <span className="users-principal-text22">{country.currencySymbol ? country.currencySymbol : 'No added'}</span>
                </div>
            </div>
            <div className="users-principal-nivel9-frame41">
                <div className="users-principal-nivel10-frame010">
                    <span className="users-principal-text23">
                        <span></span>
                    </span>
                </div>
            </div>

        </div>

    )
}

// HTML para ciudades
const AdminCities = ({ filteredData }) => {

}
// Metodo para generar la linea de la ciudad
function generateCity(city) {

}

// HTML para las atracciones
const AdminAttractions = ({ filteredData }) => {

}
// Metodo para generar la linea de la attracion
function generateAttraction(attracion) {

}
