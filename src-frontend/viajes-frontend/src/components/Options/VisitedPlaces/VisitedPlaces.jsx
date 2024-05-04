import { React, useState, useEffect } from "react";
import './visitedPlaces.css'
import { useAuth } from "../../../authContext/autContext";
import { Navigate } from "react-router-dom";
import { getVisitedPlacesByUsernameAndType } from "../../../service/visitedPlaceService";
import { getCountries } from "../../../service/countryService";
import { getCities } from "../../../service/cityService";
import { getAttractions } from "../../../service/attractionService";
import { Link } from "react-router-dom";

export const VisitedPlaces = () => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [attractions, setAttractions] = useState([]);
    const { activeUser } = useAuth();

    // Recupero los paises, ciudades y atracciones
    useEffect(() => {
        async function fetchData() {
            try {
                // Obtiene los paises visitados del usuario 
                const countriesData = await getCountries();
                const visitedCountriesIds = await getVisitedPlacesByUsernameAndType(activeUser.username, 'country');
                const visitedCountries = visitedCountriesIds.map(visitedCountry => {
                    const foundCountry = countriesData.find(country => country.id === visitedCountry.id);
                    return {
                        ...visitedCountry,
                        details: foundCountry
                    };
                })
                setCountries(visitedCountries);
                // Obtiene las ciudades visitadas del usuario 
                const citiesData = await getCities();
                const visitedCitiesIds = await getVisitedPlacesByUsernameAndType(activeUser.username, 'city');
                const visitedCities = visitedCitiesIds.map(visitedCity => {
                    const foundCity = citiesData.find(city => city.id === visitedCity.id);
                    return {
                        ...visitedCity,
                        details: foundCity
                    };
                })
                setCities(visitedCities);

                // Obtiene las atracciones visitadas del usuario 
                const attractionsData = await getAttractions();
                const visitedAttractionsIds = await getVisitedPlacesByUsernameAndType(activeUser.username, 'attraction');
                const visitedAttractions = visitedAttractionsIds.map(visitedAttraction => {
                    const foundAttraction = attractionsData.find(attraction => attraction.id === visitedAttraction.id);
                    return {
                        ...visitedAttraction,
                        details: foundAttraction
                    };
                })
                setAttractions(visitedAttractions);

            } catch (error) {
                console.error('Error retrieving the visited places:', error);
            }
        }

        if (activeUser) {
            fetchData();
        }
    }, [activeUser]);

    // Compruebo que haya un usuario activo o devuelvo a login
    if (!activeUser) {
        return <Navigate to="/" />;

    }

    // Metodo para generar una card
    function generateCard(img, title, link) {
        return (
            <Link to={link}>
                <div className="visited-places-visited-place-item1">
                    <div className="visited-places-img1">
                        <img src={img} alt="visited place" style={{ borderRadius: '12px' }} />
                    </div>
                    <span className="visited-places-text4">
                        <span>{title}</span>
                    </span>
                </div>
            </Link>
        )
    }

    return (
        <div className="visited-places-container">
            <div className="visited-places-visited-places-page">
                <div className="visited-places-visited-place-title">
                    <div className="visited-places-depth5-frame0">
                        <div className="visited-places-depth6-frame0">
                            <div className="visited-places-depth7-frame0">
                                <span className="visited-places-text">
                                    <span>Visited places</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <h3>Countries visited</h3>
                <div className="visited-places-visited-place-grid">
                    {countries.length > 0 ? (
                        countries.map(country => (
                            <div key={country.details.country}>
                                {generateCard(country.details.imgUrl, country.details.country, `/countries/${country.details.country}`)}
                            </div>
                        ))
                    ) : (
                        <p>No countries visited.</p>
                    )}
                </div>
                <h3>Cities visited</h3>
                <div className="visited-places-visited-place-grid">
                    {cities.length > 0 ? (
                        cities.map(city => (
                            <div key={city.details.city}>
                                {generateCard(city.details.imgUrl, city.details.city, `/cities/${city.details.city}`)}
                            </div>
                        ))
                    ) : (
                        <p>No cities visited.</p>
                    )}
                </div>
                <h3>Attractions visited</h3>
                <div className="visited-places-visited-place-grid">
                    {attractions.length > 0 ? (
                        attractions.map(attraction => (
                            <div key={attraction.details.attraction}>
                                {generateCard(attraction.details.imgUrl, attraction.details.attraction, `/attractions/${attraction.details.attraction}`)}
                            </div>
                        ))
                    ) : (
                        <p>No attractions visited.</p>
                    )}
                </div>

            </div>
        </div>
    )
}