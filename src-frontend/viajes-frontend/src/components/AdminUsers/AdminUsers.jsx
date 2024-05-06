import React, { useState, useEffect } from 'react';
import { useAuth } from "../../authContext/autContext";
import { Navigate } from "react-router-dom";
import { getAllUsers } from '../../service/userService';
import { deleteCountryByCountry, getCountries } from '../../service/countryService';
import { getCities } from '../../service/cityService';
import { getAttractions } from '../../service/attractionService';
import { deleteUserByUsername } from '../../service/userService';
import { deleteAttractionByAttraction } from '../../service/attractionService';
import { deleteCityByCity } from '../../service/cityService';
import { CountryInfoCard } from '../Options/Country/CountryInfoCard';
import { CityInfoCard } from '../Options/City/CityInfoCard';
import { AttractionInfoCard } from '../Options/Attraction/AttractionInfoCard';
import { UserInfoCard } from './UserInfoCard';
import { Link } from 'react-router-dom';
import './adminUsers.css';

export const AdminUsers = () => {
    const [optionData, setOptionData] = useState([]);
    const [filteredItem, setFilteredItem] = useState([]);
    const [searchText, setSearchText] = useState('');
    // Comprobamos que este logeado
    const { activeUser } = useAuth();
    // Dependiendo de la opcion seleccionada mostrara un menu u otro.
    const [selectedOption, setSelectedOption] = useState(1);
    const [countryToEdit, setCountryToEdit] = useState(null);
    const [cityToEdit, setCityToEdit] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);
    const [attractionToEdit, setAttractionToEdit] = useState(null);
    // Métodos para recuperar los datos dependiendo de la opcion seleccionada.
    useEffect(() => {
        // Recupero el token
        const token = localStorage.getItem("authToken");
        async function fetchData() {
            try {
                let data;
                switch (selectedOption) {
                    case 1:
                        data = await getAllUsers(token);
                        break;
                    case 2:
                        setOptionData(data)
                        data = await getCountries(token);
                        break;
                    case 3:
                        setOptionData(data)
                        data = await getCities(token);
                        break;
                    case 4:
                        data = await getAttractions(token);
                        break;
                    default:
                        data = await getAllUsers(token);
                }
                setOptionData(data);
                setFilteredItem(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();


        if (selectedOption < 5) deleteDataItemsSelected(); // Siempre que no sea una opcion de un modulo, eliminara los item seleccionados
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

        function moduleOption(actualSelectedOption, title) {
            return (
                <div className="modules-depth7-frame0" onClick={() => handleModuleClick(actualSelectedOption)}>
                    <div className="modules-depth8-frame0">
                        <div className="modules-depth9-frame0">
                            <span className="modules-text02">
                                <span className={selectedOption === actualSelectedOption ? 'selected-option' : ''}>{title}</span>
                            </span>
                        </div>
                    </div>
                </div>
            )
        }
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
                            {moduleOption(1, 'Users')}
                            {moduleOption(2, 'Countries')}
                            {moduleOption(3, 'Cities')}
                            {moduleOption(4, 'Attractions')}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    // HTML para usuarios
    const AdminUser = () => {
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
                            {filteredItem.map(user => user.username && (
                                <div id={user.username} key={user.username}>
                                    {generateUser(user, activeUser.username)}
                                </div>
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
                            <span className='admin-principal-options-icons'>
                                {user.username === activeUser.username ? ( // No quiero que pueda editarse a si mismo desde ese menú
                                    <Link to={'/personal'} className='a-no-style'>
                                        <i className="fa-solid fa-pen-to-square" onClick={() => editDataItem(user, 'user')}></i>
                                    </Link>
                                ) : (
                                    <i className="fa-solid fa-pen-to-square" onClick={() => editDataItem(user, 'user')}></i>
                                )}

                                <i className="fa-solid fa-trash" onClick={() => deleteDataItem(user, 'user')}></i>
                            </span>
                        </span>
                    </div>
                </div>

            </div>

        )
    }

    // HTML para paises
    const AdminCountries = () => {
        return (
            <div className="users-principal-nivel4-frame2" key={'admin-countries'}>
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
                            {filteredItem.map(country => country.countryCode && (
                                <div id={country.country} key={country.country}>
                                    {generateCountry(country)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // Metodo para generar la linea del pais
    function generateCountry(country) {
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
                            <span className='admin-principal-options-icons'>
                                <i className="fa-solid fa-pen-to-square" onClick={() => editDataItem(country, 'country')}></i>
                                <i className="fa-solid fa-trash" onClick={() => deleteDataItem(country, 'country')}></i>
                            </span>
                        </span>
                    </div>
                </div>

            </div>

        )
    }

    // HTML para ciudades
    const AdminCities = () => {
        return (
            <div className="users-principal-nivel4-frame2" key={'admin-cities'}>
                <div className="users-principal-nivel5-frame02">
                    <div className="users-principal-nivel6-frame02">
                        <div className="users-principal-nivel7-frame02">
                            <div className="users-principal-nivel8-frame0">
                                <div className="users-principal-nivel9-frame0">
                                    <div className="users-principal-nivel10-frame0">
                                        <span className="users-principal-text04">
                                            <span>City</span>
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
                                            <span>State</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="users-principal-nivel9-frame2">
                                    <div className="users-principal-nivel10-frame002">
                                        <span className="users-principal-text08">
                                            <span>Airport Code</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="users-principal-nivel9-frame3">
                                    <div className="users-principal-nivel10-frame003">
                                        <span className="users-principal-text10">
                                            <span>Country</span>
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
                            {filteredItem.map(city => city.population && (
                                <div id={city.city} key={city.population}>
                                    {generateCity(city)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // Metodo para generar la linea de la ciudad
    function generateCity(city) {
        return (
            <div className="users-principal-nivel8-frame01">
                <div className="users-principal-nivel9-frame01 ">
                    <div className="users-principal-text199">
                        <span className="users-principal-text199">
                            <span>{city.city ? city.city : 'default'}</span>
                        </span>
                    </div>
                </div>
                <div className="users-principal-nivel9-frame01">
                    <div className="users-principal-nivel10-frame006">
                        <span className="users-principal-text16">
                            <span>{city.population ? city.population : 'default'}</span>
                        </span>
                    </div>
                </div>
                <div className="users-principal-nivel9-frame11">
                    <div className="users-principal-nivel10-frame007">
                        <span className="users-principal-text18">
                            <span>{city.state ? city.state : 'default'}</span>
                        </span>
                    </div>
                </div>
                <div className="users-principal-nivel9-frame21">
                    <div className="users-principal-nivel10-frame008">
                        <span className="users-principal-text20">
                            <span>{city.airportCode ? city.airportCode : 'default'}</span>
                        </span>
                    </div>
                </div>
                <div className="users-principal-nivel9-frame31">
                    <div className="users-principal-nivel10-frame009">
                        <span className="users-principal-text22">{city.country ? city.country : 'default'}</span>
                    </div>
                </div>
                <div className="users-principal-nivel9-frame41">
                    <div className="users-principal-nivel10-frame010">
                        <span className="users-principal-text23">
                            <span className='admin-principal-options-icons'>
                                <i className="fa-solid fa-pen-to-square" onClick={() => editDataItem(city, 'city')}></i>
                                <i className="fa-solid fa-trash" onClick={() => deleteDataItem(city, 'city')}></i>
                            </span>
                        </span>
                    </div>
                </div>

            </div>

        )
    }

    // HTML para las atracciones
    const AdminAttractions = () => {
        return (
            <div className="users-principal-nivel4-frame2" key={'admin-attractions'}>
                <div className="users-principal-nivel5-frame02">
                    <div className="users-principal-nivel6-frame02">
                        <div className="users-principal-nivel7-frame02">
                            <div className="users-principal-nivel8-frame0">
                                <div className="users-principal-nivel9-frame0">
                                    <div className="users-principal-nivel10-frame0">
                                        <span className="users-principal-text04">
                                            <span>Attraction</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="users-principal-nivel9-frame0">
                                    <div className="users-principal-nivel10-frame0">
                                        <span className="users-principal-text04">
                                            <span>Category</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="users-principal-nivel9-frame1">
                                    <div className="users-principal-nivel10-frame001">
                                        <span className="users-principal-text06">
                                            <span>Ciudad</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="users-principal-nivel9-frame2">
                                    <div className="users-principal-nivel10-frame002">
                                        <span className="users-principal-text08">
                                            <span>Pais</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="users-principal-nivel9-frame3">
                                    <div className="users-principal-nivel10-frame003">
                                        <span className="users-principal-text10">
                                            <span>Info</span>
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
                            {filteredItem.map(attraction => attraction.category && (
                                <div id={attraction.attraction} key={attraction.attraction + attraction.id}>
                                    {generateAttraction(attraction)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // Metodo para generar la linea de la attracion
    function generateAttraction(attraction) {
        return (
            <div className="users-principal-nivel8-frame01">
                <div className="users-principal-nivel9-frame01 ">
                    <div className="users-principal-text199">
                        <span className="users-principal-text199">
                            <span>{attraction.attraction ? attraction.attraction : 'default'}</span>
                        </span>
                    </div>
                </div>
                <div className="users-principal-nivel9-frame01">
                    <div className="users-principal-nivel10-frame006">
                        <span className="users-principal-text16">
                            <span>{attraction.category ? attraction.category : 'default'}</span>
                        </span>
                    </div>
                </div>
                <div className="users-principal-nivel9-frame11">
                    <div className="users-principal-nivel10-frame007">
                        <span className="users-principal-text18">
                            <span>{attraction.city ? attraction.city : 'default'}</span>
                        </span>
                    </div>
                </div>
                <div className="users-principal-nivel9-frame21">
                    <div className="users-principal-nivel10-frame008">
                        <span className="users-principal-text20">
                            <span>{attraction.country ? attraction.country : 'default'}</span>
                        </span>
                    </div>
                </div>
                <div className="users-principal-nivel9-frame31">
                    <div className="users-principal-nivel10-frame009">
                        <span className="users-principal-text22">{attraction.info ? attraction.info : 'default'}</span>
                    </div>
                </div>
                <div className="users-principal-nivel9-frame41">
                    <div className="users-principal-nivel10-frame010">
                        <span className="users-principal-text23">
                            <span className='admin-principal-options-icons'>
                                <i className="fa-solid fa-pen-to-square" onClick={() => editDataItem(attraction, 'attraction')}></i>
                                <i className="fa-solid fa-trash" onClick={() => deleteDataItem(attraction, 'attraction')}></i>
                            </span>
                        </span>
                    </div>
                </div>

            </div>

        )
    }

    // Metodo para eliminar una fila sea del modulo que sea
    function deleteDataItem(item, typeData) {
        if (typeData === 'user' && item.username === activeUser.username) {
            alert('You cannot delete yourself!');
        } else {
            let elementToDelete;
            switch (typeData) {
                case 'user':
                    deleteUserByUsername(item.username);
                    elementToDelete = document.getElementById(item.username);
                    break;
                case 'country':
                    deleteCountryByCountry(item.country);
                    elementToDelete = document.getElementById(item.country);
                    break;
                case 'city':
                    deleteCityByCity(item.city);
                    elementToDelete = document.getElementById(item.city);
                    break;
                case 'attraction':
                    deleteAttractionByAttraction(item.attraction);
                    elementToDelete = document.getElementById(item.attraction);
                    break;
                default:
                    break;
            }
            if (elementToDelete) {
                elementToDelete.remove();
            }
        }
    }
    // Metodo para editar una fila sea del modulo que sea
    function editDataItem(item) {
        switch (selectedOption) {
            case 1:
                setUserToEdit(item);
                setSelectedOption(5);
                break;
            case 2:
                setCountryToEdit(item);
                setSelectedOption(6);
                break;
            case 3:
                setCityToEdit(item);
                setSelectedOption(7);
                break;
            case 4:
                setAttractionToEdit(item);
                setSelectedOption(8);
                break;
            default:
                setSelectedOption(1);
        }

    }
    // Funcion para añadir un item, dependiendo de la opcion seleccionada
    function addItem() {
        switch (selectedOption) {
            case 1:
                setSelectedOption(5);
                break;
            case 2:
                setSelectedOption(6);
                break;
            case 3:
                setSelectedOption(7);
                break;
            case 4:
                setSelectedOption(8);
                break;
            default:
                setSelectedOption(1);
        }
    }
    // Funciónes que gestiona que componente se vera
    function RenderAddUser() {
        return <UserInfoCard setSelectedOption={setSelectedOption} />

    }
    function RenderEditUser() {
        return <UserInfoCard setSelectedOption={setSelectedOption} userToEdit={userToEdit} />

    }
    function RenderAddCountry() {
        return <CountryInfoCard setSelectedOption={setSelectedOption} />
    }
    function RenderEditCountry() {
        return <CountryInfoCard setSelectedOption={setSelectedOption} countryToEdit={countryToEdit} />
    }
    function RenderAddCity() {
        return <CityInfoCard setSelectedOption={setSelectedOption} />
    }
    function RenderEditCity() {
        return <CityInfoCard setSelectedOption={setSelectedOption} cityToEdit={cityToEdit} />
    }
    function RenderAddAttraction() {
        return <AttractionInfoCard setSelectedOption={setSelectedOption} />
    }
    function RenderEditAttraction() {
        return <AttractionInfoCard setSelectedOption={setSelectedOption} attractionToEdit={attractionToEdit} />
    }


    // Dependiendo de la opcion seleccionada mostrara un componente u otro.
    let ComponentToRender = null; // Este sera el componente que se va a renderizar.
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
        case 5:
            userToEdit == null ? ComponentToRender = RenderAddUser : ComponentToRender = RenderEditUser;
            break;
        case 6:
            countryToEdit == null ? ComponentToRender = RenderAddCountry : ComponentToRender = RenderEditCountry;
            break;
        case 7:
            cityToEdit == null ? ComponentToRender = RenderAddCity : ComponentToRender = RenderEditCity;
            break;
        case 8:
            attractionToEdit == null ? ComponentToRender = RenderAddAttraction : ComponentToRender = RenderEditAttraction;
            break;
        default:
            ComponentToRender = AdminUser;
            textToFind = 'users';
    }

    // Funcion para eliminar los items guardados
    function deleteDataItemsSelected() {
        setCountryToEdit(null);
        setCityToEdit(null);
        setAttractionToEdit(null);
        setUserToEdit(null);
    }



    return (
        <div className="users-principal-container">
            <div className="users-principal-users">
                <div className="users-principal-nivel4-frame0">
                    <div className="users-principal-nivel5-frame0">
                        <div className="users-principal-nivel6-frame0">
                            <span className="users-principal-text">
                                <span>Admin Dashboard</span>
                            </span>
                        </div>
                    </div>
                </div>
                < Modules />
                {selectedOption >= 1 && selectedOption <= 4 && (
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
                        <div className="users-principal-nivel6-frame20" onClick={() => addItem()}>
                            <span>Add</span>
                        </div>
                    </div>)}
            </div>
            {filteredItem.length === 0 ? ( // Si no hay objetos mostrare un div avisandolo
                <div>
                    <div className="users-principal-nivel4-frame2" >
                        <div className="users-principal-nivel5-frame02" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '72px' }}>
                            <span>No {textToFind} available.</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <ComponentToRender />
                </div>
            )}
        </div>
    )


}



