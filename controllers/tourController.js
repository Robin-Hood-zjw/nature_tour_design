const Tour = require(`../models/tourModel`);

exports.checkBody = (req, res, next) => {
  if (!('name' in req.body && 'price' in req.body)) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Missing name or price' });
  }

  next();
};

exports.getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours: tours } });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((ele) => ele.id === id);

  res
    .status(200)
    .json({ status: 'success', results: tour.length, data: { tour } });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    },
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({ status: 'success', data: { tour: '' } });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
