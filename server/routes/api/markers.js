const express = require('express');
const router = express.Router();
const markersController = require('../../controllers/markersController');

router
  .route('/')
  .get(markersController.getAllMarkers)
  .post(markersController.createNewMarker)
  .put(markersController.updateMarker)
  .delete(markersController.deleteMarker);

router.route('/:id').get(markersController.getMarker);

module.exports = router;
