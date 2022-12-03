const PersonDisplay = ({ persons, searchFilter, deleteEntry }) => {
    let peopleToDisplay = []
    if (searchFilter === '') {
        peopleToDisplay = persons
    } else {
        peopleToDisplay = persons.filter(person => person.name.toLowerCase().includes(searchFilter.toLowerCase()))
    }
    
    return (
        <div>
            <ul>
                {peopleToDisplay.map(person =>
                     <div key={person.id}>
                        {person.name} 
                        {person.number}
                        <button onClick={() => deleteEntry(person.id)}>Delete</button>
                    </div>)}
            </ul>
        </div>
    )
}

export default PersonDisplay