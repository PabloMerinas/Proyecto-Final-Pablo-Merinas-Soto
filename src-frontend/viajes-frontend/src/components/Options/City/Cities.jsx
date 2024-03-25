import React, { useState, useEffect } from 'react';
import './cities.css';
import { getCities } from '../../../service/cityService';

export const Cities = () => {
    const [cities, setCities] = useState([]);
    const [filteredCities, setfilteredCities] = useState([]);
    const [searchText, setSearchText] = useState('');


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
                console.error('Error al obtener las ciudades:', error);
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
        const handleInfoClick = (clickedShowAttractions) => {


        };

        return (
            <div className="countries-p-rincipal-depth8-frame01">
                <div className="countries-p-rincipal-depth9-frame01">
                    <div className="countries-p-rincipal-depth10-frame006">
                        <span className="countries-p-rincipal-text16">
                            <span>{city}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-p-rincipal-depth9-frame11">
                    <div className="countries-p-rincipal-depth10-frame007">
                        <span className="countries-p-rincipal-text18">
                            <span>{country}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-p-rincipal-depth9-frame21">
                    <div className="countries-p-rincipal-depth10-frame008">
                        <span className="countries-p-rincipal-text20">
                            <span>{state}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-p-rincipal-depth9-frame31">
                    <div className="countries-p-rincipal-depth10-frame009">
                        <span className="countries-p-rincipal-text22">{airportCode}</span>
                    </div>
                </div>
                <div className="countries-p-rincipal-depth9-frame41">
                    <div className="countries-p-rincipal-depth10-frame010">
                        <span className="countries-p-rincipal-text23">
                            <span>{population}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-p-rincipal-depth9-frame51">
                    <div onClick={() => handleInfoClick(city)} className="countries-p-rincipal-depth10-frame011">
                        <div className="countries-p-rincipal-depth11-frame0">
                            <div className="countries-p-rincipal-depth12-frame0">
                                <span className="countries-p-rincipal-text25">
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
        <div className="cities-p-rincipal-container">
            <div className="cities-p-rincipal-cities">
                <div className="cities-p-rincipal-depth4-frame0">
                    <div className="cities-p-rincipal-depth5-frame0">
                        <div className="cities-p-rincipal-depth6-frame0">
                            <span className="cities-p-rincipal-text">
                                <span>Cities</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cities-p-rincipal-depth4-frame1">
                    <div className="cities-p-rincipal-depth5-frame01">
                        <div className="cities-p-rincipal-depth6-frame01">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="cities-p-rincipal-depth6-frame1">
                            <div className="cities-p-rincipal-depth7-frame01">
                                <span className="cities-p-rincipal-text02">
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
                <div className="cities-p-rincipal-depth4-frame2">
                    <div className="cities-p-rincipal-depth5-frame02">
                        <div className="cities-p-rincipal-depth6-frame02">
                            <div className="cities-p-rincipal-depth7-frame02">
                                <div className="cities-p-rincipal-depth8-frame0">
                                    <div className="cities-p-rincipal-depth9-frame0">
                                        <div className="cities-p-rincipal-depth10-frame0">
                                            <span className="cities-p-rincipal-text04">
                                                <span>City</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cities-p-rincipal-depth9-frame1">
                                        <div className="cities-p-rincipal-depth10-frame001">
                                            <span className="cities-p-rincipal-text06">
                                                <span>Country</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cities-p-rincipal-depth9-frame2">
                                        <div className="cities-p-rincipal-depth10-frame002">
                                            <span className="cities-p-rincipal-text08">
                                                <span>State</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cities-p-rincipal-depth9-frame3">
                                        <div className="cities-p-rincipal-depth10-frame003">
                                            <span className="cities-p-rincipal-text10">
                                                <span>AirportCode</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cities-p-rincipal-depth9-frame4">
                                        <div className="cities-p-rincipal-depth10-frame004">
                                            <span className="cities-p-rincipal-text12">
                                                <span>Population</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cities-p-rincipal-depth9-frame5">
                                        <div className="cities-p-rincipal-depth10-frame005">
                                            <span className="cities-p-rincipal-text14">
                                                <span>Attractions</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cities-p-rincipal-depth7-frame1">
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
