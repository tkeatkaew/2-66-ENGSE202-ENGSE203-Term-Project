const { response } = require("express");
const axios = require('axios');

const users = async (req, res = response) => {

  try {

    axios.get('https://randomuser.me/api/?page=1&results=10')
        .then(response => {
            //res.send(response.data);
            res.json(response.data);

         });

  } catch (err) {
    console.error(err);
  }

};

module.exports = {
  users,
};
