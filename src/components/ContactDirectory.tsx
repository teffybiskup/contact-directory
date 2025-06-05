import React, { useState, FormEvent } from 'react';
import { Contact } from '../types';
import './ContactDirectory.scss';

const ContactDirectory: React.FC = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showError, setShowError] = useState(false);
  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateName = (value: string): boolean =>
    /^[A-Za-z ]{1,20}$/.test(value.trim());

  const validateMobile = (value: string): boolean =>
    /^[0-9]{10}$/.test(value);

  const validateEmail = (value: string): boolean =>
    /^[a-zA-Z][a-zA-Z0-9.]{1,20}@[a-zA-Z]{2,20}\.[a-zA-Z]{2,10}$/.test(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;

    if (!validateName(name)) {
      setNameError('Name must contain only letters and spaces (max 20 chars).');
      valid = false;
    } else {
      setNameError('');
    }

    if (!validateMobile(mobile)) {
      setMobileError('Mobile must contain exactly 10 digits.');
      valid = false;
    } else {
      setMobileError('');
    }

    if (!validateEmail(email)) {
      setEmailError('Email must be valid and properly formatted.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!valid) {
      setShowError(true);
      return;
    }

    setContacts([...contacts, { name, mobile, email }]);
    setName('');
    setMobile('');
    setEmail('');
    setShowError(false);
    setNameError('');
    setMobileError('');
    setEmailError('');
  };

  return (
    <div className="container">
      <h1>Contact Phone Directory</h1>

      <div
        id="error"
        data-testid="error"
        className="error-box"
        style={{ display: showError ? 'block' : 'none' }}
      >
        Invalid Input
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Contact Name</label>
          <input
            type="text"
            id="name"
            name="name"
            data-testid="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {nameError && <span className="field-error">{nameError}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            data-testid="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          {mobileError && <span className="field-error">{mobileError}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            id="email"
            name="email"
            data-testid="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <span className="field-error">{emailError}</span>}
        </div>

        <button type="submit" data-testid="submit">Add Contact</button>
      </form>

      <h2>Contact List</h2>
      <table>
        <thead>
          <tr>
            <th>Contact Name</th>
            <th>Mobile</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody id="contact-table-body">
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.mobile}</td>
              <td>{contact.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactDirectory;
