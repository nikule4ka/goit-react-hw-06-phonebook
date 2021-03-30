import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactsActions from '../../redux/contacts/contacts-action';

import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  hanldeChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.hanldeChange}
            placeholder="Name..."
            required
          />
        </label>
        <label>
          Number
          <input
            type="phone"
            name="number"
            value={number}
            onChange={this.hanldeChange}
            placeholder="Phone..."
            required
          />
        </label>
        <button type="submit" className={s.btnForm}>
          Add contact
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: contact => dispatch(contactsActions.addContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
