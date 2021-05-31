const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// GET SPRINT NAME - useful for relative templates
router.use('/', (req, res, next) => {
  res.locals.currentURL = req.originalUrl // current screen
  res.locals.prevURL = req.get('Referrer') // previous screen
  req.folder = req.originalUrl.split('/')[1] // folder, e.g. 'current'
  req.subfolder = req.originalUrl.split('/')[2] // sub-folder e.g. 'service'
  res.locals.folder = req.folder // what folder the url is
  res.locals.subfolder = req.subfolder // what subfolder the URL is in
  // console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder)
  // console.log('previous page is: ' + res.locals.prevURL + ' and current page is ' + req.url + ' ' + res.locals.currentURL)
  console.log('\n-------------------------\n')
  next()
})

// Route index page
router.get('/', function (req, res) {
  res.render('./index')
})

// Set service name based on sub folders for different prototypes
router.get('/current/views/water/*', function (req, res, next) {
  res.locals.serviceName = 'Check if you can apply for a Farming Transformation Fund water grant'
  next()
})

// Set service name based on sub folders for different prototypes
router.get('/current/views/slurry/*', function (req, res, next) {
  res.locals.serviceName = 'Apply for a large grant for slurry equipment'
  next()
})

// Set service name based on sub folders for different prototypes
router.get('/v7-privateBeta/views/water/*', function (req, res, next) {
  res.locals.serviceName = 'Check if you can apply for a water resource management grant'
  next()
})

// Set service name based on sub folders for different prototypes
router.get('/v7-privateBeta/views/slurry/*', function (req, res, next) {
  res.locals.serviceName = 'Apply for a large grant for slurry equipment'
  next()
})

// Set service name based on sub folders for different prototypes
router.get('/v6/views/water/*', function (req, res, next) {
  res.locals.serviceName = 'Check if you can apply for a water resource management grant'
  next()
})

// Set service name based on sub folders for different prototypes
router.get('/v6/views/slurry/*', function (req, res, next) {
  res.locals.serviceName = 'Apply for a large grant for slurry equipment'
  next()
})

// Set service name based on sub folders for different prototypes
router.get('/v5/views/water/*', function (req, res, next) {
  res.locals.serviceName = 'Apply for a Farming Transformation Fund water resource management grant'
  next()
})

// Set service name based on sub folders for different prototypes
router.get('/v5/views/slurry/*', function (req, res, next) {
  res.locals.serviceName = 'Apply for a large grant for slurry equipment'
  next()
})

// Set service name based on sub folders for different prototypes
router.get('/v4+/views/water/*', function (req, res, next) {
  res.locals.serviceName = 'Apply for a large grant for a water resource management project'
  next()
})

// Set service name based on sub folders for different prototypes
router.get('/v4+/views/slurry/*', function (req, res, next) {
  res.locals.serviceName = 'Apply for a large grant for slurry equipment'
  next()
})

// Set service name based on sub folders for different prototypes
router.get('/v4/views/water/*', function (req, res, next) {
  res.locals.serviceName = 'Apply for a large grant for a water resource management project'
  next()
})

// Set service name based on sub folders for different prototypes
router.get('/v4/views/slurry/*', function (req, res, next) {
  res.locals.serviceName = 'Apply for a large grant for slurry equipment'
  next()
})

// Set service name based on sub folders for different prototypes
router.get('/v3/views/water/*', function (req, res, next) {
  res.locals.serviceName = 'Apply for a large grant for a water resource management project'
  next()
})

// Set service name based on sub folders for different prototypes
router.get('/v3/views/slurry/*', function (req, res, next) {
  res.locals.serviceName = 'Apply for a large grant for slurry equipment'
  next()
})

router.get('/v2/*', function (req, res, next) {
  res.locals.serviceName = 'Apply for a large countryside productivity grant for water'
  next()
})

// Start folder specific route
router.use('/current', require('./views/current/routes/_routes-water'))
router.use('/current', require('./views/current/routes/_routes-slurry'))
router.use('/v1', require('./views/v1/routes/_routes'))
router.use('/v2', require('./views/v2/routes/_routes'))
router.use('/v3', require('./views/v3/routes/_routes-water'))
router.use('/v3', require('./views/v3/routes/_routes-slurry'))
router.use('/v4', require('./views/v4/routes/_routes-water'))
router.use('/v4', require('./views/v4/routes/_routes-slurry'))
router.use('/v4+', require('./views/v4+/routes/_routes-water'))
router.use('/v4+', require('./views/v4+/routes/_routes-slurry'))
router.use('/v5', require('./views/v5/routes/_routes-water'))
router.use('/v5', require('./views/v5/routes/_routes-slurry'))
router.use('/v6', require('./views/v6/routes/_routes-water'))
router.use('/v6', require('./views/v6/routes/_routes-slurry'))
router.use('/v7-privateBeta', require('./views/v7-privateBeta/routes/_routes-water'))
router.use('/v7-privateBeta', require('./views/v7-privateBeta/routes/_routes-slurry'))

module.exports = router
