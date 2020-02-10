import React, {} from 'react'

const Numbers = ({persons, newFilter, removePerson, deleteId}) => {
    return (
        <ul>
        {persons.map((person, i) => 
        <Person key={i} person={person} filter={newFilter} removePerson={removePerson} deleteId={deleteId}/>
        )}
        </ul>
    )
}

const Person = ( {i, person, filter, removePerson, deleteId}) => {
    console.log(filter)
    if (person.name.toUpperCase().includes(filter.toUpperCase())) {  
      return ( <>
            <li> 
            {person.name} {person.number} 
            <form>
                <button onClick={removePerson} id={person.id}>{'delete'}</button>
            </form>
            </li>
          </>
      )
      }
    return (<></>)
  }

  export default Numbers