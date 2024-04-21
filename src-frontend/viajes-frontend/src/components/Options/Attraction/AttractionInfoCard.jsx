import React, { useState, useEffect } from "react";
import './attractionInfoCard.css';
import { Link, useParams } from 'react-router-dom';
import { getAttractionByAttraction } from "../../../service/attractionService";

export const AttractionInfoCard = () => {
    const { attraction: attractionParam } = useParams();
    const [actualAttraction, setActualAttraction] = useState([]);

    useEffect(() => {
        const fetchAttraction = async () => {
            try {
                const attractionData = await getAttractionByAttraction(attractionParam);
                setActualAttraction(attractionData);
            } catch (error) {
                console.error('Error fetching the attraction:', error);
            }
        };

        fetchAttraction();
    }, [attractionParam]);
    console.log(actualAttraction)

}