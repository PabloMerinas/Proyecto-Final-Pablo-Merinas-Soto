import React, { useState, useEffect } from 'react';
import './countries.css';
import { getCountries } from '../../../service/countryService';
import { useAuth } from '../../../authContext/autContext';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [searchText, setSearchText] = useState('');
    const { activeUser } = useAuth();
    const navigate = useNavigate();

    // Recupero los paises
    useEffect(() => {
        async function fetchCountries() {
            try {
                // Recupero el token
                const token = localStorage.getItem("authToken");
                const countriesData = await getCountries(token);
                setCountries(countriesData);
                setFilteredCountries(countriesData);
            } catch (error) {
                console.error('Error al obtener los países:', error);
            }
        }

        fetchCountries();
    }, []);

    // Compruebo que haya un usuario activo o devuelvo a login
    if (!activeUser) {
        return <Navigate to="/" />;

    }


    const handleInputChange = (event) => {
        setSearchText(event.target.value || '');
        filterCountries(event.target.value || ''); // Llamo al metodo para filtrar ( Lo dejo aqui para que se vaya actualizando solo)

    };
    // Metodo para filtrar paises
    const filterCountries = (text) => {
        const filtered = countries.filter(country =>
            country.country.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredCountries(filtered);
    };

    // Metodo para generar la linea del pais y llamar a su tarjeta con la información
    function generateCountry(country, capital, currencyCode, currencySymbol, languageCode) {
        // Logica para mostrar las atracciones
        const handleCitiesClick = (country) => {
            sessionStorage.setItem('activeCountry', country);
            navigate('/cities');
        };
        return (
            <div className="countries-principal-nivel8-frame01">
                <div className="countries-principal-nivel9-frame01">
                    <div className="countries-principal-nivel10-frame006">
                        <span className="countries-principal-text16">
                            <span>{country}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-principal-nivel9-frame11">
                    <div className="countries-principal-nivel10-frame007">
                        <span className="countries-principal-text18">
                            <span>{capital}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-principal-nivel9-frame21">
                    <div className="countries-principal-nivel10-frame008">
                        <span className="countries-principal-text20">
                            <span>{currencyCode}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-principal-nivel9-frame31">
                    <div className="countries-principal-nivel10-frame009">
                        <span className="countries-principal-text22">{currencySymbol}</span>
                    </div>
                </div>
                <div className="countries-principal-nivel9-frame41">
                    <div className="countries-principal-nivel10-frame010">
                        <span className="countries-principal-text23">
                            <span>{languageCode}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-principal-nivel9-frame51">
                    <Link to={`/countries/${country}`}>
                        <div className="countries-principal-nivel10-frame011">
                            <div className="countries-principal-nivel11-frame0">
                                <div className="countries-principal-nivel12-frame0">
                                    <span className="countries-principal-text25">
                                        <span><i className="fa-solid fa-eye"></i></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="countries-principal-nivel10-frame011" onClick={() => handleCitiesClick(country)} >
                        <div className="countries-principal-nivel11-frame0">
                            <div className="countries-principal-nivel12-frame0">
                                <span className="countries-principal-text25">
                                    <span>Cities</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="countries-principal-nivel10-frame011">
                        <div className="countries-principal-nivel11-frame0">
                            <div className="countries-principal-nivel12-frame0">
                                <span className="countries-principal-text25">
                                    <span><i className="fa-solid fa-check"></i></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }

    return (
        <div className="countries-principal-container">
            <div className="countries-principal-countries">
                <div className="countries-principal-nivel4-frame0">
                    <div className="countries-principal-nivel5-frame0">
                        <div className="countries-principal-nivel6-frame0">
                            <span className="countries-principal-text">
                                <span>Countries</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="countries-principal-nivel4-frame1">
                    <div className="countries-principal-nivel5-frame01">
                        <div className="countries-principal-nivel6-frame01">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="countries-principal-nivel6-frame1">
                            <div className="countries-principal-nivel7-frame01">
                                <span className="countries-principal-text02">
                                    <input
                                        type="text"
                                        value={searchText}
                                        onChange={handleInputChange}
                                        placeholder="Buscar países" style={{ backgroundColor: 'transparent', width: '860px', border: 'none' }}
                                    /> </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="countries-principal-nivel4-frame2">
                    <div className="countries-principal-nivel5-frame02">
                        <div className="countries-principal-nivel6-frame02">
                            <div className="countries-principal-nivel7-frame02">
                                <div className="countries-principal-nivel8-frame0">
                                    <div className="countries-principal-nivel9-frame0">
                                        <div className="countries-principal-nivel10-frame0">
                                            <span className="countries-principal-text04">
                                                <span>Country</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="countries-principal-nivel9-frame1">
                                        <div className="countries-principal-nivel10-frame001">
                                            <span className="countries-principal-text06">
                                                <span>Capital</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="countries-principal-nivel9-frame2">
                                        <div className="countries-principal-nivel10-frame002">
                                            <span className="countries-principal-text08">
                                                <span>Currency code</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="countries-principal-nivel9-frame3">
                                        <div className="countries-principal-nivel10-frame003">
                                            <span className="countries-principal-text10">
                                                <span>Currency symbol</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="countries-principal-nivel9-frame4">
                                        <div className="countries-principal-nivel10-frame004">
                                            <span className="countries-principal-text12">
                                                <span>Language code</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="countries-principal-nivel9-frame5">
                                        <div className="countries-principal-nivel10-frame005">
                                            <span className="countries-principal-text14">
                                                <span>Actions</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="countries-principal-nivel7-frame1">
                                {filteredCountries.map(country => (
                                    <div key={country.id}>
                                        {generateCountry(country.country, country.capital, country.currencyCode, country.currencySymbol, country.languageCode)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}