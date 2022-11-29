import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

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
        id : persons.length + 1
      }

      setPersons(persons.concat(personObject))
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