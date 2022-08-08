import { Component } from 'react';

import { ContactForm } from 'components/ContactForm';
import Contacts from 'components/ContactList';
import Filter from 'components/Filter';
import s from './App.module.css';

import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  deleteContact = id => {
    this.setState({
      contacts: [...this.state.contacts.filter(contact => contact.id !== id)],
    });
  };

  handleFilterChange = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    let isAdded = false;

    this.state.contacts.forEach(el => {
      if (el.name.toLowerCase() === normalizedName) {
        alert(`${name} is already in contacts`);
        isAdded = true;
      }
    });

    if (isAdded) {
      return;
    }

    let contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normilizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className={s.container}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} contacts={contacts} />
        <h2>Contacts</h2>
        <Filter filter={filter} handleChange={this.handleFilterChange} />
        <Contacts
          contacts={filteredContacts}
          filter={filter}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export { App };
