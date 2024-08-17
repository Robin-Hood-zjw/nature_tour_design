const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

// read JSON file
const tours = fs.readFileSync('tours-simple.json', 'utf-8');

// import data into database
const importData = async () => {
  try {
    console.log('Data successfully loaded!');
    await Tour.create(tours);
  } catch (err) {
    console.log(err);
  }
};
