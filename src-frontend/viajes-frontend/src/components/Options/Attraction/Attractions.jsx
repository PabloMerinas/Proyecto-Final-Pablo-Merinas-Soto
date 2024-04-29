import React, { useState, useEffect } from 'react';
import './attractions.css';
import { getAttractions } from '../../../service/attractionService';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../authContext/autContext';
import { getVisitedPlacesByUsernameAndType, markAsVisitedByUsername, deleteVisitedPlace } from '../../../service/visitedPlaceService';
import { Link } from 'react-router-dom';

export const Attractions = () => {
    const [attractions, setAttractions] = useState([]);
    const [filteredAttractions, setFilteredAttractions] = useState([]);
    const [searchText, setSearchText] = useState('');
    const { activeUser } = useAuth();
    const [visitedPlacesIds, setVisitedPlacesIds] = useState([]);

    // Compruebo si se le ha pasado el valor de la ciudad y si es asi filtro primero
    const activeCity = sessionStorage.getItem('activeCity');

    // Filtro las atracciones basadas en la ciudad activa
    useEffect(() => {
        if (activeCity) {
            const filtered = attractions.filter(attraction =>
                attraction.city.toLowerCase() === activeCity.toLowerCase()
            );
            setFilteredAttractions(filtered);
        } else {
            setFilteredAttractions(attractions);

        }
    }, [attractions, activeCity]);


    // Recupero las atracciones
    useEffect(() => {
        async function fetchAttractions() {
            try {
                const AttractionsData = await getAttractions();
                setAttractions(AttractionsData);
                setFilteredAttractions(AttractionsData);

                // Obtiene los paises visitados del usuario 
                const visitedPlacesIds = await getVisitedPlacesByUsernameAndType(activeUser.username, 'attraction');
                setVisitedPlacesIds(visitedPlacesIds);
            } catch (error) {
                console.error('Error retrieving attractions:', error);
            }
        }

        fetchAttractions();
    }, [activeUser]);



    // Compruebo que haya un usuario activo o devuelvo a login
    if (!activeUser) {
        return <Navigate to="/" />;

    }


    const handleInputChange = (event) => {
        setSearchText(event.target.value || '');
        filterAttractions(event.target.value || ''); // Llamo al metodo para filtrar ( Lo dejo aqui para que se vaya actualizando solo)

    };

    // Filtro para las atracciones, en caso de haber una ciudad ya filtrada se filtrara sobre esa
    const filterAttractions = (text) => {
        let filtered;
        if (activeCity) {
            // Filtrar atracciones por ciudad activa y texto de búsqueda
            filtered = attractions.filter(attraction =>
                attraction.city.toLowerCase() === activeCity.toLowerCase() &&
                attraction.attraction.toLowerCase().includes(text.toLowerCase())
            );
        } else {
            // Filtrar atracciones solo por texto de búsqueda
            filtered = attractions.filter(attraction =>
                attraction.attraction.toLowerCase().includes(text.toLowerCase())
            );
        }
        // Actualizar atracciones filtradas
        setFilteredAttractions(filtered);
    };

    // Metodo para generar la linea del pais y llamar a su tarjeta con la información
    function generateAttraction(attraction, visitedPlaces) {
        const isVisited = visitedPlaces.filter(place => place.id === attraction.id).length > 0;

        // Logica para marcarlo como visitado
        const handleVisitedClick = (attractionId) => {
            // Comprueba si está visitado y si no lo marca
            if (!isVisited) {
                markAsVisitedByUsername(activeUser.username, null, null, attractionId)
                    .then(() => {
                        // Actualiza el estado de visitedPlacesIds cuando se ha completado
                        getVisitedPlacesByUsernameAndType(activeUser.username, 'attraction')
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
                const visitedPlace = visitedPlaces.find(place => place.id === attractionId);
                if (visitedPlace) {
                    deleteVisitedPlace(visitedPlace.visitedPlaceId)
                        .then(() => {
                            // Actualiza el estado de visitedPlacesIds cuando se ha completado
                            getVisitedPlacesByUsernameAndType(activeUser.username, 'attraction')
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
            <div className="attractions-principal-nivel8-frame01">
                <div className="attractions-principal-nivel9-frame01">
                    <div className="attractions-principal-nivel10-frame006">
                        <span className="attractions-principal-text16">
                            <span>{attraction.attraction}</span>
                        </span>
                    </div>
                </div>
                <div className="attractions-principal-nivel9-frame11">
                    <div className="attractions-principal-nivel10-frame007">
                        <span className="attractions-principal-text18">
                            <span>{attraction.category}</span>
                        </span>
                    </div>
                </div>
                <div className="attractions-principal-nivel9-frame21">
                    <div className="attractions-principal-nivel10-frame008">
                        <span className="attractions-principal-text20">
                            <span>{attraction.country}</span>
                        </span>
                    </div>
                </div>
                <div className="attractions-principal-nivel9-frame31">
                    <div className="attractions-principal-nivel10-frame009">
                        <span className="attractions-principal-text22">{attraction.city}</span>
                    </div>
                </div>

                <div className="countries-principal-nivel9-frame51" style={{ marginLeft: '35px' }}>
                    <Link to={`/attractions/${attraction.attraction}`}>
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
                    <div className={`countries-principal-nivel10-frame011 ${isVisited ? 'visited' : ''}`} onClick={() => handleVisitedClick(attraction.id)}>
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
        <div className="attractions-principal-container">
            <div className="attractions-principal-attractions">
                <div className="attractions-principal-nivel4-frame0">
                    <div className="attractions-principal-nivel5-frame0">
                        <div className="attractions-principal-nivel6-frame0">
                            <span className="attractions-principal-text">
                                <span> {activeCity ? 'Attractions from ' + activeCity : 'Attractions'}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="attractions-principal-nivel4-frame1">
                    <div className="attractions-principal-nivel5-frame01">
                        <div className="attractions-principal-nivel6-frame01">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="attractions-principal-nivel6-frame1">
                            <div className="attractions-principal-nivel7-frame01">
                                <span className="attractions-principal-text02">
                                    <input
                                        type="text"
                                        value={searchText}
                                        onChange={handleInputChange}
                                        placeholder="Search attractions" style={{ backgroundColor: 'transparent', width: '860px', border: 'none' }}
                                    /> </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="attractions-principal-nivel4-frame2">
                    <div className="attractions-principal-nivel5-frame02">
                        <div className="attractions-principal-nivel6-frame02">
                            <div className="attractions-principal-nivel7-frame02">
                                <div className="attractions-principal-nivel8-frame0">
                                    <div className="attractions-principal-nivel9-frame0">
                                        <div className="attractions-principal-nivel10-frame0">
                                            <span className="attractions-principal-text04">
                                                <span>Attraction</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="attractions-principal-nivel9-frame1">
                                        <div className="attractions-principal-nivel10-frame001">
                                            <span className="attractions-principal-text06">
                                                <span>Category</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="attractions-principal-nivel9-frame2">
                                        <div className="attractions-principal-nivel10-frame002">
                                            <span className="attractions-principal-text08">
                                                <span>Country</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="attractions-principal-nivel9-frame3">
                                        <div className="attractions-principal-nivel10-frame003">
                                            <span className="attractions-principal-text10">
                                                <span>City</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="attractions-principal-nivel9-frame5">
                                        <div className="attractions-principal-nivel10-frame005">
                                            <span className="attractions-principal-text14">
                                                <span>Actions</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="attractions-principal-nivel7-frame1">
                                {filteredAttractions.map(attraction => (
                                    <div key={attraction.attraction}>
                                        {generateAttraction(attraction, visitedPlacesIds)}
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
