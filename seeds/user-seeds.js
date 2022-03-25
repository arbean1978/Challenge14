const { User } = require('../models');

const userData = [
  {
    id: 1,
    username: "Lacey",
    email: "Lacey@gmail.com",
    password: "password1234"
  },
  {
    id: 2,
    username: "Isaac",
    email: "Isaac@gmail.com",
    password: "password1234"
  },
  {
    id: 3,
    username: "Jaxon",
    email: "Jaxon@gmail.com",
    password: "password1234"
  },
  {
    id: 4,
    username: "Holden",
    email: "Holden@gmail.com",
    password: "password1234"
  },
  {
    id: 5,
    username: "Dominic",
    email: "Dominic@gmail.com",
    password: "password1234"
  }
];

const seedUsers = () => User.bulkCreate(userData);


module.exports = seedUsers;