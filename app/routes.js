const express = require('express')
const router = express.Router()
const { serviceName, schemeList } = require('./utils')

// Add your routes here - above the module.exports line

// GET SPRINT NAME - useful for relative templates
router.use('/', (req, res, next) => {
  res.locals.currentURL = req.originalUrl // current screen
  res.locals.prevURL = req.get('Referrer') // previous screen
  req.folder = req.originalUrl.split('/')[1] // folder, e.g. 'current'
  req.subfolder = req.originalUrl.split('/')[2] // sub-folder e.g. 'service'
  res.locals.folder = req.folder // what folder the url is
  res.locals.subfolder = req.subfolder // what subfolder the URL is in
  console.log('\n-------------------------\n')
  next()
})

// Route index page
router.get('/', function (req, res) {
  res.render('./index')
})

router.get('/:scheme/:version/*', function (req, res, next) {
  const { version, scheme } = req.params

  if (schemeList.includes(scheme)) {
    res.locals.serviceName = serviceName[scheme][version]
  }
  next()
})

// Start folder specific route
router.use('/robotics/current', require('./views/robotics/current/routes/routes'))
router.use('/slurry/current', require('./views/slurry/current/routes/routes'))
router.use('/slurry/v1', require('./views/slurry/v1/routes/routes'))
router.use('/water/current', require('./views/water/current/routes/routes'))
router.use('/v1', require('./views/water/v1/routes/routes'))
router.use('/water/v2', require('./views/water/v2/routes/routes'))
router.use('/water/v3', require('./views/water/v3/routes/routes'))
router.use('/water/v4', require('./views/water/v4/routes/routes'))
router.use('/water/v4b', require('./views/water/v4b/routes/routes'))
router.use('/water/v5', require('./views/water/v5/routes/routes'))
router.use('/water/v6', require('./views/water/v6/routes/routes'))
router.use('/water/v7private', require('./views/water/v7private/routes/routes'))

module.exports = router
