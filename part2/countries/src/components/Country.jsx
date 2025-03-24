const Country = ({country, weather}) => {

  if(!country) {
    return null;
  }
  
  const languages = [];
  for(const key in country.languages){
    languages.push(<li key={key}>{country.languages[key]}</li>);
  }

  return(
    <div>
      <h2>{country.name.common}</h2>
      <div>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
      </div>
      <div>
        <h3>Languages</h3>
        <ul>
          {
            languages
          }
        </ul>
      </div>
      <div>
        <img src={country.flags.svg} alt={country.flags.alt} height="300" />
      </div>
      <div>
       <h3>Weather in {country.capital}</h3>
       <p>Temperature {weather.main.temp} Celsius</p>
       <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
       <p>Wind {weather.wind.speed} m/s</p>
      </div>
    </div>
  )
}

export default Country;