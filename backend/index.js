const express = require('express')
const Sequelize = require("sequelize");

const app = express()
const port = 3000

const sequelize = new Sequelize(
    'car_hub_rentals',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const User = sequelize.define('User', {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
  });

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

app.get('/api/users/register', (req, res) => {



    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})