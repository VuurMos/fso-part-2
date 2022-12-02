import { useState, useEffect } from 'react'
import axios from 'axios'

const ExpandedView = ({ filteredCountries }) => {
  const languages = Object.values(filteredCountries[0].languages)

  return (
    <div>
      <h1>{filteredCountries[0].name.common}</h1>
      <p>capital: {filteredCountries[0].capital}</p>
      <p>area: {filteredCountries[0].area}</p>
      <div>
        <strong>languages: </strong>
        <ul>
          {languages.map(language => <div key={language}>{language}</div>)}
        </ul>
      </div>
      <img src={filteredCountries[0].flags.png}></img>
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setSearchFilter(event.target.value)
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(searchFilter.toLowerCase())))
  }

  console.log('filteredCountries', filteredCountries)

  if (filteredCountries.length === 1) {
    return (
      <div className="App">
        <div>
          find countries
          <input onChange={handleFilter} />
        </div>
        <ExpandedView filteredCountries={filteredCountries} />
      </div>
    )
  } else if (filteredCountries.length > 10) {
    return (
      <div className="App">
        <div>
          find countries
          <input onChange={handleFilter} />
        </div>
        <div>
          Too many matches, specify another filter
        </div>
      </div>
    )
  } else {
    return (
      <div className="App">
        <div>
          find countries
          <input onChange={handleFilter} />
        </div>
        <ul>
          {filteredCountries.map(country => <div key={country.name.official}>{country.name.common}</div>)}
        </ul>
      </div>
    )
  }
}

export default App;
