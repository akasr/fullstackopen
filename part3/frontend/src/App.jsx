import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import  Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initalPersons => {
        setPersons(initalPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const person = persons.find(person => person.name === newName);
    if(person){
      const canDelete = confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`);
      if(canDelete){
        updateNumber(person.id, {...person, number: newNumber});
        setErrorMessage(`Changed ${person.name}'s number from ${person.number} to ${newNumber}`);
        setTimeout(() => setErrorMessage(null), 5000);
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService
      .create(newPerson)
      .then(returnedObject => {
        setPersons(persons.concat(returnedObject));
        setNewName('');
        setNewNumber('');
        setErrorMessage(`Added ${newPerson.name}`);
        setTimeout(() => setErrorMessage(null), 5000);
      })
      .catch(error => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => setErrorMessage(null), 5000);
      })
  }
  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    if(confirm(`Delete ${person.name}`)){
      personService
      .remove(id)
      .then(returnedObject => {
        console.log(returnedObject);
        setPersons(persons.filter(p => p.id !== id));
        setErrorMessage(`Deleted ${person.name}`);
        setTimeout(() => setErrorMessage(null), 5000);
      })
      .catch(error => {
        setPersons(persons.filter(p => p.id !== id));
        setErrorMessage(`Information of ${person.name} has already been removed from server`);
        setTimeout(() => setErrorMessage(null), 5000);
      })
    }
  }
  const updateNumber = (id, newObject) => {
    personService
      .update(id, newObject)
      .then(returnedObject => {
        setPersons(persons.map(p => p.id === id ? returnedObject : p));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => setErrorMessage(null), 5000);
      })
  }

  const handleNewName = (event) => {
    setNewName(event.target.value);
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  }
  const handleFilterInput = (event) => {
    setFilterInput(event.target.value);
  }
  const personsToShow = persons.filter(({name}) => name.toLowerCase().includes(filterInput.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={filterInput} handleChange={handleFilterInput} />

      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;