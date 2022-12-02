import { useState, useEffect } from 'react'
import axios from 'axios'

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

  const results = countries.filter(country => country.name.common.toLowerCase().includes(searchFilter.toLowerCase()))
  console.log('results', results)

  if (results.length === 1) {
    const resultLanguages = results[0].languages
    const languages = Object.values(resultLanguages)
    console.log(languages)

    return (
      <div className="App">
        <div>
          find countries
          <input onChange={handleFilter} />
        </div>
        <div>
          <h1>{results[0].name.common}</h1>
          <p>capital: {results[0].capital}</p>
          <p>area: {results[0].area}</p>
          <div>
            <strong>languages: </strong>
            <ul>
              {languages.map(language => <div key={language}>{language}</div>)}
            </ul>
          </div>
          <img src={results[0].flags.png}></img>
        </div>
      </div>
    )
  } else if (results.length > 10) {
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
          {results.map(country => <div key={country.name.official}>{country.name.common}</div>)}
        </ul>
      </div>
    )
  }
}

export default App;
