import axios from 'axios';
var users = [];

export const fetchUsers = (emailID) => {
  axios.get(`https://localhost:7026/api/Transaction/${emailID}`)
    .then((result) => {
      users = result.data;  
    })
    .catch((err) => console.log(err));
};

export const getUsers = function (page, limit) {
  // 0 - 4 (for page 1)
  // 5 - 9 (for page 2) ....

  let data=[];
  for (let i = (page - 1) * limit; i < (page * limit) && users[i]; i++) {
    data.push(users[i])
  }
  return data;
};

export const getLength = function () {
    return users.length;
}
