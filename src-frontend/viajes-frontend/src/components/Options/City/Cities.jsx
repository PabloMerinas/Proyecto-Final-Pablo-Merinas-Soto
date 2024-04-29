import React, { useState, useEffect } from 'react';
import './cities.css';
import { getCities } from '../../../service/cityService';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../authContext/autContext';
import { getVisitedPlacesByUsernameAndType, markAsVisitedByUsername, deleteVisitedPlace } from '../../../service/visitedPlaceService';
import { Link } from 'react-router-dom';

export const Cities = () => {
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const { activeUser } = useAuth();
    const [visitedPlacesIds, setVisitedPlacesIds] = useState([]);

    // Compruebo si se le ha pasado el valor del pais y si es asi filtro primero
    const activeCountry = sessionStorage.getItem('activeCountry');

    // Filtro las ciudades basadas en el pais activo
    useEffect(() => {
        if (activeCountry) {
            const filtered = cities.filter(city =>
                city.country.toLowerCase() === activeCountry.toLowerCase()
            );
            setFilteredCities(filtered);
        } else {
            setFilteredCities(cities);

        }
    }, [cities, activeCountry]);

    // Recupero las ciudades
    useEffect(() => {
        async function fetchCities() {
            try {
                const CitiesData = await getCities();
                setCities(CitiesData);
                setFilteredCities(CitiesData);

                // Obtiene los paises visitados del usuario 
                const visitedPlacesIds = await getVisitedPlacesByUsernameAndType(activeUser.username, 'city');
                setVisitedPlacesIds(visitedPlacesIds);
            } catch (error) {
                console.error('Error retrieving cities:', error);
            }
        }

        fetchCities();
    }, [activeUser]);

    // Compruebo que haya un usuario activo o devuelvo a login
    if (!activeUser) {
        return <Navigate to="/" />;

    }

    const handleInputChange = (event) => {
        setSearchText(event.target.value || '');
        filterCities(event.target.value || ''); // Llamo al metodo para filtrar ( Lo dejo aqui para que se vaya actualizando solo)

    };

    // Metodo para filtrar ciudades
    const filterCities = (text) => {
        let filtered;
        if (activeCountry) {
            // Filtrar ciudades por el país activo y su texto de búsqueda
            filtered = cities.filter(city =>
                city.country.toLowerCase() === activeCountry.toLowerCase() &&
                city.city.toLowerCase().includes(text.toLowerCase())
            );
        } else {
            // Filtrar ciudades solo por el texto de búsqueda
            filtered = cities.filter(city =>
                city.city.toLowerCase().includes(text.toLowerCase())
            );
        }
        // Actualiza las ciudades
        setFilteredCities(filtered);
    };

    // Metodo para generar la linea del pais y llamar a su tarjeta con la información
    function generateCity(city, visitedPlaces) {
        const isVisited = visitedPlaces.filter(place => place.id === city.id).length > 0;

        // Logica para mostrar las ciudades
        const handleAttractionsClick = (city) => {
            sessionStorage.setItem('activeCity', city.city);
            navigate('/attractions');
        };
        // Logica para marcarlo como visitado
        const handleVisitedClick = (cityId) => {
            // Comprueba si está visitado y si no lo marca
            if (!isVisited) {
                markAsVisitedByUsername(activeUser.username, null, cityId)
                    .then(() => {
                        // Actualiza el estado de visitedPlacesIds cuando se ha completado
                        getVisitedPlacesByUsernameAndType(activeUser.username, 'city')
                            .then(updatedVisitedPlacesIds => {
                                setVisitedPlacesIds(updatedVisitedPlacesIds);
                            })
                            .catch(error => {
                                console.error('Error updating visited places:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Error marking visited place:', error);
                    });
            } else {
                const visitedPlace = visitedPlaces.find(place => place.id === cityId);
                if (visitedPlace) {
                    deleteVisitedPlace(visitedPlace.visitedPlaceId)
                        .then(() => {
                            // Actualiza el estado de visitedPlacesIds cuando se ha completado
                            getVisitedPlacesByUsernameAndType(activeUser.username, 'city')
                                .then(updatedVisitedPlacesIds => {
                                    setVisitedPlacesIds(updatedVisitedPlacesIds);
                                })
                                .catch(error => {
                                    console.error('Error updating visited places:', error);
                                });
                        })
                        .catch(error => {
                            console.error('Error deleting visited place:', error);
                        });
                }
            }
        };
        return (
            <div className="countries-principal-nivel8-frame01">
                <div className="countries-principal-nivel9-frame01">
                    <div className="countries-principal-nivel10-frame006">
                        <span className="countries-principal-text16">
                            <span>{city.city}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-principal-nivel9-frame11">
                    <div className="countries-principal-nivel10-frame007">
                        <span className="countries-principal-text18">
                            <span>{city.country}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-principal-nivel9-frame21">
                    <div className="countries-principal-nivel10-frame008">
                        <span className="countries-principal-text20">
                            <span>{city.state}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-principal-nivel9-frame31">
                    <div className="countries-principal-nivel10-frame009">
                        <span className="countries-principal-text22">{city.airportCode}</span>
                    </div>
                </div>
                <div className="countries-principal-nivel9-frame41">
                    <div className="countries-principal-nivel10-frame010">
                        <span className="countries-principal-text23">
                            <span>{city.population}</span>
                        </span>
                    </div>
                </div>
                <div className="countries-principal-nivel9-frame51" style={{ marginLeft: '-35px' }}>
                    <Link to={`/cities/${city.city}`}>
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
                    <div className="countries-principal-nivel10-frame011" onClick={() => handleAttractionsClick(city)} >
                        <div className="countries-principal-nivel11-frame0">
                            <div className="countries-principal-nivel12-frame0">
                                <span className="countries-principal-text25">
                                    <span>Attractions!</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={`countries-principal-nivel10-frame011 ${isVisited ? 'visited' : ''}`} onClick={() => handleVisitedClick(city.id)}>
                        <div className="countries-principal-nivel11-frame0">
                            <div className="countries-principal-nivel12-frame0">
                                <span className="countries-principal-text25">
                                    <span>{isVisited ? <i className="fa-solid fa-check" style={{ color: '#3ba786' }}></i> : <i className="fa-solid fa-check"></i>}</span>
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
                                <span>{activeCountry ? 'Cities from ' + activeCountry : 'Cities'}</span>
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
                                        placeholder="Search cities" style={{ backgroundColor: 'transparent', width: '860px', border: 'none' }}
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
                                                <span>Actions</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cities-principal-nivel7-frame1">
                                {filteredCities.map(city => (
                                    <div key={city.city}>
                                        {generateCity(city, visitedPlacesIds)}
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
