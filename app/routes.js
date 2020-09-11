const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// GET SPRINT NAME - useful for relative templates
router.use('/', (req, res, next) => {
  res.locals.currentURL = req.originalUrl; //current screen
  res.locals.prevURL = req.get('Referrer'); // previous screen
  req.folder = req.originalUrl.split('/')[1]; //folder, e.g. 'current'
  req.subfolder = req.originalUrl.split('/')[2]; //sub-folder e.g. 'service'
  res.locals.folder = req.folder; // what folder the url is
  res.locals.subfolder = req.subfolder; // what subfolder the URL is in
  console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder  );
  console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );
  next();
});

// Route index page
router.get('/', function (req, res) {
  res.render('./index')
});

// Set service name based on sub folders for different prototypes
router.get('/current/*', function(req, res, next){
  res.locals['serviceName'] = 'Apply for a large countryside productivity grant'
  next()
});

// Start folder specific route
router.use('/views/current', require('./views/current/routes/_routes'));
router.use('/views/v1', require('./views/v1/routes/_routes'));

// Question routing

router.post('/farming-type-answer', function (req, res) {

  var farmingType = req.session.data['farming-type']

  if (farmingType == "none"){res.redirect('current/views/farming-type-fail')}
  else {res.redirect('current/views/legal-status')}
});

router.post('/legal-status-answer', function (req, res) {

  var legalStatus = req.session.data['legal-status']

  if (legalStatus == "none"){res.redirect('current/views/legal-status-fail')}
  else {res.redirect('current/views/country')}
});

router.post('/country-answer', function (req, res) {

  var country = req.session.data['country']

  if (country == "no"){res.redirect('current/views/country-fail')}
  else {res.redirect('current/views/tenancy')}
});

router.post('/tenancy-answer', function (req, res) {

  var tenant = req.session.data['tenancy']

  if (tenant == "no"){res.redirect('current/views/project-cost')}
  else {res.redirect('current/views/tenancy-length')}
});

router.post('/tenancy-length-answer', function (req, res) {

  var tenancyLength = req.session.data['tenancy-length']

  if (tenancyLength == "no"){res.redirect('current/views/tenancy-length-fail')}
  else {res.redirect('current/views/project-cost')}
});

module.exports = router
