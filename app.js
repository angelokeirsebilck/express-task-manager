const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');

const tasks = require('./routes/tasks');

// Middleware

app.use(express.static('./public'));
app.use(express.json());

// Routes

app.get('/hello', (req, res) => {
  res.send('Task manager app');
});

app.use('/api/v1/tasks', tasks);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
