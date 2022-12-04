import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonDisplay from './components/PersonDisplay'
import PersonForm from './components/PersonForm'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
    event.preventDefault()
    const existingResult = persons.find(person => person.name === newName)

    if (existingResult === undefined) {
      const personObject = {
        name : newName,
        number : newNumber,
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = existingResult.id
        const person = persons.find(person => person.id === id)
        const updatedPerson = { ...person, number: newNumber }
        updateEntry(id, updatedPerson)
      }
    }
  }

  const deleteEntry = (id) => {
    console.log(`deleting person: ${id}`)
    if (window.confirm(`Do you really want to delete person ${id}?`)) {
      personService
        .deletePerson(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const updateEntry = (id, updatedPerson) => {
    personService
      .updateNumber(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
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
        deleteEntry={deleteEntry}
      />
    </div>
  )
}

export default App