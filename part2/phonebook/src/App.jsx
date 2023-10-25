import { useState, useEffect } from 'react'
import personService from './services/persons'
import utilService from './services/utils'
import { ErrorNotification, SuccessNotification } from './components/Notification'
import { Form } from './components/Form'
import { AddFilter, ShowFiltered } from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAllPerson()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (utilService.compareNumber(persons, newNumber)) {
      alertUser()
    } else if (utilService.compareName(persons, newName)) {
      changeNumber()
    } else {
      savePerson()
    }
  }

  const handleDeletePerson = (personId) => {
    const name = utilService.findNameById(personId, persons)
    if (window.confirm(`Delete ${name} ?`)) {
      removePerson(personId)
    }
  }

  const reset = () => {
    setNewName('')
    setNewNumber('')
  }

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const alertUser = () => {
    const numberOwner = utilService.findNameByNumber(newNumber, persons)
    showErrorMessage(`No contact added, the number ${newNumber} is already saved to phonebook for ${numberOwner}`)
    reset()
  }

  const changeNumber = () => {
    if (window.confirm(` ${newName} is already added to phonebook, replace the old number with a new one?`)) {
      changePerson(utilService.findIdByName(newName, persons))
    }
  }

  const savePerson = () => {
    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .addPerson(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        showSuccessMessage(`The contact with name ${newName} and number ${newNumber} is added to phonebook`)
      })
      .catch(error => {
        showErrorMessage('Something went wrong: ' + error.response.data.error)
      })
    reset()
  }

  const changePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, number: newNumber }

    personService
      .updatePerson(id, changedPerson)
      .then(response => {
        setPersons(persons.map(p => p.id !== id ? p : response.data))
        showSuccessMessage(`The number ${newNumber} is added to ${newName} `)
      })
      .catch(error => {
        showErrorMessage(`The contact ${person.name} was already deleted from phonebook`)
        setPersons(persons.filter(p => p.id !== id))
      })
    reset()
  }

  const removePerson = (id) => {
    const name = utilService.findNameById(id, persons)
    personService
      .deletePerson(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
        showSuccessMessage(` ${name} is deleted from the phonebook `)
      })
      .catch(error => {
        showErrorMessage('Something went wrong: ' + error.response.data.error)
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <AddFilter filter={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <Form
        onSubmit={addPerson}
        valueName={newName}
        onNameChange={handleNameChange}
        valueNumber={newNumber}
        onNumberChange={handleNumberChange}
        buttonText='add'
      />
      <h2>Numbers</h2>
      <ShowFiltered
        contacts={persons}
        filter={newFilter}
        buttonFunction={handleDeletePerson}
      />
    </div>
  )
}

export default App
