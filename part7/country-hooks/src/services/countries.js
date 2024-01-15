import axios from 'axios';

const url = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
const api_key = import.meta.env.VITE_API_KEY;

const getAll = async () => (await axios.get(url)).data;

const getWeather = async (latitude, longitude) => {
  const url = `${weatherUrl}?lat=${latitude}&lon=${longitude}&appid=${api_key}`;
  return (await axios.get(url)).data;
};

export default { getAll, getWeather };
