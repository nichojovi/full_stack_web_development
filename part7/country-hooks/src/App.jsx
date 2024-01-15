/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import countriesService from './services/countries';
import useCountry from './hook';

const GetWeather = ({ country }) => {
  const [weather, setWeather] = useState({ temperature: '', windSpeed: '', iconSrc: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await countriesService.getWeather(country.latlng[0], country.latlng[1]);
        if (!response) return;
        const { temp } = response.main;
        const { speed } = response.wind;
        const { icon } = response.weather[0];
        setWeather({
          temperature: temp,
          windSpeed: speed,
          iconSrc: `https://openweathermap.org/img/wn/${icon}@2x.png`
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [country]);

  return (
    <div>
      <p>temperature - {weather.temperature}</p>
      <img src={weather.iconSrc}/>
      <p>wind {weather.windSpeed}</p>
    </div>
  );
};

const ShowDetails = ({ country }) => {
  let languages = Object.values(country.languages);
  return (
    <div key={country.name.official}>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>{languages.map(language => <li key={language}>{language}</li>)}</ul>
      <img src={country.flags.png} alt={`Flag of ${country.flags.alt}`} />
      <GetWeather country={country}/>
    </div>
  );
};

const Countries = ({ allCountries }) => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleSelectCountry = countryName => setSelectedCountry(countryName);

  if (allCountries.length > 10) return <p>Provide more specific filter. Result is too many.</p>;
  if (allCountries.length === 1) return <ShowDetails country={allCountries[0]} />;
  return allCountries.map(country => (
    <div key={country.name.official}>
      <span>{country.name.common}</span>
      <button onClick={() => handleSelectCountry(country.name.common)}>Show</button>
      {selectedCountry === country.name.common && <ShowDetails country={country} />}
    </div>
  ));
};

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const { filteredCountries, loading, error } = useCountry(searchValue);

  return (
    <div>
      <h1>Country Hooks</h1>
      <p>find countries <input value={searchValue} onChange={e => setSearchValue(e.target.value)} /></p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Countries allCountries={filteredCountries} />
    </div>
  );
};

export default App;