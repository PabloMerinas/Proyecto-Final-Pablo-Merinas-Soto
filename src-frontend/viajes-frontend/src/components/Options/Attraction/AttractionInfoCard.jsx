import React, { useState, useEffect } from "react";
import './attractionInfoCard.css';
import { Link, useParams } from 'react-router-dom';
import { addAttraction, getAttractionByAttraction, updateAttraction } from "../../../service/attractionService";
import { getCities } from "../../../service/cityService";
import { addNotificationToAllUsers } from "../../../service/notificationService";

export const AttractionInfoCard = ({ setSelectedOption, attractionToEdit }) => {
    const { attraction: attractionParam } = useParams();
    const [cities, setCities] = useState([]);
    const [actualAttraction, setActualAttraction] = useState([]);
    const [formData, setFormData] = useState({
        imgUrl: '',
        attraction: '',
        category: '',
        info: '',
        price: '',
        city: ''
    });
    const [sendToAllUsers, setSendToAllUsers] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Gestiona los cambios del texto
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage('');
    };

    useEffect(() => {
        if (attractionToEdit) {
            setFormData({
                imgUrl: attractionToEdit.imgUrl,
                attraction: attractionToEdit.attraction,
                category: attractionToEdit.category,
                info: attractionToEdit.info,
                price: attractionToEdit.price,
                city: attractionToEdit.city
            })
        }
        const fetchAttraction = async () => {
            try {
                const attractionData = await getAttractionByAttraction(attractionParam);
                setActualAttraction(attractionData);
            } catch (error) {
                console.error('Error fetching the attraction:', error);
            }
        };
        const fetchCities = async () => {
            try {
                const citiesData = await getCities();
                setCities(citiesData);
            } catch (error) {
                console.error('Error fetching cities: ', error);
            }
        }

        if (attractionParam != null) {
            fetchAttraction();
        } else {
            fetchCities();
        }

    }, [attractionParam, attractionToEdit]);

    function viewMode() {
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
    function addAndEditMode() {
        return (
            <div>
                <form onSubmit={handleSubmit} name="attraction-info-card-form">
                    <div className="attraction-info-card-container" style={{ width: '980px' }}>
                        <div className="attraction-info-card-attraction-card">
                            <div className="attraction-info-card-attraction-info">
                                <div className="attraction-info-card-attraction-title">
                                    <div className="attraction-info-card-depth11-frame0">
                                        <span className="attraction-info-card-text">
                                            <span>
                                                <input type="text" name="attraction" id="attraction" value={formData.attraction} onChange={handleChange} placeholder="Attraction" required disabled={attractionToEdit} title={attractionToEdit ? "You can't edit this field" : ""}/>
                                            </span>
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
                                                        <textarea
                                                            required
                                                            style={{ width: '100%', resize: 'none' }}
                                                            name="info"
                                                            id="info"
                                                            value={formData.info}
                                                            onChange={handleChange}
                                                            placeholder="Information"
                                                        ></textarea>
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
                                                        <span>
                                                            {cities.find(city => city.city === formData.city)?.country || 'Select a city first'}
                                                        </span>
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
                                                        <span>
                                                            <select name="city" id="city" value={formData.city} onChange={handleChange} required>
                                                                <option value="" disabled>Select a city</option>
                                                                {cities.map(city => (
                                                                    <option key={city.id + city.airportCode} value={city.city}>{city.city}</option>
                                                                ))}
                                                            </select>
                                                        </span>
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
                                                        <span>
                                                            <select required name="category" id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                                                <option value="" disabled>Category</option>
                                                                <option value="LANDMARK">Landmark</option>
                                                                <option value="MUSEUM">Museum</option>
                                                                <option value="CHURCH">Church</option>
                                                                <option value="NATIONAL_PARK">National Park</option>
                                                            </select>
                                                        </span>
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
                                                        <span>
                                                            <input required type="number" name="price" id="price" onChange={handleChange} value={formData.price} placeholder="Price" />
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='send-notification-checkbox' style={{ display: 'flex', gap: '10px' }}>
                                    <input type="checkbox" id="myCheckbox" name="myCheckbox"  onChange={(e) => setSendToAllUsers(e.target.checked)} />
                                    <label htmlFor="myCheckbox">  Send notifications to all user</label>
                                </div>
                                <button type="submit" style={{ display: 'contents' }}>
                                    <div className="attraction-info-card-depth8-frame1">
                                        <div className="attraction-info-card-depth9-frame0">
                                            <div className="attraction-info-card-depth10-frame0">
                                                <div className="attraction-info-card-depth11-frame01">
                                                    <span className="attraction-info-card-text22">
                                                        <span>{attractionToEdit ? 'Save' : 'Add'}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="attraction-info-card-attraction-img" style={{ backgroundImage: `url(${formData.imgUrl})`, backgroundSize: 'cover' }}>
                                <img
                                    src={formData.imgUrl}
                                    alt="Imagen"
                                    style={{ display: 'none' }}
                                    onError={(e) => {
                                        e.target.style.display = 'none'; // Oculta la imagen que no se pudo cargar
                                        e.target.parentElement.style.backgroundImage = `url('https://www.svgrepo.com/show/170952/add-button.svg')`; // Establece la imagen predeterminada como fondo
                                    }}
                                />
                                <input required type="text" name="imgUrl" id="imgUrl" value={formData.imgUrl} onChange={handleChange} placeholder='Image url' className='width100' style={{ position: 'relative', top: '10px' }} />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="error-messages" style={{ marginTop: '10px', color: 'red' }}>{errorMessage}</div>
            </div>
        )
    }
    // Gestiona el envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!attractionToEdit) {
            // Agrego la nueva attraccion
            addAttraction(formData, formData.city)
                .then(response => {
                    setSelectedOption(4);
                    if (sendToAllUsers) { // Si se ha marcado la opcion, agrega la notificacion a todos los usuarios
                        const currentDate = new Date(); // Creo la fecha y la formateo
                        const day = currentDate.getDate().toString().padStart(2, '0');
                        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                        const year = currentDate.getFullYear();
                        const hours = currentDate.getHours().toString().padStart(2, '0');
                        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            
                        const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
            
                        const notificationToAdd = {
                          title: 'New attraction: ' + formData.attraction,
                          timeAgo: 'Added at: ' + formattedDate
                        };
                        // Una vez añadida la notificacion le añado uno al conteador de notificaciones del header:
                        const notificationCounter = document.getElementsByClassName('notification-counter')[0];
                        let notificationCount = parseInt(notificationCounter.innerText); // Convertir el texto a un número entero
            
                        if (isNaN(notificationCount)) {
                          notificationCount = 0;
                        }
                        notificationCount++; // Sumo
                        notificationCounter.style.visibility = 'visible';
                        notificationCounter.innerText = notificationCount;
            
                        addNotificationToAllUsers(notificationToAdd)
                          .catch(error => {
                            console.error('Error adding notification to all users:', error);
                          });
                      }
                })
                .catch(error => {
                    setErrorMessage(error.message);
                });
        }
        else {
            // Edito la atraccion
            updateAttraction(formData.city, formData)
                .then(response => {
                    setSelectedOption(4);
                })
                .catch(error => {
                    console.error('Error updating the attraction:', error);
                });
        }

    };
    if (attractionParam) {
        return viewMode();
    }
    else {
        return addAndEditMode();
    }

}