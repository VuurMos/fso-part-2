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

export default PersonDisplay