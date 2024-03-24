import React from "react";
import './cities.css';

export const Cities = () => {
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchText, setSearchText] = useState('');

    // Recupero el token
    const token = localStorage.getItem("authToken");

    // Recupero las ciudades
    useEffect(() => {
        async function fetchCountries() {
            try {
                const citiesData = await getCountries(token);
                setCities(citiesData);
                setFilteredCities(citiesData);
            } catch (error) {
                console.error('Error al obtener los países:', error);
            }
        }

        fetchCountries();
    }, []);



    const handleInputChange = (event) => {
        setSearchText(event.target.value || '');
        filterCities(event.target.value || ''); // Llamo al metodo para filtrar ( Lo dejo aqui para que se vaya actualizando solo)

    };

    // Metodo para filtrar ciudades
    const filterCities = (text) => {
        const filtered = countries.filter(country =>
            country.country.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredCountries(filtered);
    };

    return (
        <div className="cities-p-rincipal-container">
            <div className="cities-p-rincipal-cities">
                <div className="cities-p-rincipal-depth4-frame0">
                    <div className="cities-p-rincipal-depth5-frame0">
                        <div className="cities-p-rincipal-depth6-frame0">
                            <span className="cities-p-rincipal-text">
                                <span>cities</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cities-p-rincipal-depth4-frame1">
                    <div className="cities-p-rincipal-depth5-frame01">
                        <div className="cities-p-rincipal-depth6-frame01">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="cities-p-rincipal-depth6-frame1">
                            <div className="cities-p-rincipal-depth7-frame01">
                                <span className="cities-p-rincipal-text02">
                                    <input
                                        type="text"
                                        value={searchText}
                                        onChange={handleInputChange}
                                        placeholder="Buscar países" style={{ backgroundColor: 'transparent', width: '860px', border: 'none' }}
                                    /> </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cities-p-rincipal-depth4-frame2">
                    <div className="cities-p-rincipal-depth5-frame02">
                        <div className="cities-p-rincipal-depth6-frame02">
                            <div className="cities-p-rincipal-depth7-frame02">
                                <div className="cities-p-rincipal-depth8-frame0">
                                    <div className="cities-p-rincipal-depth9-frame0">
                                        <div className="cities-p-rincipal-depth10-frame0">
                                            <span className="cities-p-rincipal-text04">
                                                <span>Country</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cities-p-rincipal-depth9-frame1">
                                        <div className="cities-p-rincipal-depth10-frame001">
                                            <span className="cities-p-rincipal-text06">
                                                <span>Capital</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cities-p-rincipal-depth9-frame2">
                                        <div className="cities-p-rincipal-depth10-frame002">
                                            <span className="cities-p-rincipal-text08">
                                                <span>Currency code</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cities-p-rincipal-depth9-frame3">
                                        <div className="cities-p-rincipal-depth10-frame003">
                                            <span className="cities-p-rincipal-text10">
                                                <span>Currency symbol</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cities-p-rincipal-depth9-frame4">
                                        <div className="cities-p-rincipal-depth10-frame004">
                                            <span className="cities-p-rincipal-text12">
                                                <span>Language code</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="cities-p-rincipal-depth9-frame5">
                                        <div className="cities-p-rincipal-depth10-frame005">
                                            <span className="cities-p-rincipal-text14">
                                                <span>Info</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cities-p-rincipal-depth7-frame1">
                                {filteredcities.map(country => (
                                    <div key={country.id}>
                                        {/* {generateCountry(country.country, country.capital, country.currencyCode, country.currencySymbol, country.languageCode)} */}
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
