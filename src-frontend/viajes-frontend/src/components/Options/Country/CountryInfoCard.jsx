import React from "react";
import './countryInfoCard.css';

// Metodo que me genera la tarjeta del pais con toda la información, le defino los valores por defecto
export const CountryInfoCard = ({ imgUrl = 'https://us.123rf.com/450wm/pytyczech/pytyczech1904/pytyczech190400437/121432188-globo-terr%C3%A1queo-natural-mapa-del-mundo-3d-con-tierras-verdes-que-dejan-caer-sombras-sobre-mares-y.jpg', capital = 'Unknown', population = 'Unknown', country = 'Unknown', countryCode = 'Unknown', currencyCode = 'Unknown', currencySymbol = 'Unknown', languageCode = 'Unknown', info = 'Unknown' }) => {
  return (
    <div className="country-info-card-p-rincipal-container">
      <div className="country-info-card-p-rincipal-country-card">
        <div className="country-info-card-p-rincipal-depth0-frame0">
          <div className="country-info-card-p-rincipal-depth1-frame0">
            <div className="country-info-card-p-rincipal-depth2-frame1">
              <div className="country-info-card-p-rincipal-depth3-frame0">
                <div className="country-info-card-p-rincipal-depth4-frame0" style={{ backgroundImage: `url(${imgUrl})` }}>
                  <div className="country-info-card-p-rincipal-depth5-frame0">
                    <div className="country-info-card-p-rincipal-depth6-frame0">
                      <div className="country-info-card-p-rincipal-depth7-frame0">
                        <div className="country-info-card-p-rincipal-depth8-frame0">
                          <div className="country-info-card-p-rincipal-depth9-frame0">
                            <div className="country-info-card-p-rincipal-depth10-frame0">
                              <div className="country-info-card-p-rincipal-depth11-frame0">
                                <span className="country-info-card-p-rincipal-text">
                                  <span>{country}</span>
                                </span>
                              </div>
                            </div>
                            <div className="country-info-card-p-rincipal-depth10-frame1">
                              <div className="country-info-card-p-rincipal-depth11-frame01">
                                <span className="country-info-card-p-rincipal-text02">
                                  <span>
                                    {info}
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
                <div className="country-info-card-p-rincipal-depth4-frame1">
                  <div className="country-info-card-p-rincipal-depth5-frame01">
                    <div className="country-info-card-p-rincipal-depth6-frame01">
                      <span className="country-info-card-p-rincipal-text04">Quick facts</span>
                    </div>
                  </div>
                </div>
                <div className="country-info-card-p-rincipal-depth4-frame2">
                  <div className="country-info-card-p-rincipal-depth5-frame02">
                    <div className="country-info-card-p-rincipal-depth6-frame02">
                      <div className="country-info-card-p-rincipal-depth7-frame001">
                        <div className="country-info-card-p-rincipal-depth8-frame001">
                          <span className="country-info-card-p-rincipal-text05">
                            <span>Capital</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="country-info-card-p-rincipal-depth6-frame1">
                      <div className="country-info-card-p-rincipal-depth7-frame002">
                        <div className="country-info-card-p-rincipal-depth8-frame002">
                          <span className="country-info-card-p-rincipal-text07">
                            <span>{capital}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="country-info-card-p-rincipal-depth5-frame1">
                    <div className="country-info-card-p-rincipal-depth6-frame03">
                      <div className="country-info-card-p-rincipal-depth7-frame003">
                        <div className="country-info-card-p-rincipal-depth8-frame003">
                          <span className="country-info-card-p-rincipal-text09">
                            <span>Population</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="country-info-card-p-rincipal-depth6-frame11">
                      <div className="country-info-card-p-rincipal-depth7-frame004">
                        <div className="country-info-card-p-rincipal-depth8-frame004">
                          <span className="country-info-card-p-rincipal-text11">
                            <span>{population}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="country-info-card-p-rincipal-depth5-frame2">
                    <div className="country-info-card-p-rincipal-depth6-frame04">
                      <div className="country-info-card-p-rincipal-depth7-frame005">
                        <div className="country-info-card-p-rincipal-depth8-frame005">
                          <span className="country-info-card-p-rincipal-text13">
                            <span>Currency</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="country-info-card-p-rincipal-depth6-frame12">
                      <div className="country-info-card-p-rincipal-depth7-frame006">
                        <div className="country-info-card-p-rincipal-depth8-frame006">
                          <span className="country-info-card-p-rincipal-text15">
                            <span>{currencyCode}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="country-info-card-p-rincipal-depth5-frame3">
                    <div className="country-info-card-p-rincipal-depth6-frame05">
                      <div className="country-info-card-p-rincipal-depth7-frame007">
                        <div className="country-info-card-p-rincipal-depth8-frame007">
                          <span className="country-info-card-p-rincipal-text17">
                            <span>Language</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="country-info-card-p-rincipal-depth6-frame13">
                      <div className="country-info-card-p-rincipal-depth7-frame008">
                        <div className="country-info-card-p-rincipal-depth8-frame008">
                          <span className="country-info-card-p-rincipal-text19">
                            <span>{languageCode}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="country-info-card-p-rincipal-depth5-frame5">
                    <div className="country-info-card-p-rincipal-depth6-frame06">
                      <div className="country-info-card-p-rincipal-depth7-frame009">
                        <div className="country-info-card-p-rincipal-depth8-frame009">
                          <span className="country-info-card-p-rincipal-text21">
                            <span>Currency</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="country-info-card-p-rincipal-depth6-frame14">
                      <div className="country-info-card-p-rincipal-depth7-frame010">
                        <div className="country-info-card-p-rincipal-depth8-frame010">
                          <span className="country-info-card-p-rincipal-text23">
                            <span>{currencySymbol}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="country-info-card-p-rincipal-depth5-frame4">
                    <div className="country-info-card-p-rincipal-depth6-frame07">
                      <div className="country-info-card-p-rincipal-depth7-frame011">
                        <div className="country-info-card-p-rincipal-depth8-frame011">
                          <span className="country-info-card-p-rincipal-text25">
                            Country code
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="country-info-card-p-rincipal-depth6-frame15">
                      <div className="country-info-card-p-rincipal-depth7-frame012">
                        <div className="country-info-card-p-rincipal-depth8-frame012">
                          <span className="country-info-card-p-rincipal-text26">
                            <span>{countryCode}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="/countries">
            <div className="country-info-card-p-rincipal-depth8-frame1">
              <div className="country-info-card-p-rincipal-depth9-frame01">
                <div className="country-info-card-p-rincipal-depth10-frame01">
                  <div className="country-info-card-p-rincipal-depth11-frame02">
                    <span className="country-info-card-p-rincipal-text28">
                      <span>Back</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}