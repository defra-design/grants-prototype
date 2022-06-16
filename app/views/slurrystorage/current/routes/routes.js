const express = require('express')
const router = express.Router()

const serviceName = 'Check if you can apply for a Farming Transformation Fund slurry acidification grant'

const { storeTypeCost, coverTypeCost, projectItemsCost } = require('../../utils')

console.log('Service name: ' + serviceName)

router.get('/start', function (req, res) {
  // =================================
  req.session.data = {
    COMPLETED: false,
    DETAILS: false
  }
  // =================================

  var nextUrl = 'farmer-type'

  res.render('./' + req.originalUrl, {
    nextUrl
  })
})

// : Q: Farmer type
router.get('/farmer-type', function (req, res) {
  var backUrl = 'start'
  var nextUrl = 'farmer-type-answer'
  var completedUrl = 'farmer-type-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/farmer-type-answer', function (req, res) {
  const typeCondition = req.session.data.farmertype
  // console.log ('typeCondition',typeCondition)

  if (typeCondition.includes('None of the above')) {
    res.redirect('farmer-type-fail')
  }
  res.redirect('legal-status')
})



// Q: LEGAL STATUS

router.get('/legal-status', function (req, res) {
  var backUrl = 'farmer-type'
  var nextUrl = 'legal-status-answer'
  var completedUrl = 'legal-status-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/legal-status-answer', function (req, res) {
  var legalStatus = req.session.data['legal-status']

  if (legalStatus === 'None') { res.redirect('legal-status-fail') } else { res.redirect('country') }
})

router.post('/legal-status-answer-completed', function (req, res) {
  var legalStatus = req.session.data['legal-status']

  if (legalStatus === 'None') { res.redirect('legal-status-fail') } else { res.redirect('answers') }
})



// Q : Country

router.get('/country', function (req, res) {
  var backUrl = 'legal-status'
  var nextUrl = 'country-answer'
  var completedUrl = 'country-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/country-answer', function (req, res) {
  var country = req.session.data.country
  var postcode = req.session.data.postcode
  if (!!country && country === 'yes') {
    if (!!postcode && postcode.length > 0) {
      country = 'yes: [ Postcode: ' + postcode + ' ]'
    }
    req.session.data['summary-country'] = country
    res.redirect('project-start')
  } else {
    res.redirect('country-fail')
  }
})


// PROJECT START

router.get('/project-start', function (req, res) {
  var planningPermission = req.session.data['planning-permission']

  var backUrl = 'country'
  var nextUrl = 'project-start-answer'
  var completedUrl = 'project-start-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/project-start-answer', function (req, res) {
  var projectStart = req.session.data['project-start']

  if (projectStart === 'project work') { res.redirect('project-start-fail') } else { res.redirect('tenancy') }
})

router.post('/project-start-answer-completed', function (req, res) {
  var projectStart = req.session.data['project-start']

  if (projectStart === 'project work') { res.redirect('project-start-fail') } else { res.redirect('answers') }
})

// Q: Tenancy

router.get('/tenancy', function (req, res) {
  var backUrl = 'project-start'
  var nextUrl = 'tenancy-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/tenancy-answer', function (req, res) {
  var tenant = req.session.data.tenancy

  if (tenant === 'Yes' || tenant === 'Contractor') {
    res.redirect('system-type')
  } else { res.redirect('tenancy-length') }
})

router.post('/tenancy-length-answer', function (req, res) {
  var tenancyLength = req.session.data['tenancy-length']

  if (tenancyLength === 'No') { res.redirect('tenancy-length-condition') } else { res.redirect('system-type') }
})

router.post('/tenancy-length-answer-completed', function (req, res) {
  res.redirect('answers')
})

// : Q: System type
router.get('/system-type', function (req, res) {
  var backUrl = 'tenancy'
  var nextUrl = 'system-type-answer'
  var completedUrl = 'system-type-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/system-type-answer', function (req, res) {
  var systemType = req.session.data.systemtype

  if (systemType === 'no system' || systemType === 'straw-bedded system') { res.redirect('system-type-fail') } else { res.redirect('existing-size-storage') }
})

router.post('/system-type-answer-completed', function (req, res) {
  var systemType = req.session.data.farmertype

  if (systemType === 'I do not have a system') { res.redirect('system-type-fail') } else { res.redirect('answers') }
})



// Q: Existing size Storage

router.get('/existing-size-storage', function (req, res) {
  var backUrl = 'system-type'
  var nextUrl = 'existing-size-storage-answer'
  var completedUrl = 'existing-size-storage-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/existing-size-storage-answer', function (req, res) {
  var existingSize = req.session.data['existing-size-storage']

  if (existingSize === 'At least 6 months') { res.redirect('existing-size-storage-fail') } else { res.redirect('planned-size-storage') }
})

// Q: Planned size Storage

router.get('/planned-size-storage', function (req, res) {
  var backUrl = 'existing-size-storage'
  var nextUrl = 'planned-size-storage-answer'
  var completedUrl = 'planned-size-storage-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/planned-size-storage-answer', function (req, res) {
  var plannedSize = req.session.data['planned-size-storage']

  if (plannedSize === 'Less than 6 months') { res.redirect('planned-size-storage-fail') } else { res.redirect('project-type') }
})

// Q: Project type

router.get('/project-type', function (req, res) {
  var backUrl = 'planned-size-storage'
  var nextUrl = 'project-type-answer'
  var completedUrl = 'project-type-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/project-type-answer', function (req, res) {
  var projectType = req.session.data.projecttype

  if (projectType === 'None of the above') { res.redirect('project-type-fail') } else { res.redirect('covers') }
})

// Q: Covers

router.get('/covers', function (req, res) {
  var backUrl = 'project-type'
  var nextUrl = 'covers-answer'
  var completedUrl = 'covers-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/covers-answer', function (req, res) {
  var coversImp = req.session.data.covers

  if (coversImp === 'No') { res.redirect('covers-fail') } else { res.redirect('standardised-costs') }
})



// Q: Standardised costs - routing embeded in-page

// Q: Store type

router.get('/store-type', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'standardised-costs'
  var nextUrl = 'storage-capacity-increase'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    storeTypeCost
  })
})

// Q: Storage capacity increase (renamed from Current storage capacity)

router.get('/storage-capacity-increase', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'store-type'
  var nextUrl = 'cover-type'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    storeTypeCost
  })
})


// Q: Cover type

router.get('/cover-type', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'storage-capacity-increase'
  var nextUrl = 'cover-size'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    coverTypeCost,
    storeTypeCost
  })
})

// Q: Cover size

router.get('/cover-size', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'cover-type'
  var nextUrl = 'project-items'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    coverTypeCost,
    storeTypeCost
  })
})

// Q: Other items

router.get('/project-items', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'cover-size'
  var nextUrl = 'item-sizes-quantities'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    coverTypeCost,
    storeTypeCost,
    projectItemsCost


  })
})

// Q: Item sizes and quantities

router.get('/item-sizes-quantities', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'project-items'
  var nextUrl = 'project-summary'
  var completedUrl = 'project-items-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    storeTypeCost,
    coverTypeCost,
    projectItemsCost
  })
})

// Q: Project summary

router.get('/project-summary', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'item-sizes-quantities'
  var nextUrl = 'potential-grant'
  var completedUrl = 'store-type'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    storeTypeCost,
    coverTypeCost,
    projectItemsCost
  })
})


// Q: Grant
router.get('/potential-grant', function (req, res) {
  var backUrl = 'project-summary'
  var nextUrl = 'remaining-costs'
  var completedUrl = 'grant-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})


// Q: remaining costs
router.get('/remaining-costs', function (req, res) {
  var backUrl = 'potential-grant'
  var nextUrl = 'remaining-costs-answer'
  var completedUrl = 'remaining-costs-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/remaining-costs-answer', function (req, res) {
  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts === 'no') { res.redirect('remaining-costs-fail') } else { res.redirect('air-quality') }
})

router.post('/remaining-costs-answer-completed', function (req, res) {
  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts === 'no') { res.redirect('remaining-costs-fail') } else { res.redirect('answers') }
})



// PLANNING PERMISSION

router.get('/planning-permission', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'water-quality'
  var nextUrl = 'planning-permission-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// PLANNING PERMISSION COMPLETED
router.post('/planning-permission-answer', function (req, res) {
  var planningPermission = req.session.data['planning-permission']

  if (planningPermission === 'Approved' || planningPermission === 'Applied') {
    res.redirect('planning-list')
  }

  if (planningPermission === 'Not yet applied') {
    res.redirect('planning-required-condition')
  }

  res.redirect('os-grid')
})

// PLANNING PERMISSION CONDITION
router.get('/planning-required-condition', function (req, res) {
  var backUrl = 'planning-permission'
  var nextUrl = 'os-grid'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

// OS grid
router.get('/os-grid', function (req, res) {
  var backUrl = 'planning-permission'
  var nextUrl = 'os-grid'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})




// answers

router.get('/answers', function (req, res) {
  req.session.data.COMPLETED = true

  var backUrl = 'answers-back'
  var nextUrl = 'business'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

router.get('/answers-back', function (req, res) {
  req.session.data.COMPLETED = false
  res.redirect('evidence')
})

// business

router.get('/business', function (req, res) {
  var backUrl = 'answers'
  var nextUrl = 'applying'
  var detailsUrl = 'check-details'

  res.render('./' + req.originalUrl, {
    nextUrl,
    backUrl,
    detailsUrl
  })
})

// applying
router.get('/applying', function (req, res) {
  var backUrl = 'business'
  var nextUrl = 'applying-answer'
  var detailsUrl = 'check-details'

  res.render('./' + req.originalUrl, {
    nextUrl,
    backUrl,
    detailsUrl
  })
})

router.post('/applying-answer', function (req, res) {
  const { applicant } = req.session.data

  if (applicant === 'Applicant') {
    res.redirect('applicant-details')
  }
  if (applicant === 'Contractor') {
    res.redirect('contractor-details')
  }

  res.redirect('agent-details')
})

// agent-details

router.get('/agent-details', function (req, res) {
  var backUrl = 'applying'
  var nextUrl = 'agent-details-answer'
  var detailsUrl = 'check-details'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    detailsUrl
  })
})

router.post('/agent-details-answer', function (req, res) {
  var contractorDetermine = req.session.data.tenancy

  if (contractorDetermine === 'Contractor') {
    res.redirect('contractor-details')
  } else { res.redirect('applicant-details') }
})

// applicant-details
router.get('/applicant-details', function (req, res) {
  var backUrl = req.session.data.applicant === 'Agent' ? 'agent-details' : 'applying'
  var nextUrl = 'check-details'
  var detailsUrl = 'check-details'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    detailsUrl
  })
})

// contractor-details
router.get('/contractor-details', function (req, res) {
  var backUrl = req.session.data.applicant === 'Agent' ? 'agent-details' : 'applying'
  var nextUrl = 'check-details'
  var detailsUrl = 'check-details'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    detailsUrl
  })
})

// check-details

router.get('/check-details', function (req, res) {
  req.session.data.DETAILS = true

  var backUrl = 'check-details-back'
  var nextUrl = 'consent'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

router.get('/check-details-back', function (req, res) {
  req.session.data.DETAILS = false
  res.redirect('applicant-details')
})

router.get('/agent-farmer-details', function (req, res) {
  var nextUrl = 'check-details'
  var backUrl = 'your-details'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

// consent

router.get('/consent', function (req, res) {
  var nextUrl = 'reference-number'
  var backUrl = 'check-details'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

// reference-number

router.get('/reference-number', function (req, res) {
  var backUrl = 'consent'

  res.render('./' + req.originalUrl, {
    backUrl
  })
})

router.get('/survey', function (req, res) {
  res.render('./' + req.originalUrl, {})
})

router.get('/email', function (req, res) {
  res.render('./' + req.originalUrl, {})
})

module.exports = router

// JOURNEY FINISHING
// ***************
// ***************
// ***************
// ***************
