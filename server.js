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
    console.log('DB connection successful');
  })
  .catch((err) => console.log('Error'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  Server.close(() => {
    process.exit(1);
  });
});
