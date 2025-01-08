const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const { Server } = require('http');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then((con) => {
    console.log('Database connection successful.');
  })
  .catch((err) => console.log('Database connection failure: ', err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection happen.');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception happen.');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
