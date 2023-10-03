var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  // Creating the car-hub-rentals database
  con.query("CREATE DATABASE IF NOT EXISTS car_hub_rentals", function (err, result) {
    if (err) throw err;
    console.log("Database created or already exists");

    // Switch to the car-hub-rentals database
    con.query("USE car_hub_rentals", function (err, result) {
      if (err) throw err;
      console.log("Using car-hub-rentals database");

      // Creating the 'users' table in the car-hub-rentals database
      var createTableQuery = "CREATE TABLE IF NOT EXISTS users (\
        user_id INT AUTO_INCREMENT PRIMARY KEY,\
        username VARCHAR(255) NOT NULL,\
        email VARCHAR(255) NOT NULL,\
        password_hash VARCHAR(255) NOT NULL,\
        full_name VARCHAR(255) NOT NULL,\
        date_of_birth DATE,\
        registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP\
      )";

      con.query(createTableQuery, function (err, result) {
        if (err) throw err;
        console.log("Users table created");
      });


    });
  });
});
