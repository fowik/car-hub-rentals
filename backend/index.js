import { PrismaClient, Prisma } from '@prisma/client'
import express from 'express';
import cors from 'cors';

const prisma = new PrismaClient()
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/api/users/register', async (req, res) => {
  const user = await prisma.users.create({
    data: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      full_name: req.body.full_name,
    },
  })
  console.log(user);
  res.send(user)
})

app.post('/api/users/login', async (req, res) => {
  const user = await prisma.users.findFirst({
    where: {
      username: req.body.username,
      email: req.body.email,
    },  
  })

  if (user && user.password === req.body.password) {
    // User found and password matches, store user data in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    redirect('/user');
  } else {
    // User not found or password doesn't match, handle the error
    console.log("User not found or password incorrect");
  }
  
})