const singleUser = {
  name: "admin",
  username: "adminMock",
  password: "thegoodadmin",
  email: "adminMock@admin.com",
};

const adminMock = {
  name: "admin",
  username: "admin",
  password: "beerbook",
  email: "admin@admin.com",
};

const groupUsers = [
  {
    name: "user1",
    username: "user1",
    password: "imtheuser1",
    email: "user1@user1.com",
  },
  {
    name: "user2",
    username: "user2",
    password: "imtheuser2",
    email: "user2@user2.com",
  },
  {
    name: "user3",
    username: "user3",
    password: "imtheuser3",
    email: "user3@user3.com",
  },
];

module.exports = { singleUser, groupUsers, adminMock };
