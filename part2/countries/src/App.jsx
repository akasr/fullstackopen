import {useState, useEffect} from 'react';
import Countries from './components/Countries';
import Country from './components/Country';
import axios from 'axios';

const App = () => {
  const [countryInput, setCountryInput] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryToShow, setCountryToShow] = useState(null);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data));
  }, []);

  const api_key = import.meta.env.VITE_OWMAPI_KEY;
  useEffect(() => {
    if(countryToShow){
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${countryToShow.capitalInfo.latlng[0]}&lon=${countryToShow.capitalInfo.latlng[1]}&appid=${api_key}`)
      .then(response => setWeather(response.data))
    }
  }, [countryToShow, api_key]);

  const handleCountryInput = (event) => {
    setCountryInput(event.target.value);
    setCountryToShow(null);
  }
  const showCountry = country => setCountryToShow(country);

  const countriesToShow = countries.filter(country => 
    country.name.official.toLowerCase().includes(countryInput.toLowerCase()) || country.name.common.toLowerCase().includes(countryInput.toLowerCase())
  );
  useEffect(() => {
    if(countriesToShow && countriesToShow.length === 1){
      setCountryToShow(countriesToShow[0])
    }
  }, [countriesToShow]);

  return(
    <div>
      <form>
        find countries <input value={countryInput} onChange={handleCountryInput}/>
      </form>
      {
        countriesToShow.length > 10
          ? <p>Too many matches, specify another filter</p>
          : (
            countriesToShow.length > 1
              ? <Countries countries={countriesToShow} showCountry={showCountry}/>
              : ""
            )
      }
      <Country country={countryToShow} weather={weather}/>
    </div>
  )
}

export default App;