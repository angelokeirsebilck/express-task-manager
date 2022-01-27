const mongoose = require('mongoose');

const connectionString =
  'mongodb+srv://tasks:Computer1@cluster0.ldiqx.mongodb.net/task-manager?retryWrites=true&w=majority';

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to DB..');
  })
  .catch((err) => {
    console.log(err);
  });
