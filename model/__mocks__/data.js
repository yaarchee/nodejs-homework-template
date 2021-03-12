const contacts = [
  {
    _id: "603a3d65aeaf8231a8d528ef",
    name: "Jada",
    phone: "999999999",
    email: "696@969.com",
    subscription: "free",
  },
  {
    _id: "604494709e8e184958f75f36",
    name: "jayden",
    phone: "999999998",
    email: "email2@test.com",
    subscription: "free",
  },
  {
    _id: "604494709e8e184958f75f36",
    name: "Con1",
    phone: "999999999",
    email: "email3@test.com",
    subscription: "free",
  },
];

const newContact = {
  email: "",
  name: "",
  phone: "",
};

const User = {
  _id: "60414613bcbd454b7cd87791",
  name: "Guest",
  subscription: "free",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDE0NjEzYmNiZDQ1NGI3Y2Q4Nzc5MSIsImlhdCI6MTYxNTEwNjk2MSwiZXhwIjoxNjE4NzAzMzYxfQ.Z0y-ExpsjXvo-q3hjri6_I5Xr-e1k_YffXTRroNrXlM",
  sex: "none",
  email: "trancemanjake@gmail.com",
  password: "$2a$08$qkXmsF4r1p8OVcluN1RNBOeGZcFMn.DSM5ubXYQ8z4cUm.y.d4EnG",
  avatar: "604886c0ce767302d07eaa2f\\1615372153825-AwIbxRg_4hg.jpg",
};
const newUser = { email: "newtest@newtest.com", password: "123456789" };
const users = [];
users[0] = User;
module.exports = { contacts, newContact, User, users, newUser };
