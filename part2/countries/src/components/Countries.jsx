const Countries = ({countries, showCountry}) => {  

  return(
    <div>
      {countries.map(country => (
        <p key={country.name.official}>
          {country.name.official} <button onClick={() => showCountry(country)}>Show</button>
        </p>
      ))}

    </div>
  )
}

export default Countries;