import { useState, useEffect } from 'react'
import axios from 'axios'

const CountrySearch = ({ handleFilter }) => {
  return (
    <div>
      find countries
      <input onChange={handleFilter} />
    </div>
  )
}

const Results = ({ countries, searchFilter, viewCountry }) => {
  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchFilter.toLowerCase())
  )

  if (filteredCountries.length === 1) {
    return (
      <div>
        <ExpandedView selectedCountry={filteredCountries[0]} />
      </div>
    )
  } else if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else {
    return (
      <div>
        <ul>
          {filteredCountries.map(country => 
            <div key={country.name.official}>
              {country.name.common}
              <button onClick={() => viewCountry(country.name.common)}>Show</button>
            </div>)}
        </ul>
      </div>
    )
  }
}

const ExpandedView = ({ selectedCountry }) => {
  const [weather, setWeather] = useState(null)
  const capital = selectedCountry.capital

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
      .then((response) => setWeather(response.data))
  }, [capital])

  return (
    <div>
      <h1>{selectedCountry.name.common}</h1>
      <p>capital: {selectedCountry.capital}</p>
      <p>area: {selectedCountry.area}</p>
      <div>
        <strong>languages: </strong>
        <ul>
          {Object.values(selectedCountry.languages).map(language => <div key={language}>{language}</div>)}
        </ul>
      </div>
      <img src={selectedCountry.flags.png}></img>
      <WeatherInfo weather={weather} />
    </div>
  )
}

const WeatherInfo = ({ weather }) => {
  if (weather != null) {
    const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

    return (
      <div>
        <h1>Weather in {weather.name}</h1>
        <p>temperature: {weather.main.temp} C</p>
        <img src={icon}></img>
        <p>wind: {weather.wind.speed} m/s</p>
      </div>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setSearchFilter(event.target.value)
  }

  const viewCountry = (countryName) => {
    setSearchFilter(countryName)
  }

  return (
    <div className="App">
      <CountrySearch handleFilter={handleFilter} />
      <Results countries={countries} searchFilter={searchFilter} viewCountry={viewCountry} />
    </div>
  )
}

export default App;
