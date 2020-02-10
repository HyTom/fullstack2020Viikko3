import Filter from './components/Filter'
import NewPerson from './components/NewPerson'
import Numbers from './components/Numbers'
import React, { useState, useEffect } from 'react'
import noteService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
    .getAll()
    .then(response => {
      setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.findIndex(person => person.name === newName) === -1) { 
      const personObject = {
        name: newName,
        number: newNumber
      }
        noteService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')

          setErrorMessage(
            `${newName}' was addded to list`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 2500)
      })

    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  const removePerson = (event) => {
    event.preventDefault()
    if (window.confirm('Delete this??')) {
        noteService
        .removeId(event.target.id)
        noteService
        .getAll()
        .then(response => {
        setPersons(response.data)
        })

        setErrorMessage(
          `Person was removed from existence`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 2500)

      }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setPersons(persons.concat())
    setNewFilter(event.target.value)
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    const style = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  
    return (
      <div style={style} className="error">
        {message}
      </div>
    )
  }
  

  return (
    <div>
       <Notification message={errorMessage} />
      <h2>Phonebook</h2>
      <Filter value={newFilter}
          onChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <NewPerson addPerson={addPerson} 
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
        />

      <h2>Numbers</h2>
      <Numbers persons={persons} newFilter={newFilter} removePerson={removePerson}/>
     
    </div>
  )

}

export default App
