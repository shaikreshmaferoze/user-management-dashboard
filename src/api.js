

// Mock data
let users = [
    { id: 1, firstName: "Leanne", lastName: "Graham", email: "leanne@example.com", department: "Engineering" },
    { id: 2, firstName: "Ervin", lastName: "Howell", email: "ervin@example.com", department: "Human Resources" },
    { id: 3, firstName: "Carmen", lastName: "Alvarez", email: "carmen@example.com", department: "Marketing" },
    { id: 4, firstName: "Tim", lastName: "Miller", email: "tim@example.com", department: "Finance" },
    { id: 5, firstName: "Sarah", lastName: "Parker", email: "sarah@example.com", department: "Operations" },
  ];
  
  // Fetch all users
  export const fetchUsers = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(users);
      }, 500);
    });
  };
  
  // Add a new user
  export const addUser = (user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { ...user, id: users.length + 1 }; // ID is auto-incremented
        users.push(newUser);
        resolve(newUser);
      }, 500);
    });
  };
  
  // Update an existing user
  export const updateUser = (id, user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = users.findIndex((user) => user.id === id);
        if (index !== -1) {
          users[index] = { ...users[index], ...user };
          resolve(users[index]);
        } else {
          resolve(null);
        }
      }, 500);
    });
  };
  
  // Delete a user
  export const deleteUser = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        users = users.filter((user) => user.id !== id);
        resolve();
      }, 500);
    });
  };
  
