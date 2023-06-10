import React from 'react';
import css from './ContactListItem.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/store';

export default function ContactListItem({ contact }) {
  const dispatch = useDispatch();

 

  const findIdToDeleteContact = () => {
    dispatch(
      deleteContact(contact.id)
        );
   };

  const name = contact.name;
  const number = contact.number;
  return (
    <li className={css.listItem}>
      {name}: {number}{' '}
      <button onClick={findIdToDeleteContact} className={css.button}>
        Delete
      </button>
    </li>
  );
}
