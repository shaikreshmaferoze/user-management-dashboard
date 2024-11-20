// src/components/UserForm.js

import React, { useState, useEffect } from 'react';

const UserForm = ({ userToEdit, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent double submission

  // If we're editing an existing user, populate the form with their data
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        email: userToEdit.email,
        department: userToEdit.department,
      });
    }
  }, [userToEdit]);

  // Handle changes to the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior (page reload)
    
    if (isSubmitting) return; // Prevent multiple form submissions

    setIsSubmitting(true); // Set the flag to true while the form is submitting

    try {
      await onSave(formData); // Call the onSave callback with the form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
      }); // Clear form data after submitting
    } catch (error) {
      console.error("Error saving user", error);
    } finally {
      setIsSubmitting(false); // Reset flag after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Department"
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {userToEdit ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;
