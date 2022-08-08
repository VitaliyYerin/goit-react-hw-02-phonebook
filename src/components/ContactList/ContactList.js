import PropTypes from 'prop-types';
import ContactListItem from 'components/ContactListItem';
import s from './ContactList.module.css';

export default function ContactList({ contacts, deleteContact }) {
  return (
    <ul className={s.contactList}>
        {contacts.map(({ name, number, id }) => (
            <ContactListItem
              name={name}
              number={number}
              key={id}
              handleClick={() => deleteContact(id)}
            />
          ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
