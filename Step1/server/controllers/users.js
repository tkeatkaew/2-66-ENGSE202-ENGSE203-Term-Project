const fetch = require("cross-fetch");
const { response } = require("express");
const axios = require('axios');

const users = async (req, res = response) => {

  try {
    /*
        axios.get('https://randomuser.me/api/?page=1&results=10')
            .then(response => {
                res.send(response.data);
                res.json(response.data);
    
             });
    */
    const resp = await fetch(
      `https://randomuser.me/api/?page=1&results=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.status >= 400) {
      throw new Error("Bad response from server");
    }

    //const { data = [] } = await resp.json();
    const data = await resp.json();
    //console.log("Users1: "+data);

    res.json(data);

  } catch (err) {
    console.error(err);
  }

};

module.exports = {
  users,
};
