import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers like .toBeInTheDocument()

// Mock the API functions
jest.mock('./api.js', () => ({
  fetchUsers: jest.fn(),
  addUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

import { fetchUsers, addUser, updateUser, deleteUser } from './api.js';

describe('App Component', () => {

  // Setup the mock responses before each test
  beforeEach(() => {
    fetchUsers.mockResolvedValue([
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', department: 'HR' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', department: 'Engineering' },
    ]);

    addUser.mockResolvedValue({ id: 3, firstName: 'Tom', lastName: 'Green', email: 'tom@example.com', department: 'Marketing' });
    updateUser.mockResolvedValue({ id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', department: 'HR' });
    deleteUser.mockResolvedValue(true);
  });

  test('renders the app and displays the user list', async () => {
    render(<App />);

    // Check if the loading state is shown initially (before data is fetched)
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the users to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  test('displays error message when failing to fetch users', async () => {
    // Mock an error in the fetchUsers API call
    fetchUsers.mockRejectedValueOnce(new Error('Failed to fetch users'));

    render(<App />);

    // Check if error message is shown when the fetch fails
    await waitFor(() => {
      expect(screen.getByText(/failed to load users/i)).toBeInTheDocument();
    });
  });

  test('can add a new user', async () => {
    render(<App />);

    // Wait for the user list to load
    await waitFor(() => screen.getByText('John Doe'));

    // Open the Add User form
    fireEvent.click(screen.getByText(/add user/i));

    // Fill out the form and submit
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Tom' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Green' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'tom@example.com' } });
    fireEvent.change(screen.getByLabelText(/department/i), { target: { value: 'Marketing' } });

    fireEvent.click(screen.getByText(/add user/i));

    // Wait for the new user to be added to the list
    await waitFor(() => {
      expect(screen.getByText('Tom Green')).toBeInTheDocument();
    });
  });

  test('displays error message when adding a new user fails', async () => {
    // Mock an error in the addUser API call
    addUser.mockRejectedValueOnce(new Error('Failed to add user'));

    render(<App />);

    // Open the Add User form
    fireEvent.click(screen.getByText(/add user/i));

    // Fill out the form and submit
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Tom' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Green' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'tom@example.com' } });
    fireEvent.change(screen.getByLabelText(/department/i), { target: { value: 'Marketing' } });

    fireEvent.click(screen.getByText(/add user/i));

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/failed to add user/i)).toBeInTheDocument();
    });
  });

  test('can edit a user', async () => {
    render(<App />);

    // Wait for the user list to load
    await waitFor(() => screen.getByText('John Doe'));

    // Open the Edit User form for the first user
    fireEvent.click(screen.getByText(/edit/i, { selector: 'button' }));

    // Modify the user's email
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });

    fireEvent.click(screen.getByText(/update user/i));

    // Wait for the updated user to be displayed
    await waitFor(() => {
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });
  });

  test('displays error message when editing a user fails', async () => {
    // Mock an error in the updateUser API call
    updateUser.mockRejectedValueOnce(new Error('Failed to update user'));

    render(<App />);

    // Wait for the user list to load
    await waitFor(() => screen.getByText('John Doe'));

    // Open the Edit User form for the first user
    fireEvent.click(screen.getByText(/edit/i, { selector: 'button' }));

    // Modify the user's email
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });

    fireEvent.click(screen.getByText(/update user/i));

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/failed to update user/i)).toBeInTheDocument();
    });
  });

  test('can delete a user', async () => {
    render(<App />);

    // Wait for the user list to load
    await waitFor(() => screen.getByText('John Doe'));

    // Click the delete button for the first user
    fireEvent.click(screen.getByText(/delete/i, { selector: 'button' }));

    // Wait for the user to be removed from the list
    await waitFor(() => {
      expect(screen.queryByText('John Doe')).toBeNull();
    });
  });

  test('displays error message when deleting a user fails', async () => {
    // Mock an error in the deleteUser API call
    deleteUser.mockRejectedValueOnce(new Error('Failed to delete user'));

    render(<App />);

    // Wait for the user list to load
    await waitFor(() => screen.getByText('John Doe'));

    // Click the delete button for the first user
    fireEvent.click(screen.getByText(/delete/i, { selector: 'button' }));

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/failed to delete user/i)).toBeInTheDocument();
    });
  });
});
