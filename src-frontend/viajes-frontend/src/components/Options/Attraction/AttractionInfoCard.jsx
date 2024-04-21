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

    return (
        <div className="attraction-info-card-container">
            <div className="attraction-info-card-attraction-card">
                <div className="attraction-info-card-attraction-info">
                    <div className="attraction-info-card-attraction-title">
                        <div className="attraction-info-card-depth11-frame0">
                            <span className="attraction-info-card-text">
                                <span>{actualAttraction && actualAttraction.attraction ? actualAttraction.attraction : 'Unknown'}</span>
                            </span>
                        </div>
                    </div>
                    <div className="attraction-info-card-attraction-data">
                        <div className="attraction-info-card-depth5-frame0">
                            <div className="attraction-info-card-depth6-frame0">
                                <div className="attraction-info-card-depth7-frame0">
                                    <div className="attraction-info-card-depth8-frame0">
                                        <span className="attraction-info-card-text02">
                                            <span>Information</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="attraction-info-card-depth6-frame1">
                                <div className="attraction-info-card-depth7-frame001">
                                    <div className="attraction-info-card-depth8-frame001">
                                        <span className="attraction-info-card-text04">
                                            <span>
                                                {actualAttraction && actualAttraction.info ? actualAttraction.info : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="attraction-info-card-depth5-frame2">
                            <div className="attraction-info-card-depth6-frame01">
                                <div className="attraction-info-card-depth7-frame002">
                                    <div className="attraction-info-card-depth8-frame002">
                                        <span className="attraction-info-card-text06">
                                            <span>Country</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="attraction-info-card-depth6-frame11">
                                <div className="attraction-info-card-depth7-frame003">
                                    <div className="attraction-info-card-depth8-frame003">
                                        <span className="attraction-info-card-text08">
                                            <span>{actualAttraction && actualAttraction.country ? actualAttraction.country : 'Unknown'}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="attraction-info-card-depth5-frame3">
                            <div className="attraction-info-card-depth6-frame02">
                                <div className="attraction-info-card-depth7-frame004">
                                    <div className="attraction-info-card-depth8-frame004">
                                        <span className="attraction-info-card-text10">
                                            <span>City</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="attraction-info-card-depth6-frame12">
                                <div className="attraction-info-card-depth7-frame005">
                                    <div className="attraction-info-card-depth8-frame005">
                                        <span className="attraction-info-card-text12">
                                            <span>{actualAttraction && actualAttraction.city ? actualAttraction.city : 'Unknown'}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="attraction-info-card-depth5-frame4">
                            <div className="attraction-info-card-depth6-frame03">
                                <div className="attraction-info-card-depth7-frame006">
                                    <div className="attraction-info-card-depth8-frame006">
                                        <span className="attraction-info-card-text14">
                                            <span>Category</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="attraction-info-card-depth6-frame13">
                                <div className="attraction-info-card-depth7-frame007">
                                    <div className="attraction-info-card-depth8-frame007">
                                        <span className="attraction-info-card-text16">
                                            <span>{actualAttraction && actualAttraction.category ? actualAttraction.category : 'Unknown'}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="attraction-info-card-depth5-frame5">
                            <div className="attraction-info-card-depth6-frame04">
                                <div className="attraction-info-card-depth7-frame008">
                                    <div className="attraction-info-card-depth8-frame008">
                                        <span className="attraction-info-card-text18">
                                            <span>Price</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="attraction-info-card-depth6-frame14">
                                <div className="attraction-info-card-depth7-frame009">
                                    <div className="attraction-info-card-depth8-frame009">
                                        <span className="attraction-info-card-text20">
                                            <span>{actualAttraction && actualAttraction.price ? actualAttraction.price + '€' : 'Unknown'}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/attractions" className='linkCenter'>
                        <div className="attraction-info-card-depth8-frame1">
                            <div className="attraction-info-card-depth9-frame0">
                                <div className="attraction-info-card-depth10-frame0">
                                    <div className="attraction-info-card-depth11-frame01">
                                        <span className="attraction-info-card-text22">
                                            <span>Back</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="attraction-info-card-attraction-img" style={{ backgroundImage: `url(${actualAttraction.imgUrl})`, backgroundSize: 'cover' }}></div>
            </div>
        </div>
    )

}