import React, { useState, useEffect } from 'react';
import './countries.css';
import { getCountries } from "../../service/getCountries";

function generateCountry(country, countryCode, currencyCode, currencySymbol, languageCode, info) {

    const handleInfoClick = (info) => {
        // TODO agregar popup
    };

    const handleReloadClick = () => {
        window.location.reload();
    };

    return (
        <div className="countries-p-rincipal-depth8-frame01">
            <div className="countries-p-rincipal-depth9-frame01">
                <div className="countries-p-rincipal-depth10-frame006">
                    <span className="countries-p-rincipal-text16">
                        <span>{country}</span>
                    </span>
                </div>
            </div>
            <div className="countries-p-rincipal-depth9-frame11">
                <div className="countries-p-rincipal-depth10-frame007">
                    <span className="countries-p-rincipal-text18">
                        <span>{countryCode}</span>
                    </span>
                </div>
            </div>
            <div className="countries-p-rincipal-depth9-frame21">
                <div className="countries-p-rincipal-depth10-frame008">
                    <span className="countries-p-rincipal-text20">
                        <span>{currencyCode}</span>
                    </span>
                </div>
            </div>
            <div className="countries-p-rincipal-depth9-frame31">
                <div className="countries-p-rincipal-depth10-frame009">
                    <span className="countries-p-rincipal-text22">{currencySymbol}</span>
                </div>
            </div>
            <div className="countries-p-rincipal-depth9-frame41">
                <div className="countries-p-rincipal-depth10-frame010">
                    <span className="countries-p-rincipal-text23">
                        <span>{languageCode}</span>
                    </span>
                </div>
            </div>
            <div className="countries-p-rincipal-depth9-frame51">
                <div onClick={() => handleInfoClick(info)} className="countries-p-rincipal-depth10-frame011">
                    <div className="countries-p-rincipal-depth11-frame0">
                        <div className="countries-p-rincipal-depth12-frame0">
                            <span className="countries-p-rincipal-text25">
                                <span>Info</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export const Countries = () => {
    const [countries, setCountries] = useState([]);

    // Recupero el token
    const token = localStorage.getItem("authToken");
    // Recupero las ciudades

    useEffect(() => {
        async function fetchCountries() {
            try {
                const countriesData = await getCountries(token);
                setCountries(countriesData);
            } catch (error) {
                console.error('Error al obtener los países:', error);
            }
        }

        fetchCountries();
    }, []);

    // Manejo la logica de la barra de busqueda
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO LOGICA
        
    };

    return (
        <div className="countries-p-rincipal-container">
            <div className="countries-p-rincipal-countries">
                <div className="countries-p-rincipal-depth4-frame0">
                    <div className="countries-p-rincipal-depth5-frame0">
                        <div className="countries-p-rincipal-depth6-frame0">
                            <span className="countries-p-rincipal-text">
                                <span>Countries</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="countries-p-rincipal-depth4-frame1">
                    <div className="countries-p-rincipal-depth5-frame01">
                        <div className="countries-p-rincipal-depth6-frame01">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="countries-p-rincipal-depth6-frame1">
                                <div className="countries-p-rincipal-depth7-frame01">
                                    <span className="countries-p-rincipal-text02">
                                        <input
                                            type="text"
                                            value={searchText}
                                            onChange={handleInputChange}
                                            placeholder="Buscar países" style={{ backgroundColor: 'transparent', width: '860px', border: 'none' }}
                                        /> </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="countries-p-rincipal-depth4-frame2">
                    <div className="countries-p-rincipal-depth5-frame02">
                        <div className="countries-p-rincipal-depth6-frame02">
                            <div className="countries-p-rincipal-depth7-frame02">
                                <div className="countries-p-rincipal-depth8-frame0">
                                    <div className="countries-p-rincipal-depth9-frame0">
                                        <div className="countries-p-rincipal-depth10-frame0">
                                            <span className="countries-p-rincipal-text04">
                                                <span>Country</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="countries-p-rincipal-depth9-frame1">
                                        <div className="countries-p-rincipal-depth10-frame001">
                                            <span className="countries-p-rincipal-text06">
                                                <span>Country code</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="countries-p-rincipal-depth9-frame2">
                                        <div className="countries-p-rincipal-depth10-frame002">
                                            <span className="countries-p-rincipal-text08">
                                                <span>Currency code</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="countries-p-rincipal-depth9-frame3">
                                        <div className="countries-p-rincipal-depth10-frame003">
                                            <span className="countries-p-rincipal-text10">
                                                <span>Currency symbol</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="countries-p-rincipal-depth9-frame4">
                                        <div className="countries-p-rincipal-depth10-frame004">
                                            <span className="countries-p-rincipal-text12">
                                                <span>Language code</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="countries-p-rincipal-depth9-frame5">
                                        <div className="countries-p-rincipal-depth10-frame005">
                                            <span className="countries-p-rincipal-text14">
                                                <span>Info</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="countries-p-rincipal-depth7-frame1">
                                {countries.map(country => (
                                    <div key={country.id}>
                                        {generateCountry(country.country, country.countryCode, country.currencyCode, country.currencySymbol, country.languageCode, country.info)}
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