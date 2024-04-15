import React, { useState, useEffect } from 'react';
import './cities.css';
import { getCities } from '../../../service/cityService';
import { useNavigate } from 'react-router-dom';

export const Cities = () => {
    const [cities, setCities] = useState([]);
    const [filteredCities, setfilteredCities] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    // Compruebo si se le ha pasado el valor del pais y si es asi filtro primero
    const activeCountry = sessionStorage.getItem('activeCountry');

    // Filtro las ciudades basadas en el pais activo
    useEffect(() => {
        if (activeCountry) {
            const filtered = cities.filter(city =>
                city.country.toLowerCase() === activeCountry.toLowerCase()
            );
            setfilteredCities(filtered);
        } else {
            setfilteredCities(cities);

        }
    }, [cities, activeCountry]);

    // Recupero las ciudades
    useEffect(() => {
        async function fetchCities() {
            try {
                // Recupero el token
                const token = localStorage.getItem("authToken");
                const citiesData = await getCities(token);
                setCities(citiesData);
                setfilteredCities(citiesData);
            } catch (error) {
                console.error('Error retrieving cities:', error);
            }
        }

        fetchCities();
    }, []);



    const handleInputChange = (event) => {
        setSearchText(event.target.value || '');
        filterCities(event.target.value || ''); // Llamo al metodo para filtrar ( Lo dejo aqui para que se vaya actualizando solo)

    };

    // Metodo para filtrar ciudades
    const filterCities = (text) => {
        const filtered = cities.filter(city =>
            city.city.toLowerCase().includes(text.toLowerCase())
        );
        setfilteredCities(filtered);
    };




    // Metodo para generar la linea del pais y llamar a su tarjeta con la información
    function generateCity(city, country, state, airportCode, population) {

        // Logica para mostrar las atracciones
        const handleInfoClick = (city) => {
            sessionStorage.setItem('activeCity', city);
            navigate('/attractions');
        };

        return (
            <div className="countries-principal-nivel8-frame01">
                <div className="countries-principal-nivel9-frame01">
                    <div className="countries-principal-nivel10-frame006">
                        <span className="countries-principal-text16">
                            <span>{city}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-principal-nivel9-frame11">
                    <div className="countries-principal-nivel10-frame007">
                        <span className="countries-principal-text18">
                            <span>{country}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-principal-nivel9-frame21">
                    <div className="countries-principal-nivel10-frame008">
                        <span className="countries-principal-text20">
                            <span>{state}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-principal-nivel9-frame31">
                    <div className="countries-principal-nivel10-frame009">
                        <span className="countries-principal-text22">{airportCode}</span>
                    </div>
                </div>
                <div className="countries-principal-nivel9-frame41">
                    <div className="countries-principal-nivel10-frame010">
                        <span className="countries-principal-text23">
                            <span>{population}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-principal-nivel9-frame51">
                    <div onClick={() => handleInfoClick(city)} className="countries-principal-nivel10-frame011">
                        <div className="countries-principal-nivel11-frame0">
                            <div className="countries-principal-nivel12-frame0">
                                <span className="countries-principal-text25">
                                    <span>Show</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }

    return (
        <div className="cities-principal-container">
            <div className="cities-principal-cities">
                <div className="cities-principal-nivel4-frame0">
                    <div className="cities-principal-nivel5-frame0">
                        <div className="cities-principal-nivel6-frame0">
                            <span className="cities-principal-text">
                                <span>{activeCountry ? 'Cities from '+ activeCountry : 'Cities'}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cities-principal-nivel4-frame1">
                    <div className="cities-principal-nivel5-frame01">
                        <div className="cities-principal-nivel6-frame01">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="cities-principal-nivel6-frame1">
                            <div className="cities-principal-nivel7-frame01">
                                <span className="cities-principal-text02">
                                    <input
                                        type="text"
                                        value={searchText}
                                        onChange={handleInputChange}
                                        placeholder="Buscar ciudades" style={{ backgroundColor: 'transparent', width: '860px', border: 'none' }}
                                    /> </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cities-principal-nivel4-frame2">
                    <div className="cities-principal-nivel5-frame02">
                        <div className="cities-principal-nivel6-frame02">
                            <div className="cities-principal-nivel7-frame02">
                                <div className="cities-principal-nivel8-frame0">
                                    <div className="cities-principal-nivel9-frame0">
                                        <div className="cities-principal-nivel10-frame0">
                                            <span className="cities-principal-text04">
                                                <span>City</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cities-principal-nivel9-frame1">
                                        <div className="cities-principal-nivel10-frame001">
                                            <span className="cities-principal-text06">
                                                <span>Country</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cities-principal-nivel9-frame2">
                                        <div className="cities-principal-nivel10-frame002">
                                            <span className="cities-principal-text08">
                                                <span>State</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cities-principal-nivel9-frame3">
                                        <div className="cities-principal-nivel10-frame003">
                                            <span className="cities-principal-text10">
                                                <span>AirportCode</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cities-principal-nivel9-frame4">
                                        <div className="cities-principal-nivel10-frame004">
                                            <span className="cities-principal-text12">
                                                <span>Population</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cities-principal-nivel9-frame5">
                                        <div className="cities-principal-nivel10-frame005">
                                            <span className="cities-principal-text14">
                                                <span>Attractions</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cities-principal-nivel7-frame1">
                                {filteredCities.map(city => (
                                    <div key={city.id}>
                                        {generateCity(city.city, city.country, city.state, city.airportCode, city.population)}
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
