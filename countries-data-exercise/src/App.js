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

const Results = ({ filteredCountries }) => {
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
          {filteredCountries.map(country => <div key={country.name.official}>{country.name.common}</div>)}
        </ul>
      </div>
    )
  }
}

const ExpandedView = ({ selectedCountry }) => {
  const languages = Object.values(selectedCountry.languages)

  return (
    <div>
      <h1>{selectedCountry.name.common}</h1>
      <p>capital: {selectedCountry.capital}</p>
      <p>area: {selectedCountry.area}</p>
      <div>
        <strong>languages: </strong>
        <ul>
          {languages.map(language => <div key={language}>{language}</div>)}
        </ul>
      </div>
      <img src={selectedCountry.flags.png}></img>
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

  return (
    <div className="App">
      <CountrySearch handleFilter={handleFilter} />
      <Results filteredCountries={filteredCountries} />
    </div>
  )
}

export default App;
