// src/components/UserCard.js

import React from 'react';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <h3>{user.firstName} {user.lastName}</h3>
      <p>Email: {user.email}</p>
      <p>Department: {user.department}</p>
      <button onClick={() => onEdit(user)}>Edit</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
};

export default UserCard;

