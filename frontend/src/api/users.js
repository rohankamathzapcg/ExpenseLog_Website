import axios from 'axios';
 
export const fetchUsers = (emailID) => {
  return axios.get(`https://localhost:7026/api/Transaction/${emailID}`)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};

// export const getUsers = function (page, limit) {
//   // 0 - 4 (for page 1)
//   // 5 - 9 (for page 2) ....

//   let data=[];
//   for (let i = (page - 1) * limit; i < (page * limit) && users[i]; i++) {
//     data.push(users[i])
//   }
//   return data;
// };

// export const getLength = function () {
//     return users.length;
// }
