import { useState, useEffect } from 'react'
import axios from 'axios'

export const GetWeather = ({ city }) => {
    const capitalCity = city[0]
    const apiKey = import.meta.env.VITE_API_KEY
    const endpoint = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${capitalCity}&units=metric&APPID=${apiKey}`
    const url = `${endpoint}${query}`
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(url)
                setWeatherData(response.data)
            } catch (error) {
                console.error("Failed to fetch data.", error)
            }
        }

        fetchWeather()
    }, [url])

    if (!weatherData) return null
    const { main, wind, weather } = weatherData
    const { temp } = main
    const { speed } = wind
    const { icon } = weather[0]
    return (
        <div>
            <h3>Weather in {capitalCity} </h3>
            <p>temperature {temp} Celcius</p>
            {icon && (
                <img
                    src={`http://openweathermap.org/img/wn/${icon}@4x.png`}
                    alt="weather icon"
                />
            )}
            <p>wind {speed} m/s</p>
        </div>
    )
}
