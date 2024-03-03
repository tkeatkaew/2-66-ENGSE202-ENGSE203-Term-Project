const fetch = require("cross-fetch");
const { response } = require("express");
const axios = require('axios');

let mysql = require('mysql');
const env = require('../env.js');
const config = require('../dbconfig.js')[env];

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
})
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

console.log('Running Environment: ' + env);

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

const saveuser = async (req, res) => {
  const userData = req.body;
  console.log(userData);

  res.status(200).json(await saveUserData(userData));
  
};

// ฟังก์ชันสำหรับบันทึกข้อมูลผู้ใช้ในฐานข้อมูล
function saveUserData(userData) {
  const { gender, name, location, email, login, picture, dob } = userData;
  const { title, first, last } = name;
  const { country } = location;
  const { username, password, md5, sha1, sha256, uuid } = login;
  const { medium, large, thumbnail } = picture;
  const dateOfBirth = new Date(dob.date).toISOString().slice(0, 19).replace('T', ' '); // แปลงรูปแบบของวันเกิด

  console.log("saveUserData(userData): " + userData);
  
  /*
  //สำหรับ database: 'user66007_db'
    const sql = `INSERT INTO users (name_title, name_first, name_last, email, username, password, picture_large, date_of_birth) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`; //ต้องเพิ่ม column ให้ครบตามที่กำหนดไว้
  
    let values = [title, first, last, email, username, password, large, dateOfBirth];
  */

  //สำหรับ database: 'term_project_db'
  const sql = `INSERT INTO users (name_title, name_first, name_last, email, username, password, picture_large) 
VALUES (?, ?, ?, ?, ?, ?, ?)`; //ต้องเพิ่ม column ให้ครบตามที่กำหนดไว้

  let values = [title, first, last, email, username, password, large];
  let sql_res;

  return new Promise((resolve, reject) => {

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        //return console.error('Error saving user data:', error.message);

        console.log("error: " + JSON.stringify(error))
        connection.end();

        return resolve({
          error: true,
          statusCode: 404,
          returnCode: 0,
          errMessage: error.code + ':' + error.sqlMessage
        });

      }
      else
        if (results.affectedRows > 0) {

          console.log('User data saved successfully!');
          console.log("results: " + JSON.stringify(results))
          //connection.end();

          return resolve({
            error: false,
            statusCode: 200,
            returnCode: 1,
            messsage: 'User was inserted',
          });

        }

    });

  });

}

module.exports = {
  users, saveuser,
};
