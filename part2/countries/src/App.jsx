import { useState, useEffect } from 'react'
import axios from 'axios'
import { AddFilter, ShowFiltered } from './components/Find'

const App = () => {
  const [countries, updateCountries] = useState([])
  const [filter, modifyFilter] = useState('')
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,capital,languages,area,flags')
        updateCountries(response.data)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }
    fetchCountries()
  }, [])

  const onFilterChange = (e) => { modifyFilter(e.target.value) }

  return (
    <div className="app-container">
      <h1>Data for countries</h1>
      <AddFilter filter={filter} onChange={onFilterChange} />
      <ShowFiltered countries={countries} filter={filter} />
    </div>
  )
}

export default App
