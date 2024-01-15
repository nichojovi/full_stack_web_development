import { useState, useEffect } from 'react';
import countriesService from './services/countries';

const useCountry = (searchTerm) => {
  const [state, setState] = useState({
    countries: [],
    filteredCountries: [],
    loading: false,
    error: null
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const response = await countriesService.getAll();
      setState(prev => ({
        ...prev,
        countries: response,
        filteredCountries: response,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({ ...prev, error, loading: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterCountries = () => {
      const filtered = searchTerm
        ? state.countries.filter(country => 
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
        : state.countries;
      setState(prev => ({ ...prev, filteredCountries: filtered }));
    };
    filterCountries();
  }, [searchTerm, state.countries]);

  return state;
};

export default useCountry;