// src/components/UserList.js

import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser, addUser, updateUser } from '../api';
import UserCard from './UserCard';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    getUsers();
  }, []);

  const handleAddUser = async (userData) => {
    const newUser = await addUser(userData);
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleUpdateUser = async (userData) => {
    const updatedUser = await updateUser(userToEdit.id, userData);
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setUserToEdit(null); // Reset the editing state after updating
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <UserForm userToEdit={userToEdit} onSave={userToEdit ? handleUpdateUser : handleAddUser} />
      <div className="user-list">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={setUserToEdit}
            onDelete={handleDeleteUser}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
