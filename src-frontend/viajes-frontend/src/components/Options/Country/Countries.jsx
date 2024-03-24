import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import './countries.css';
import { getCountries } from "../../../service/getCountries";
import { CountryInfoCard } from './CountryInfoCard';



export const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [searchText, setSearchText] = useState('');

    // Recupero el token
    const token = localStorage.getItem("authToken");
    // Recupero las ciudades

    useEffect(() => {
        async function fetchCountries() {
            try {
                const countriesData = await getCountries(token);
                setCountries(countriesData);
                setFilteredCountries(countriesData);
            } catch (error) {
                console.error('Error al obtener los países:', error);
            }
        }

        fetchCountries();
    }, []);


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

        // Logica para renderizar la tarjeta del pais
        const handleInfoClick = (clickedCountry) => {
            // Elimino la lista
            const parentElement = document.querySelector('.countries-p-rincipal-countries');
            while (parentElement.firstChild) {
                parentElement.removeChild(parentElement.firstChild);
            }

            const newCountryInfoCard = document.createElement('div');
            newCountryInfoCard.className = 'country-info-card';

            // Crear el componente CountryInfoCard con los datos del country seleccionado
            const actualCountry = filteredCountries.find(country => country.country === clickedCountry);
            const countryInfoCardComponent = <CountryInfoCard 
            capital={actualCountry.capital}
            country={actualCountry.country}
            countryCode={actualCountry.countryCode}
            currencyCode={actualCountry.currencyCode}
            currencySymbol={actualCountry.currencySymbol}
            imgUrl={actualCountry.imgUrl}
            info={actualCountry.info}
            population={actualCountry.population}
            languageCode={actualCountry.languageCode}
            />

            // Incorporo el componente
            newCountryInfoCard.innerHTML = ReactDOMServer.renderToStaticMarkup(countryInfoCardComponent);
            parentElement.appendChild(newCountryInfoCard);

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
                            <span>{capital}</span>
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
                    <div onClick={() => handleInfoClick(country)} className="countries-p-rincipal-depth10-frame011">
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
                                                <span>Capital</span>
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