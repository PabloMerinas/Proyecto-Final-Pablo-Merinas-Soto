import React, { useState, useEffect } from 'react';
import './attractions.css';
import { getAttractions } from '../../../service/attractionService';

export const Attractions = () => {
    const [attractions, setAttractions] = useState([]);
    const [filteredAttractions, setFilteredAttractions] = useState([]);
    const [searchText, setSearchText] = useState('');

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
                // Recupero el token
                const token = localStorage.getItem("authToken");
                const AttractionsData = await getAttractions(token);
                setAttractions(AttractionsData);
                setFilteredAttractions(AttractionsData);
            } catch (error) {
                console.error('Error al obtener las atracciones:', error);
            }
        }

        fetchAttractions();
    }, []);



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
    function generateAttraction(attraction, country, city, category, info) {

        // Logica para mostrar las atracciones
        const handleInfoClick = (clickedShowAttractions) => {
            // TODO

        };

        return (
            <div className="attractions-p-rincipal-depth8-frame01">
                <div className="attractions-p-rincipal-depth9-frame01">
                    <div className="attractions-p-rincipal-depth10-frame006">
                        <span className="attractions-p-rincipal-text16">
                            <span>{attraction}</span>
                        </span>
                    </div>
                </div>
                <div className="attractions-p-rincipal-depth9-frame11">
                    <div className="attractions-p-rincipal-depth10-frame007">
                        <span className="attractions-p-rincipal-text18">
                            <span>{country}</span>
                        </span>
                    </div>
                </div>
                <div className="attractions-p-rincipal-depth9-frame21">
                    <div className="attractions-p-rincipal-depth10-frame008">
                        <span className="attractions-p-rincipal-text20">
                            <span>{city}</span>
                        </span>
                    </div>
                </div>
                <div className="attractions-p-rincipal-depth9-frame31">
                    <div className="attractions-p-rincipal-depth10-frame009">
                        <span className="attractions-p-rincipal-text22">{category}</span>
                    </div>
                </div>
                <div className="attractions-p-rincipal-depth9-frame41">
                    <div className="attractions-p-rincipal-depth10-frame010">
                        <span className="attractions-p-rincipal-text23">
                            <span>{info}</span>
                        </span>
                    </div>
                </div>
                <div className="attractions-p-rincipal-depth9-frame51">
                    <div onClick={() => handleInfoClick(attraction)} className="attractions-p-rincipal-depth10-frame011">
                        <div className="attractions-p-rincipal-depth11-frame0">
                            <div className="attractions-p-rincipal-depth12-frame0">
                                <span className="attractions-p-rincipal-text25">
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
        <div className="attractions-p-rincipal-container">
            <div className="attractions-p-rincipal-attractions">
                <div className="attractions-p-rincipal-depth4-frame0">
                    <div className="attractions-p-rincipal-depth5-frame0">
                        <div className="attractions-p-rincipal-depth6-frame0">
                            <span className="attractions-p-rincipal-text">
                                <span> {activeCity ? 'Attractions from ' + activeCity : 'Attractions'}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="attractions-p-rincipal-depth4-frame1">
                    <div className="attractions-p-rincipal-depth5-frame01">
                        <div className="attractions-p-rincipal-depth6-frame01">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="attractions-p-rincipal-depth6-frame1">
                            <div className="attractions-p-rincipal-depth7-frame01">
                                <span className="attractions-p-rincipal-text02">
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
                <div className="attractions-p-rincipal-depth4-frame2">
                    <div className="attractions-p-rincipal-depth5-frame02">
                        <div className="attractions-p-rincipal-depth6-frame02">
                            <div className="attractions-p-rincipal-depth7-frame02">
                                <div className="attractions-p-rincipal-depth8-frame0">
                                    <div className="attractions-p-rincipal-depth9-frame0">
                                        <div className="attractions-p-rincipal-depth10-frame0">
                                            <span className="attractions-p-rincipal-text04">
                                                <span>Attraction</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="attractions-p-rincipal-depth9-frame1">
                                        <div className="attractions-p-rincipal-depth10-frame001">
                                            <span className="attractions-p-rincipal-text06">
                                                <span>Country</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="attractions-p-rincipal-depth9-frame2">
                                        <div className="attractions-p-rincipal-depth10-frame002">
                                            <span className="attractions-p-rincipal-text08">
                                                <span>City</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="attractions-p-rincipal-depth9-frame3">
                                        <div className="attractions-p-rincipal-depth10-frame003">
                                            <span className="attractions-p-rincipal-text10">
                                                <span>Category</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="attractions-p-rincipal-depth9-frame4">
                                        <div className="attractions-p-rincipal-depth10-frame004">
                                            <span className="attractions-p-rincipal-text12">
                                                <span>Info</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="attractions-p-rincipal-depth9-frame5">
                                        <div className="attractions-p-rincipal-depth10-frame005">
                                            <span className="attractions-p-rincipal-text14">
                                                <span>Checked</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="attractions-p-rincipal-depth7-frame1">
                                {filteredAttractions.map(attraction => (
                                    <div key={attraction.id}>
                                        {generateAttraction(attraction.attraction, attraction.country, attraction.city, attraction.category, attraction.info)}
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
