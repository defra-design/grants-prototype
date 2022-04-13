const express = require('express')
const router = express.Router()

const serviceName = 'Check if you can apply for a Farming Transformation Fund slurry acidification grant'

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

//: Q: Farmer type
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
  var farmerType = req.session.data['farmertype']
  const farmertypeItem3 = req.session.data['farmertype']

  const farmertypeItem3Condition = [
   'None of the above'
 ]

if (farmertypeItem3Condition) {
   res.redirect ('system-type')
 }
 res.redirect('system-type')
})








//: Q: System type
router.get('/system-type', function (req, res) {
  var backUrl = 'farmer-type'
  var nextUrl = 'system-type-answer'
  var completedUrl = 'system-type-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/system-type-answer', function (req, res) {
  var systemType = req.session.data['systemtype']

  if (systemType === 'no system' || systemType === 'straw-bedded system') { res.redirect('system-type-fail') }


   else { res.redirect('legal-status') }
})

router.post('/system-type-answer-completed', function (req, res) {
  var systemType = req.session.data['farmertype']

  if (systemType === 'I do not have a system') { res.redirect('system-type-fail') } else { res.redirect('answers') }
})



// Q: LEGAL STATUS

router.get('/legal-status', function (req, res) {
  var backUrl = 'system-type'
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
    res.redirect('slurry-storage')
  } else {
    res.redirect('country-fail')
  }
})

router.post('/country-answer-completed', function (req, res) {
  var country = req.session.data.country
  var postcode = req.session.data.postcode

  if (!!country && country === 'yes') {
    if (!!postcode && postcode.length > 0) {
      country = 'yes: [ Postcode: ' + postcode + ' ]'
    }

    req.session.data['summary-country'] = country
    res.redirect('answers')
  } else {
    res.redirect('country-fail')
  }
})


// Q: Slurry storage

router.get('/slurry-storage', function (req, res) {
  var backUrl = 'country'
  var nextUrl = 'slurry-storage-answer'
  var completedUrl = 'slurry-storage-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/slurry-storage-answer', function (req, res) {
  var slurryStorage = req.session.data['storage']

  if (slurryStorage === 'no') { res.redirect('slurry-storage-fail') } else { res.redirect('business') }
})

//JOURNEY FINISHING
// ***************
// ***************
// ***************
// ***************

// PLANNING PERMISSION

router.get('/planning-permission', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'country'
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

  if (planningPermission === 'Not needed' || planningPermission === 'Secured') {
    res.redirect('project-start')
  }

  if (planningPermission === 'maybe') {
    res.redirect('planning-required-condition')
  }

  res.redirect('planning-permission-fail')
})

// PLANNING PERMISSION CONDITION
router.get('/planning-required-condition', function (req, res) {
  var backUrl = 'planning-permission'
  var nextUrl = 'project-start'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})



// PROJECT START

router.get('/project-start', function (req, res) {
  var planningPermission = req.session.data['planning-permission']

  var backUrl
  var nextUrl = 'project-start-answer'
  var completedUrl = 'project-start-answer-completed'

  if (planningPermission === 'Not needed' || planningPermission === 'Secured') {
    backUrl = 'planning-permission'
  } else if (planningPermission === 'maybe') {
    backUrl = 'planning-required-condition'
  } else {
    backUrl = 'planning-permission-fail'
  }

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

// Q: Tenancy - modified 15 October 2021, containing contractor rule to skip tenancy changes and go straight to Project items.

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
    res.redirect('project-items')
  } else { res.redirect('tenancy-length') }
})

router.post('/tenancy-length-answer', function (req, res) {
  var tenancyLength = req.session.data['tenancy-length']

  if (tenancyLength === 'No') { res.redirect('tenancy-length-condition') } else { res.redirect('project-items') }
})

router.post('/tenancy-length-answer-completed', function (req, res) {
  res.redirect('answers')
})



// Q: Project items

router.get('/project-items', function (req, res) {
  var backUrl = 'tenancy'
  var nextUrl = 'storage'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// Q: Storage (new page - solving a problem around adding secondary project item - as storage faciliies)

router.get('/storage', function (req, res) {
  var backUrl = 'project-items'
  var nextUrl = 'project-cost'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})




// Q: Project cost

router.get('/project-cost', function (req, res) {
  req.session.data.currentProjectCost = req.session.data['project-cost']

  var backUrl = 'storage'
  var nextUrl = 'project-cost-answer'
  var completedUrl = 'project-cost-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/project-cost-answer', function (req, res) {
  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500)   { res.redirect('project-cost-fail') } else { res.redirect('grant') }
})

router.post('/project-cost-answer-completed', function (req, res) {
  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500)   { res.redirect('project-cost-fail') } else { res.redirect('answers') }
})


router.get('/grant', function (req, res) {
  var backUrl = 'project-cost'
  var nextUrl = 'remaining-costs'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// Q: remaining costs

router.get('/remaining-costs', function (req, res) {
  var backUrl = 'grant'
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

  if (remainingCosts === 'no') { res.redirect('remaining-costs-fail') } else { res.redirect('products-processed') }
})

router.post('/remaining-costs-answer-completed', function (req, res) {
  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts === 'no') {res.redirect('remaining-costs-fail')} else {res.redirect('answers')}
})





// Products processed
router.get('/products-processed', function (req, res) {
  var backUrl = 'remaining-costs'
  var nextUrl = 'adding-value'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// Adding value
router.get('/adding-value', function (req, res) {
  var backUrl = 'products-processed'
  var nextUrl = 'project-impact'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// Project impact
router.get('/project-impact', function (req, res) {
  var backUrl = 'adding-value'
  var nextUrl = 'future-customers'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})


// Future customers
router.get('/future-customers', function (req, res) {
  var backUrl = 'adding-value'
  var nextUrl = 'collaboration'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// Collaboration (aka. Buying from farmers - was called earlier)
router.get('/collaboration', function (req, res) {
  var backUrl = 'future-customers'
  var nextUrl = 'environmental-impact'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// Products coming from
router.get('/products-coming-from', function (req, res) {
  var backUrl = 'collaboration'
  var nextUrl = 'where-products-sold'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// Where products sold
router.get('/where-products-sold', function (req, res) {
  var backUrl = 'products-coming-from'
  var nextUrl = 'environmental-impact'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})


// Environmental impact
router.get('/environmental-impact', function (req, res) {
  var backUrl = 'collaboration'
  var nextUrl = 'answers'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
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
  res.redirect('environmental-impact')
})



// business

router.get('/business', function (req, res) {
  var backUrl = 'slurry-storage'
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
