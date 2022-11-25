import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    const searchResult = persons.find(person => person.name === newName)

    if (searchResult === undefined) {
      event.preventDefault()
      const personObject = {
        name : newName,
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
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={handleInputChange} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <div key={person.name}>{person.name}</div>)}
      </ul>
    </div>
  )
}

export default App