// Mock user data
const users = [
  {
    userId: 1,
    name: "Rocky Singh",
    email: "rocky123@gmail.com",
    password: "12345",
  },
];

export default class UserModel {
  // Retrieve a user by email and password
  static getUser = (email, password) => {
    // Find the user with matching email and password
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    return user; // Return the found user or undefined
  };

  // Add a new user to the list
  static addUser = (name, email, password) => {
    // Check if the email is already in use
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      throw new Error("Email is already in use.");
    }

    // Create a new user object
    const user = {
      userId: users.length + 1, // Auto-generate user ID
      name,
      email,
      password,
    };

    // Add the new user to the users array
    users.push(user);
  };
}
