import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import ContactDirectory from '../../src/components/ContactDirectory';

describe('ContactDirectory', () => {
  const fillForm = (name: string, mobile: string, email: string) => {
    fireEvent.change(screen.getByTestId('name'), { target: { value: name } });
    fireEvent.change(screen.getByTestId('mobile'), { target: { value: mobile } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: email } });
  };

  it('renders all input fields and submit button', () => {
    render(<ContactDirectory />);
    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('mobile')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('submit')).toBeInTheDocument();
  });

  it('shows error on invalid name input', () => {
    render(<ContactDirectory />);
    fillForm('Invalid123', '1234567890', 'valid@example.com');
    fireEvent.click(screen.getByTestId('submit'));
    expect(screen.getByTestId('error')).toBeVisible();
  });

  it('shows error on invalid mobile input', () => {
    render(<ContactDirectory />);
    fillForm('Stefany Biskup', '12345abc', 'valid@example.com');
    fireEvent.click(screen.getByTestId('submit'));
    expect(screen.getByTestId('error')).toBeVisible();
  });

  it('shows error on invalid email input', () => {
    render(<ContactDirectory />);
    fillForm('Stefany Biskup', '1234567890', 'invalidemail');
    fireEvent.click(screen.getByTestId('submit'));
    expect(screen.getByTestId('error')).toBeVisible();
  });

  it('adds contact on valid input and clears form', () => {
    render(<ContactDirectory />);
    fillForm('Stefany Biskup', '1234567890', 'valid@example.com');
    fireEvent.click(screen.getByTestId('submit'));

    expect(screen.queryByTestId('error')).not.toBeVisible();
    expect(screen.getByTestId('name')).toHaveValue('');
    expect(screen.getByTestId('mobile')).toHaveValue('');
    expect(screen.getByTestId('email')).toHaveValue('');

    const rows = screen.getAllByRole('row');
    const row = rows.find(r => r.textContent?.includes('Stefany Biskup'));
    expect(row).toBeInTheDocument();
    expect(row).toHaveTextContent('1234567890');
    expect(row).toHaveTextContent('valid@example.com');
  });

  it('adds multiple contacts in order', () => {
    render(<ContactDirectory />);
    fillForm('Gabriel', '1111111111', 'gabriel@example.com');
    fireEvent.click(screen.getByTestId('submit'));

    fillForm('Fernanda', '2222222222', 'fernanda@example.com');
    fireEvent.click(screen.getByTestId('submit'));

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Gabriel');
    expect(rows[2]).toHaveTextContent('Fernanda');
  });
});
