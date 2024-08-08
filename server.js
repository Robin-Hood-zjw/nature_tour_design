const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
  console.log('DB connection successful');
});

const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: Number,
  price: Number,
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
