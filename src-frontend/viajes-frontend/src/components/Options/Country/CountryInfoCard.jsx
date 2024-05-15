import React, { useEffect, useState } from 'react';
import './countryInfoCard.css';
import { Link, useParams } from 'react-router-dom';
import { getCountryByCountry, addCountry, updateCountry } from '../../../service/countryService';
import { addNotificationToAllUsers } from '../../../service/notificationService';

// Metodo que me genera la tarjeta del pais con toda la información, le defino los valores por defecto
export const CountryInfoCard = ({ setSelectedOption, countryToEdit }) => {
  const { country: countryParam } = useParams();
  const [actualCountry, setActualCountry] = useState(null);
  const [formData, setFormData] = useState({
    imgUrl: '',
    country: '',
    info: '',
    capital: '',
    population: '',
    currencyCode: '',
    languageCode: '',
    currencySymbol: '',
    countryCode: ''
  });
  const [sendToAllUsers, setSendToAllUsers] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const countryData = await getCountryByCountry(countryParam);
        setActualCountry(countryData);
      } catch (error) {
        console.error('Error fetching the country:', error);
      }
    };
    if (countryParam != null) {
      fetchCountry();
    }
  }, [countryParam]);

  // Si le llega el pais que se editara recoge sus valores
  useEffect(() => {
    if (countryToEdit) {
      setFormData({
        imgUrl: countryToEdit.imgUrl || '',
        country: countryToEdit.country || '',
        info: countryToEdit.info || '',
        capital: countryToEdit.capital || '',
        population: countryToEdit.population || '',
        currencyCode: countryToEdit.currencyCode || '',
        languageCode: countryToEdit.languageCode || '',
        currencySymbol: countryToEdit.currencySymbol || '',
        countryCode: countryToEdit.countryCode || ''
      });
    }
  }, [countryToEdit]);

  // Gestiona los cambios del texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage('');
  };
  // Gestiona el envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!countryToEdit) { // Si no viene pais para editar es que añade
      // Agrego el nuevo pais
      addCountry(formData)
        .then(response => {
          setSelectedOption(2);
          if (sendToAllUsers) { // Si se ha marcado la opcion, agrega la notificacion a todos los usuarios
            const currentDate = new Date(); // Creo la fecha y la formateo
            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const year = currentDate.getFullYear();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');

            const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

            const notificationToAdd = {
              title: 'New country: ' + formData.country,
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


    } else { // En caso contrario llama a editar el pais
      updateCountry(countryToEdit.country, formData)
        .then(response => {
          setSelectedOption(2);
        })
        .catch(error => {
          console.error('Error updating the country:', error);
        });
    }

  };

  if (countryParam) {
    return (
      <div className="country-info-card-principal-container">
        {actualCountry && (
          <div className="country-info-card-principal-country-card">
            <div className="country-info-card-principal-nivel0-frame0">
              <div className="country-info-card-principal-nivel1-frame0">
                <div className="country-info-card-principal-nivel2-frame1">
                  <div className="country-info-card-principal-nivel3-frame0">
                    <div className="country-info-card-principal-nivel4-frame0" style={{ backgroundImage: `url(${actualCountry.imgUrl})` }}>
                      <div className="country-info-card-principal-nivel5-frame0">
                        <div className="country-info-card-principal-nivel6-frame0">
                          <div className="country-info-card-principal-nivel7-frame0">
                            <div className="country-info-card-principal-nivel8-frame0">
                              <div className="country-info-card-principal-nivel9-frame0">
                                <div className="country-info-card-principal-nivel10-frame0">
                                  <div className="country-info-card-principal-nivel11-frame0">
                                    <span className="country-info-card-principal-text">
                                      <span>{actualCountry.country}</span>
                                    </span>
                                  </div>
                                </div>
                                <div className="country-info-card-principal-nivel10-frame1">
                                  <div className="country-info-card-principal-nivel11-frame01">
                                    <span className="country-info-card-principal-text02">
                                      <span>
                                        {actualCountry.info}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="country-info-card-principal-nivel4-frame1">
                      <div className="country-info-card-principal-nivel5-frame01">
                        <div className="country-info-card-principal-nivel6-frame01">
                          <span className="country-info-card-principal-text04">Quick facts</span>
                        </div>
                      </div>
                    </div>
                    <div className="country-info-card-principal-nivel4-frame2">
                      <div className="country-info-card-principal-nivel5-frame02">
                        <div className="country-info-card-principal-nivel6-frame02">
                          <div className="country-info-card-principal-nivel7-frame001">
                            <div className="country-info-card-principal-nivel8-frame001">
                              <span className="country-info-card-principal-text05">
                                <span>Capital</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="country-info-card-principal-nivel6-frame1">
                          <div className="country-info-card-principal-nivel7-frame002">
                            <div className="country-info-card-principal-nivel8-frame002">
                              <span className="country-info-card-principal-text07">
                                <span>{actualCountry.capital}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="country-info-card-principal-nivel5-frame1">
                        <div className="country-info-card-principal-nivel6-frame03">
                          <div className="country-info-card-principal-nivel7-frame003">
                            <div className="country-info-card-principal-nivel8-frame003">
                              <span className="country-info-card-principal-text09">
                                <span>Population</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="country-info-card-principal-nivel6-frame11">
                          <div className="country-info-card-principal-nivel7-frame004">
                            <div className="country-info-card-principal-nivel8-frame004">
                              <span className="country-info-card-principal-text11">
                                <span>{actualCountry.population}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="country-info-card-principal-nivel5-frame2">
                        <div className="country-info-card-principal-nivel6-frame04">
                          <div className="country-info-card-principal-nivel7-frame005">
                            <div className="country-info-card-principal-nivel8-frame005">
                              <span className="country-info-card-principal-text13">
                                <span>Currency</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="country-info-card-principal-nivel6-frame12">
                          <div className="country-info-card-principal-nivel7-frame006">
                            <div className="country-info-card-principal-nivel8-frame006">
                              <span className="country-info-card-principal-text15">
                                <span>{actualCountry.currencyCode}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="country-info-card-principal-nivel5-frame3">
                        <div className="country-info-card-principal-nivel6-frame05">
                          <div className="country-info-card-principal-nivel7-frame007">
                            <div className="country-info-card-principal-nivel8-frame007">
                              <span className="country-info-card-principal-text17">
                                <span>Language</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="country-info-card-principal-nivel6-frame13">
                          <div className="country-info-card-principal-nivel7-frame008">
                            <div className="country-info-card-principal-nivel8-frame008">
                              <span className="country-info-card-principal-text19">
                                <span>{actualCountry.languageCode}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="country-info-card-principal-nivel5-frame5">
                        <div className="country-info-card-principal-nivel6-frame06">
                          <div className="country-info-card-principal-nivel7-frame009">
                            <div className="country-info-card-principal-nivel8-frame009">
                              <span className="country-info-card-principal-text21">
                                <span>Currency</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="country-info-card-principal-nivel6-frame14">
                          <div className="country-info-card-principal-nivel7-frame010">
                            <div className="country-info-card-principal-nivel8-frame010">
                              <span className="country-info-card-principal-text23">
                                <span>{actualCountry.currencySymbol}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="country-info-card-principal-nivel5-frame4">
                        <div className="country-info-card-principal-nivel6-frame07">
                          <div className="country-info-card-principal-nivel7-frame011">
                            <div className="country-info-card-principal-nivel8-frame011">
                              <span className="country-info-card-principal-text25">
                                Country code
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="country-info-card-principal-nivel6-frame15">
                          <div className="country-info-card-principal-nivel7-frame012">
                            <div className="country-info-card-principal-nivel8-frame012">
                              <span className="country-info-card-principal-text26">
                                <span>{actualCountry.countryCode}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/countries">
                <div className="country-info-card-principal-nivel8-frame1">
                  <div className="country-info-card-principal-nivel9-frame01">
                    <div className="country-info-card-principal-nivel10-frame01">
                      <div className="country-info-card-principal-nivel11-frame02">
                        <span className="country-info-card-principal-text28">
                          <span>Back</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  } else { // En caso de que sea para editar o añadir
    return (
      <div className="country-info-card-principal-container">
        <form onSubmit={handleSubmit} name='country-info-card-form'>
          <div className="country-info-card-principal-country-card">
            <div className="country-info-card-principal-nivel0-frame0" style={{ height: '960px' }}>
              <div className="country-info-card-principal-nivel1-frame0">
                <div className="country-info-card-principal-nivel2-frame1">
                  <div className="country-info-card-principal-nivel3-frame0">
                    <div className="country-info-card-principal-nivel4-frame0" style={{ backgroundImage: `url(${formData.imgUrl})`, backgroundSize: 'cover' }}>
                      <img
                        src={formData.imgUrl}
                        alt="Imagen"
                        style={{ display: 'none' }}
                        onError={(e) => {
                          e.target.style.display = 'none'; // Oculta la imagen que no se pudo cargar
                          e.target.parentElement.style.backgroundImage = `url('https://www.svgrepo.com/show/170952/add-button.svg')`; // Establece la imagen predeterminada como fondo
                        }}
                      />
                      <div className="country-info-card-principal-nivel5-frame0">
                        <div className="country-info-card-principal-nivel6-frame0">
                          <div className="country-info-card-principal-nivel7-frame0">
                            <div className="country-info-card-principal-nivel8-frame0">
                              <div className="country-info-card-principal-nivel9-frame0">
                                <div className="country-info-card-principal-nivel10-frame0">
                                  <div className="country-info-card-principal-nivel11-frame0">
                                    <span className="country-info-card-principal-text">
                                      <span>
                                        <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" required disabled={countryToEdit} style={{ width: '100%' }} title={countryToEdit ? "You can't edit this field" : ""}/>
                                      </span>
                                    </span>
                                  </div>
                                </div>
                                <div className="country-info-card-principal-nivel10-frame1">
                                  <div className="country-info-card-principal-nivel11-frame01">
                                    <span className="country-info-card-principal-text02">
                                      <span>
                                        <textarea name="info" value={formData.info} onChange={handleChange} placeholder="Info" required />
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="country-info-card-principal-nivel4-frame1 width100">
                      <div className="country-info-card-principal-nivel5-frame01 width100">
                        <div className="country-info-card-principal-nivel6-frame01 width100">
                          <span className="country-info-card-principal-text04 width100">
                            <input type="text" name="imgUrl" id="imgUrl" value={formData.imgUrl} onChange={handleChange} placeholder='Image url' className='width100' required />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="country-info-card-principal-nivel4-frame2">
                      <div className="country-info-card-principal-nivel5-frame02">
                        <div className="country-info-card-principal-nivel6-frame02">
                          <div className="country-info-card-principal-nivel7-frame001">
                            <div className="country-info-card-principal-nivel8-frame001">
                              <span className="country-info-card-principal-text05">
                                <span>Capital</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="country-info-card-principal-nivel6-frame1">
                          <div className="country-info-card-principal-nivel7-frame002">
                            <div className="country-info-card-principal-nivel8-frame002">
                              <span className="country-info-card-principal-text07">
                                <span>
                                  <input type="text" name="capital" id="capital" onChange={handleChange} placeholder='Capital' value={formData.capital} required />
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="country-info-card-principal-nivel5-frame1">
                        <div className="country-info-card-principal-nivel6-frame03">
                          <div className="country-info-card-principal-nivel7-frame003">
                            <div className="country-info-card-principal-nivel8-frame003">
                              <span className="country-info-card-principal-text09">
                                <span>Population</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="country-info-card-principal-nivel6-frame11">
                          <div className="country-info-card-principal-nivel7-frame004">
                            <div className="country-info-card-principal-nivel8-frame004">
                              <span className="country-info-card-principal-text11">
                                <span>
                                  <input type="number" name="population" id="population" onChange={handleChange} placeholder='Population' value={formData.population} required  min="1"/>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="country-info-card-principal-nivel5-frame2">
                        <div className="country-info-card-principal-nivel6-frame04">
                          <div className="country-info-card-principal-nivel7-frame005">
                            <div className="country-info-card-principal-nivel8-frame005">
                              <span className="country-info-card-principal-text13">
                                <span>Currency</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="country-info-card-principal-nivel6-frame12">
                          <div className="country-info-card-principal-nivel7-frame006">
                            <div className="country-info-card-principal-nivel8-frame006">
                              <span className="country-info-card-principal-text15">
                                <span>
                                  <input type="text" name="currencyCode" id="currencyCode" onChange={handleChange} placeholder='Currency Code' value={formData.currencyCode} required />
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="country-info-card-principal-nivel5-frame3">
                        <div className="country-info-card-principal-nivel6-frame05">
                          <div className="country-info-card-principal-nivel7-frame007">
                            <div className="country-info-card-principal-nivel8-frame007">
                              <span className="country-info-card-principal-text17">
                                <span>Language</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="country-info-card-principal-nivel6-frame13">
                          <div className="country-info-card-principal-nivel7-frame008">
                            <div className="country-info-card-principal-nivel8-frame008">
                              <span className="country-info-card-principal-text19">
                                <span>
                                  <input type="text" name="languageCode" id="languageCode" value={formData.languageCode} onChange={handleChange} placeholder='Language Code' required />
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="country-info-card-principal-nivel5-frame5">
                        <div className="country-info-card-principal-nivel6-frame06">
                          <div className="country-info-card-principal-nivel7-frame009">
                            <div className="country-info-card-principal-nivel8-frame009">
                              <span className="country-info-card-principal-text21">
                                <span>Currency</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="country-info-card-principal-nivel6-frame14">
                          <div className="country-info-card-principal-nivel7-frame010">
                            <div className="country-info-card-principal-nivel8-frame010">
                              <span className="country-info-card-principal-text23">
                                <span>
                                  <input type="text" maxLength={1} name="currencySymbol" id="currencySymbol" value={formData.currencySymbol} onChange={handleChange} placeholder='Currecy Symbol' required />
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="country-info-card-principal-nivel5-frame4">
                        <div className="country-info-card-principal-nivel6-frame07">
                          <div className="country-info-card-principal-nivel7-frame011">
                            <div className="country-info-card-principal-nivel8-frame011">
                              <span className="country-info-card-principal-text25">
                                Country code
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="country-info-card-principal-nivel6-frame15">
                          <div className="country-info-card-principal-nivel7-frame012">
                            <div className="country-info-card-principal-nivel8-frame012">
                              <span className="country-info-card-principal-text26">
                                <span>
                                  <input type="text" name="countryCode" id="countryCode" value={formData.countryCode} onChange={handleChange} placeholder='Country Code' required />
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='send-notification-checkbox' style={{ display: 'flex', gap: '10px' }}>
                <input type="checkbox" id="myCheckbox" name="myCheckbox" onChange={(e) => setSendToAllUsers(e.target.checked)} />
                <label htmlFor="myCheckbox">  Send notifications to all user</label>
              </div>
              <button type="submit" id='submitCountry'>
                <div className="country-info-card-principal-nivel8-frame1">
                  <div className="country-info-card-principal-nivel9-frame01">
                    <div className="country-info-card-principal-nivel10-frame01">
                      <div className="country-info-card-principal-nivel11-frame02">
                        <span className="country-info-card-principal-text28">
                          <span>
                            {countryToEdit ? 'Save' : 'Add'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </form>
        <div className="error-messages" style={{ marginTop: '10px', color: 'red' }}>{errorMessage}</div>
      </div>
    )
  }

}