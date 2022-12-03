const Filter = (props) => {
    return (
        <div>
            filter shown with 
            <input onChange={props.handleSearchFilter} />
        </div>
    )
}

export default Filter