const Marker = require('../model/Marker');

const getAllMarkers = async (req, res) => {
  const markers = await Marker.find();
  if (!markers)
    return res.status(204).json({ message: 'No markers found.' });
  console.log('Result', markers);
  res.json(markers);
};

const createNewMarker = async (req, res) => {
  if (!req?.body?.name) {
    return res
      .status(400)
      .json({ message: 'First and last names are required' });
  }

  try {
    const result = await Marker.create({
      ...req.body,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateMarker = async (req, res) => {
  if (!req?.body?.id) {
    return res
      .status(400)
      .json({ message: 'ID parameter is required.' });
  }

  const marker = await Marker.findOne({
    _id: req.body.id,
  }).exec();

  console.log(req.body);
  if (!marker) {
    return res
      .status(204)
      .json({ message: `No Marker matches ID ${req.body.id}.` });
  }
  const result = await Marker.updateOne(
    {
      _id: req.body.id,
    },
    {
      ...req.body,
    }
  );
  res.json(result);
};

const deleteMarker = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: 'Marker ID required.' });

  const marker = await Marker.findOne({
    _id: req.body.id,
  }).exec();

  console.log(marker);
  if (!marker) {
    return res
      .status(204)
      .json({ message: `No Marker matches ID ${req.body.id}.` });
  }
  const result = await Marker.deleteOne({
    _id: req.body.id,
  }); //{ _id: req.body.id }
  console.log('Deleted', result);
  res.status(200).json(result);
};

const getMarker = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'Marker ID required.' });

  const marker = await Marker.findOne({
    _id: req.params.id,
  }).exec();
  if (!marker) {
    return res
      .status(204)
      .json({ message: `No Marker matches ID ${req.params.id}.` });
  }
  res.json(marker);
};

module.exports = {
  getAllMarkers,
  createNewMarker,
  updateMarker,
  deleteMarker,
  getMarker,
};
