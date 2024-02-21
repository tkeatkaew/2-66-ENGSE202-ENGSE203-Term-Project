const { response } = require("express");

let mysql = require('mysql');
const env = require('../env.js');
const config = require('../dbconfig.js')[env];

const login = async (req, res = response) => {
  const { email, password } = req.body;

  //----------------------

  let dbcon = mysql.createConnection(config);
  let QUERY = "SELECT * FROM users where email = '" + email + "'";

  dbcon.query(QUERY, (err, res) => {
    if (err) {
      console.log(err);
    } else {

      //res.send(res); //****

      // Ideally search the user in a database,
      // throw an error if not found.

      if (password !== "1234") { //****
        return res.status(400).json({
          msg: "User / Password are incorrect",
        });
      }

      res.json({
        name: "Test User",
        token: "A JWT token to keep the user logged in.",
        msg: "Successful login",
      });


    }
  });


};

module.exports = {
  login,
};
