import React, { useEffect, useState } from 'react';
import './cityInfoCard.css';
import { Link, useParams } from 'react-router-dom';
import { getCityByCity } from '../../../service/cityService';

export const CityInfoCard = () => {
    const { city: cityParam } = useParams();
    const [actualCity, setActualCity] = useState([]);


    useEffect(() => {
        const fetchCity = async () => {
            try {
                const cityData = await getCityByCity(cityParam);
                setActualCity(cityData);
            } catch (error) {
                console.error('Error fetching the city:', error);
            }
        };

        fetchCity();
    }, [cityParam]);

    return (
        <div className="city-card-info-container">
            <div className="city-card-info-city-card">
            <div className="city-card-info-city-img" style={{ backgroundImage: `url(${actualCity.imgUrl})`, backgroundSize: 'cover' }}></div>
                <div className="city-card-info-city-info">
                    <div className="city-card-info-city-titulo">
                        <div className="city-card-info-depth11-frame0">
                            <span className="city-card-info-text">
                                <span>{actualCity && actualCity.city ? actualCity.city : 'Unknown'}</span>
                            </span>
                        </div>
                    </div>
                    <div className="city-card-info-city-data">
                        <div className="city-card-info-depth5-frame0">
                            <div className="city-card-info-depth6-frame0">
                                <div className="city-card-info-depth7-frame0">
                                    <div className="city-card-info-depth8-frame0">
                                        <span className="city-card-info-text02">
                                            <span>Information</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="city-card-info-depth6-frame1">
                                <div className="city-card-info-depth7-frame001">
                                    <div className="city-card-info-depth8-frame001">
                                        <span className="city-card-info-text04">
                                            <span>{actualCity && actualCity.info ? actualCity.info : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}

                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="city-card-info-depth5-frame2">
                            <div className="city-card-info-depth6-frame01">
                                <div className="city-card-info-depth7-frame002">
                                    <div className="city-card-info-depth8-frame002">
                                        <span className="city-card-info-text06">
                                            <span>Country</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="city-card-info-depth6-frame11">
                                <div className="city-card-info-depth7-frame003">
                                    <div className="city-card-info-depth8-frame003">
                                        <span className="city-card-info-text08">
                                            <span>{actualCity && actualCity.country ? actualCity.country : 'Unknown'}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="city-card-info-depth5-frame3">
                            <div className="city-card-info-depth6-frame02">
                                <div className="city-card-info-depth7-frame004">
                                    <div className="city-card-info-depth8-frame004">
                                        <span className="city-card-info-text10">
                                            <span>State</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="city-card-info-depth6-frame12">
                                <div className="city-card-info-depth7-frame005">
                                    <div className="city-card-info-depth8-frame005">
                                        <span className="city-card-info-text12">
                                            <span>{actualCity && actualCity.state ? actualCity.state : 'Unknown'}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="city-card-info-depth5-frame4">
                            <div className="city-card-info-depth6-frame03">
                                <div className="city-card-info-depth7-frame006">
                                    <div className="city-card-info-depth8-frame006">
                                        <span className="city-card-info-text14">
                                            <span>Airport code</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="city-card-info-depth6-frame13">
                                <div className="city-card-info-depth7-frame007">
                                    <div className="city-card-info-depth8-frame007">
                                        <span className="city-card-info-text16">
                                            <span>{actualCity && actualCity.airportCode ? actualCity.airportCode : 'Unknown'}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="city-card-info-depth5-frame5">
                            <div className="city-card-info-depth6-frame04">
                                <div className="city-card-info-depth7-frame008">
                                    <div className="city-card-info-depth8-frame008">
                                        <span className="city-card-info-text18">
                                            <span>Population</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="city-card-info-depth6-frame14">
                                <div className="city-card-info-depth7-frame009">
                                    <div className="city-card-info-depth8-frame009">
                                        <span className="city-card-info-text20">
                                            <span>{actualCity && actualCity.population ? actualCity.population : 'Unknown'}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/cities" className='linkCenter'>
                        <div className="city-card-info-depth8-frame1">
                            <div className="city-card-info-depth9-frame0">
                                <div className="city-card-info-depth10-frame0">
                                    <div className="city-card-info-depth11-frame01">
                                        <span className="city-card-info-text22">
                                            <span>Back</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
