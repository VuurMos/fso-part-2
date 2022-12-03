import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      filter shown with 
      <input onChange={props.handleSearchFilter} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addName}>
        <div>
          name: 
          <input 
            value={props.newName} 
            onChange={props.handleNameChange} 
          />
        </div>
        <div>
          number:
          <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const PersonDisplay = ({ persons, searchFilter }) => {
  if (searchFilter === '') {
    return (
      <div>
        <ul>
          {persons.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
        </ul>
      </div>
    )
  } else {
    const searchResults = persons.filter(person => person.name.toLowerCase().includes(searchFilter.toLowerCase()))

    return (
      <div>
        <ul>
          {searchResults.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
        </ul>
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  console.log('render', persons.length, 'persons')

  const handleSearchFilter = (event) => {
    setSearchFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    const existingResult = persons.find(person => person.name === newName)

    if (existingResult === undefined) {
      event.preventDefault()
      const personObject = {
        name : newName,
        number : newNumber,
      }

      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
        })
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchFilter={handleSearchFilter} />

      <h2>add a new</h2>
      <PersonForm 
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <PersonDisplay 
        persons={persons} 
        searchFilter={searchFilter} 
      />
    </div>
  )
}

export default App