import React, { useEffect, useState } from 'react';
import './cityInfoCard.css';
import { useParams } from 'react-router-dom';
import { getCityByCity } from '../../../service/cityService';

export const CityInfoCard = ({ }) => {
    const { city: cityParam } = useParams();
    const [actualCity, setActualCity] = useState(null);


    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const cityData = await getCityByCity(cityParam);
                setActualCity(cityData);
            } catch (error) {
                console.error('Error fetching the city:', error);
            }
        };

        fetchCountry();
    }, [cityParam]);
}
