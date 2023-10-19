//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
const { serviceName, schemeList } = require('./utils')

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
router.use('/ahw/current', require('./views/ahw/current/routes/routes'))
router.use('/ahw/v1', require('./views/ahw/v1/routes/routes'))
router.use('/ahw/v2', require('./views/ahw/v2/routes/routes'))
router.use('/ahw/v3', require('./views/ahw/v3/routes/routes'))
router.use('/ahw/v4', require('./views/ahw/v4/routes/routes'))
router.use('/ahw/v5', require('./views/ahw/v5/routes/routes'))
router.use('/ahw/v51', require('./views/ahw/v51/routes/routes'))
router.use('/ahw/v52t', require('./views/ahw/v52t/routes/routes'))

router.use('/slurrystorage/current', require('./views/slurrystorage/current/routes/routes'))
router.use('/slurrystorage/v1', require('./views/slurrystorage/v1/routes/routes'))
router.use('/slurrystorage/v2', require('./views/slurrystorage/v2/routes/routes'))
router.use('/slurrystorage/v3', require('./views/slurrystorage/v3/routes/routes'))
router.use('/slurrystorage/v4', require('./views/slurrystorage/v4/routes/routes'))
router.use('/slurrystorage/r2v1', require('./views/slurrystorage/r2v1/routes/routes'))
router.use('/slurrystorage/r2v2', require('./views/slurrystorage/r2v2/routes/routes'))
router.use('/slurrystorage/r2v21', require('./views/slurrystorage/r2v21/routes/routes'))

router.use('/addingvalue/current', require('./views/addingvalue/current/routes/routes'))
router.use('/addingvalue/v3', require('./views/addingvalue/v3/routes/routes'))
router.use('/addingvalue/v2', require('./views/addingvalue/v2/routes/routes'))
router.use('/addingvalue/v1', require('./views/addingvalue/v1/routes/routes'))

router.use('/robotics/current', require('./views/robotics/current/routes/routes'))
router.use('/robotics/v6', require('./views/robotics/v5/routes/routes'))
router.use('/robotics/v5', require('./views/robotics/v5/routes/routes'))
router.use('/robotics/v4', require('./views/robotics/v4/routes/routes'))
router.use('/robotics/v3', require('./views/robotics/v3/routes/routes'))
router.use('/robotics/v2', require('./views/robotics/v2/routes/routes'))
router.use('/robotics/v1', require('./views/robotics/v1/routes/routes'))

router.use('/slurry/current', require('./views/slurry/current/routes/routes'))
router.use('/slurry/v2', require('./views/slurry/v2/routes/routes'))
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
router.use('/water/v8public', require('./views/water/v8public/routes/routes'))
router.use('/water/r2v2', require('./views/water/r2v2/routes/routes'))
