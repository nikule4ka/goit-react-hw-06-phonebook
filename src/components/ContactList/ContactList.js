import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as contactsActions from '../../redux/contacts/contacts-action';
import s from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContacts }) => (
  <ul className={s.ContactList}>
    {contacts.length ? (
      contacts.map(({ id, name, number }) => (
        <li key={id} id={id} className={s.ContactList__item}>
          <p className={s.ContactList__text}>{name}:</p>
          <p className={s.ContactList__text}>{number}</p>

          <button
            className={s.ContactList__btn}
            onClick={() => onDeleteContacts(id)}
          >
            Delete
          </button>
        </li>
      ))
    ) : (
      <p>No contacts found</p>
    )}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ),
  onDeleteContacts: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const contacts = state.contacts.items.filter(
    ({ name, number }) =>
      name.toLowerCase().includes(state.contacts.filter.toLowerCase()) ||
      number.includes(state.contacts.filter),
  );
  return {
    contacts,
  };
};

const mapDispatchToProps = dispatch => ({
  onDeleteContacts: id => dispatch(contactsActions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
