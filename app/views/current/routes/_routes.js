const express = require('express')
const router = express.Router()

router.post('/farming-type-answer', function (req, res) {

  var farmingType = req.session.data['farming-type']

  if (farmingType == "none"){res.redirect('current/views/farming-type-fail')}
  else {res.redirect('current/views/legal-status')}
});

router.post('/legal-status-answer', function (req, res) {

  var legalStatus = req.session.data['legal-status']

  if (legalStatus == "none"){res.redirect('current/views/legal-status-fail')}
  else {res.redirect('current/views/start')}
});

module.exports = router
