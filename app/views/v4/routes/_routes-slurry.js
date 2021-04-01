const express = require('express')
const router = express.Router()

const serviceName = 'Apply for a large grant for a slurry resource management project'

// console.log( 'This is the _routes file' );
console.log('Service name: ' + serviceName)

// Add your routes here - above the module.exports line

//* ****************************************************
// slurry START PAGE //
router.get('*/slurry/start', function (req, res) {
  // console.log( 'This is the start page' );

  // Cannot start yet = 'govuk-tag--grey'
  // Not started = 'govuk-tag--grey'
  // In progress = 'govuk-tag--blue'
  // Completed = ''

  // We only count the sections (weird part of the pattern tbh nicprice comment)

  // Part 1: Check if you can apply

  // Section 1: Check now
  req.session.data.slurry_s01_status = 'Not started'
  req.session.data.slurry_s01_status_class = 'govuk-tag--grey'

  // Part 2: Express interest

  // Section 2: Provide project details and benefits
  req.session.data.slurry_s02_status = 'Cannot start yet'
  req.session.data.slurry_s02_status_class = 'govuk-tag--grey'

  // Section 3 = 'Give contact details'
  req.session.data.slurry_s03_status = 'Cannot start yet'
  req.session.data.slurry_s03_status_class = 'govuk-tag--grey'

  // Section 4 = 'Full application'
  req.session.data.slurry_s04_status = 'Cannot start yet'
  req.session.data.slurry_s04_status_class = 'govuk-tag--grey'

  res.render('./' + req.originalUrl, {
  })
})

// START PAGE END //

router.get('*/slurry/task-list-prefilled', function (req, res) {
  req.session.data.slurry_s01_status = 'Completed'
  req.session.data.slurry_s01_status_class = ''

  req.session.data.slurry_s02_status = 'Not started'
  req.session.data.slurry_s02_status_class = 'govuk-tag--grey'

  req.session.data.slurry_s03_status = 'Cannot start yet'
  req.session.data.slurry_s03_status_class = 'govuk-tag--grey'

  req.session.data.slurry_s04_status = 'Cannot start yet'
  req.session.data.slurry_s04_status_class = 'govuk-tag--grey'

  res.redirect('./task-list')
})

//* ****************************************************
// TASK LIST PAGE START //
router.get('*/slurry/task-list', function (req, res) {
  // console.log( 'This is the task list' );

  // Cannot start yet = 'govuk-tag--grey'
  // Not started = 'govuk-tag--grey'
  // In progress = 'govuk-tag--blue'
  // Completed = ''

  var backUrl = res.locals.prevURL

  if (req.session.data.slurry_s01_status !== 'Completed') {
    // Part 1: Check if you can apply
    // Section 1: Check now
    req.session.data.slurry_s01_status = 'Not started'
    req.session.data.slurry_s01_status_class = 'govuk-tag--grey'

    // Part 2: Express interest
    // Section 2: Provide project details and benefits
    req.session.data.slurry_s02_status = 'Cannot start yet'
    req.session.data.slurry_s02_status_class = 'govuk-tag--grey'

    // Section 3 = 'Give contact details'
    req.session.data.slurry_s03_status = 'Cannot start yet'
    req.session.data.slurry_s03_status_class = 'govuk-tag--grey'

    // Part 3: Apply in full
    // Section 4: Complete the full application
    req.session.data.slurry_s04_status = 'Cannot start yet'
    req.session.data.slurry_s04_status_class = 'govuk-tag--grey'
  }

  var slurry_application_status
  var slurry_completed_sections

  switch (req.session.data.slurry_completed_sections) {
    case '0':
      slurry_application_status = 'Expression of interest not started'
      slurry_completed_sections = 'You have completed 0 of 3 sections.'
      break
    case '1':
      slurry_application_status = 'Expression of interest in progress'
      slurry_completed_sections = 'You have completed 1 of 3 sections.'
      break
    case '2':
      slurry_application_status = 'Expression of interest in progress'
      slurry_completed_sections = 'You have completed 2 of 3 sections.'
      break
    case '3':
      slurry_application_status = 'Expression of interest in progress'
      slurry_completed_sections = 'You have completed 3 of 3 sections.'
      break
  }

  var slurry_s01_status = req.session.data.slurry_s01_status
  var slurry_s01_status_class = req.session.data.slurry_s01_status_class

  // Part 2: Express interest

  // Section 2: Provide project details and benefits
  var slurry_s02_status = req.session.data.slurry_s02_status
  var slurry_s02_status_class = req.session.data.slurry_s02_status_class

  // Section 3 = 'Give contact details'
  var slurry_s03_status = req.session.data.slurry_s03_status
  var slurry_s03_status_class = req.session.data.slurry_s03_status_class

  // Part 3: Apply in full

  // Section 4: Complete the full application
  var slurry_s04_status = req.session.data.slurry_s04_status
  var slurry_s04_status_class = req.session.data.slurry_s04_status_class

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    slurry_application_status: slurry_application_status,
    slurry_completed_sections: slurry_completed_sections,
    slurry_s01_status: slurry_s01_status,
    slurry_s01_status_class: slurry_s01_status_class,
    slurry_s02_status: slurry_s02_status,
    slurry_s02_status_class: slurry_s02_status_class,
    slurry_s03_status: slurry_s03_status,
    slurry_s03_status_class: slurry_s03_status_class,
    slurry_s04_status: slurry_s04_status,
    slurry_s04_status_class: slurry_s04_status_class
  })
})

// TASK LIST PAGE END //

// SECTION 1

// Q: FARMING TYPE

router.get('*/slurry/farming-type', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = '../slurry/farming-type-answer'

  // test to check this section isn't completed...

  if (req.session.data.slurry_s01_status === 'Completed') {
    backUrl = '../check-answers-check-you-can-apply'
  } else {
    req.session.data.slurry_s01_status = 'In progress'
    req.session.data.slurry_s01_status_class = 'govuk-tag--blue'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.get('*/slurry/farming-type-answer', function (req, res) {
  var farmingType = req.session.data['farming-type']

  if (farmingType === 'no') { res.redirect('../slurry/farming-type-fail') } else {
    if (req.session.data.slurry_s01_status === 'Completed') {
      res.redirect('../slurry/check-answers-check-you-can-apply')
    } else {
      res.redirect('../slurry/legal-status')
    }
  }
})

// Q: LEGAL STATUS

router.get('*/slurry/legal-status', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = '../slurry/legal-status-answer'

  if (req.session.data.slurry_s01_status === 'Completed') {
    backUrl = 'check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/slurry/legal-status-answer', function (req, res) {
  var legalStatus = req.session.data['legal-status']

  if (legalStatus === 'none') { res.redirect('../slurry/legal-status-fail') } else {
    if (req.session.data.slurry_s01_status === 'Completed') {
      res.redirect('../slurry/check-answers-check-you-can-apply')
    } else {
      res.redirect('../slurry/country')
    }
  }
})

router.get('*/slurry/country', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = '../slurry/country-answer'

  if (req.session.data.slurry_s01_status === 'Completed') {
    backUrl = '../slurry/check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/slurry/country-answer', function (req, res) {
  var country = req.session.data.country

  if (country === 'yes') {
    if (req.session.data.slurry_s01_status === 'Completed') {
      res.redirect('../slurry/check-answers-check-you-can-apply')
    } else {
      res.redirect('../slurry/project-items')
    }
  } else { res.redirect('../slurry/country-fail') }
})

router.get('*/slurry/tenancy', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = '../slurry/tenancy-answer'

  if (req.session.data.slurry_s01_status === 'Completed') {
    backUrl = '../slurry/check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/slurry/tenancy-answer', function (req, res) {
  var tenant = req.session.data.tenancy

  if (tenant === 'yes') {
    if (req.session.data.slurry_s01_status === 'Completed') {
      res.redirect('../slurry/check-answers-check-you-can-apply')
    } else {
      res.redirect('../slurry/project-start')
    }
  } else { res.redirect('../slurry/tenancy-length') }
})

router.post('*/slurry/tenancy-length-answer', function (req, res) {
  var tenancyLength = req.session.data['tenancy-length']

  if (tenancyLength === 'no') { res.redirect('../slurry/tenancy-length-condition') } else {
    if (req.session.data.slurry_s01_status === 'Completed') {
      res.redirect('../slurry/check-answers-check-you-can-apply')
    } else {
      res.redirect('../slurry/project-start')
    }
  }
})

router.get('*/slurry/project-items', function (req, res) {
  var projectItems = req.session.data['project-items']
  var backUrl = res.locals.prevURL
  var nextUrl = '../slurry/project-cost'

  if (req.session.data.slurry_s01_status === 'Completed') {
    backUrl = '../slurry/check-answers-check-you-can-apply'
    nextUrl = backUrl
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.get('*/slurry/project-cost', function (req, res) {
  req.session.data.currentProjectCost = req.session.data['project-cost']

  console.log(req.session.data.currentProjectCost)

  var backUrl = res.locals.prevURL
  var nextUrl = '../slurry/project-cost-answer'

  if (req.session.data.slurry_s01_status === 'Completed') {
    backUrl = '../slurry/check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/slurry/project-cost-answer', function (req, res) {
  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500) { res.redirect('../slurry/project-cost-fail') } else {
    if (req.session.data.slurry_s01_status === 'Completed') {
      if (projectCost === req.session.data.currentProjectCost) {
        res.redirect('../slurry/check-answers-check-you-can-apply')
      } else {
        res.redirect('../slurry/grant')
      }
    } else {
      res.redirect('../slurry/grant')
    }
  }
})

router.get('*/slurry/grant', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'remaining-costs'

  if (req.session.data.slurry_s01_status === 'Completed') {
    backUrl = '../slurry/check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.get('*/slurry/remaining-costs', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = '../slurry/remaining-costs-answer'

  if (req.session.data.slurry_s01_status === 'Completed') {
    backUrl = '../slurry/check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/slurry/remaining-costs-answer', function (req, res) {
  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts === 'no') { res.redirect('../slurry/remaining-costs-fail') } else {
    if (req.session.data.slurry_s01_status === 'Completed') {
      res.redirect('../slurry/check-answers-check-you-can-apply')
    } else {
      res.redirect('../slurry/public-money')
    }
  }
})

// PUBLIC MONEY

router.get('*/slurry/public-money', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = '../slurry/public-money-answer'

  if (req.session.data.slurry_s01_status === 'Completed') {
    backUrl = '../slurry/check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/slurry/public-money-answer', function (req, res) {
  var publicMoney = req.session.data['public-money']
  var projectItems = req.session.data['project-items']

  if (publicMoney === 'yes') { res.redirect('../slurry/public-money-fail') } else {
    if (req.session.data.slurry_s01_status === 'Completed') {
      res.redirect('../slurry/check-answers-check-you-can-apply')
    } else {
      if (projectItems === undefined) { res.redirect('../slurry/project-start') }
      if (projectItems.includes('storage bags') === true) { res.redirect('../slurry/tenancy') }
      if (projectItems.includes('slurry separation systems') === true) { res.redirect('../slurry/tenancy') }
      if (projectItems.includes('mild acidification equipment') === true) { res.redirect('../slurry/tenancy') } else {
        res.redirect('../slurry/project-start')
      }
    }
  }
})

// PROJECT START

router.get('*/slurry/project-start', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = '../slurry/project-start-answer'

  if (req.session.data.slurry_s01_status === 'Completed') {
    backUrl = '../slurry/check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/slurry/project-start-answer', function (req, res) {
  var projectStart = req.session.data['project-start']

  if (projectStart === 'yes') { res.redirect('../slurry/project-start-fail') } else {
    if (req.session.data.slurry_s01_status === 'Completed') {
      res.redirect('../slurry/check-answers-check-you-can-apply')
    } else {
      res.redirect('../slurry/planning-required')
    }
  }
})

// PLANNING PERMISSION

router.get('*/slurry/planning-required', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = '../slurry/planning-required-answer'

  if (req.session.data.slurry_s01_status === 'Completed') {
    backUrl = '../slurry/check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/slurry/planning-required-answer', function (req, res) {
  var planningRequired = req.session.data['planning-required']

  if (planningRequired === 'yes') { res.redirect('../slurry/planning-permission') }
  if (planningRequired === 'not sure') { res.redirect('../slurry/planning-required-condition') } else {
    if (req.session.data.slurry_s01_status === 'Completed') {
      res.redirect('../slurry/check-answers-check-you-can-apply')
    } else {
      res.redirect('../slurry/check-answers-check-you-can-apply')
    }
  }
})

router.get('*/slurry/planning-required-condition', function (req, res) {
  var nextUrl = '../slurry/check-answers-check-you-can-apply'

  if (req.session.data.slurry_s01_status === 'Completed') {
    nextUrl = '../slurry/check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    nextUrl: nextUrl
  })
})

router.get('*/slurry/planning-permission', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = '../slurry/planning-permission-answer'

  if (req.session.data.slurry_s01_status === 'Completed') {
    backUrl = '../slurry/check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/slurry/planning-permission-answer', function (req, res) {
  var planningPermission = req.session.data['planning-permission']

  if (planningPermission === 'yes') { res.redirect('../slurry/check-answers-check-you-can-apply') } else { res.redirect('../slurry/planning-progress') }
})

router.get('*/slurry/planning-progress', function (req, res) {
  var backUrl = '../slurry/planning-permission'
  var nextUrl = '../slurry/planning-progress-answer'

  if (req.session.data.slurry_s01_status === 'Completed') {
    backUrl = '../slurry/check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/slurry/planning-progress-answer', function (req, res) {
  var planningProgress = req.session.data['planning-progress']

  if (planningProgress === 'yes') { res.redirect('../slurry/check-answers-check-you-can-apply') }
  if (planningProgress === 'not sure') { res.redirect('../slurry/planning-progress-condition') } else { res.redirect('../slurry/planning-permission-fail') }
})

router.get('*/slurry/check-answers-check-you-can-apply', function (req, res) {
  var backUrl = res.locals.prevURL

  req.session.data.slurry_completed_sections = '1'

  req.session.data.slurry_s01_status = 'Completed'
  req.session.data.slurry_s01_status_class = ''

  if (req.session.data.slurry_s02_status !== 'Completed') {
    req.session.data.slurry_s02_status = 'Not started'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl
  })
})

// slurry SECTION 2

router.get('*/slurry/check-answers-project-details-and-benefits', function (req, res) {
  req.session.data.slurry_completed_sections = '2'

  req.session.data.slurry_s02_status = 'Completed'
  req.session.data.slurry_s02_status_class = ''

  if (req.session.data.slurry_s03_status !== 'Completed') {
    req.session.data.slurry_s03_status = 'Not started'
  }

  res.render('./' + req.originalUrl, {

    backUrl: res.locals.prevURL

  })
})

router.get('*/slurry/project', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = '../slurry/new-slurry'

  if (req.session.data.slurry_s02_status === 'Completed') {
    nextUrl = '../slurry/check-answers-project-details-and-benefits'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.get('*/slurry/new-slurry', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'collaboration'

  if (req.session.data.slurry_s02_status === 'Completed') {
    backUrl = '../slurry/check-answers-project-details-and-benefits'
    nextUrl = backUrl
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.get('*/slurry/collaboration', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'productivity'

  if (req.session.data.slurry_s02_status === 'Completed') {
    backUrl = '../slurry/check-answers-project-details-and-benefits'
    nextUrl = backUrl
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.get('*/slurry/productivity', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'environment'

  if (req.session.data.slurry_s02_status === 'Completed') {
    backUrl = '../slurry/check-answers-project-details-and-benefits'
    nextUrl = backUrl
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.get('*/slurry/environment', function (req, res) {
  var backUrl = res.locals.prevURL

  if (req.session.data.slurry_s02_status === 'Completed') {
    backUrl = '../slurry/check-answers-project-details-and-benefits'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl
  })
})

// slurry SECTION 3

router.get('*/slurry/check-answers-contact-details', function (req, res) {
  req.session.data.slurry_completed_sections = '3'

  req.session.data.slurry_s03_status = 'Completed'
  req.session.data.slurry_s03_status_class = ''

  res.render('./' + req.originalUrl, {
    backUrl: res.locals.prevURL
  })
})

router.get('*/slurry/business', function (req, res) {
  if (req.session.data.slurry_s03_status !== 'Completed') {
    req.session.data.slurry_s03_status = 'In progress'
    req.session.data.slurry_s03_status_class = 'govuk-tag--blue'
  }

  var backUrl = res.locals.prevURL
  var nextUrl = '../slurry/business-answer'

  if (req.session.data.slurry_s03_status === 'Completed') {
    backUrl = '../slurry/check-answers-contact-details'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/slurry/business-answer', function (req, res) {
  var businessAnswer = req.session.data['new-business']

  if (businessAnswer === 'no') { res.redirect('../slurry/new-business-condition') } else { res.redirect('../slurry/applying') }
})

router.post('*/slurry/applying-answer', function (req, res) {
  var applyingAnswer = req.session.data.applying

  if (applyingAnswer === 'other') { res.redirect('../slurry/preferred-contact') } else { res.redirect('../slurry/your-details') }
})

router.get('*/slurry/your-details', function (req, res) {
  var backUrl

  if (req.session.data.applying === 'own') {
    backUrl = 'applying'
  } else {
    backUrl = 'preferred-contact'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl
  })
})

router.post('*/slurry/your-details-answer', function (req, res) {
  var applyingAnswer = req.session.data.applying

  if (applyingAnswer === 'other') { res.redirect('../slurry/applicant-details') } else { res.redirect('../slurry/check-answers-contact-details') }
})

router.post('*/slurry/preferred-contact-answer', function (req, res) {
  var preferredContact = req.session.data['preferred-contact']

  if (preferredContact === 'just the applicant') { res.redirect('../slurry/applicant-details') } else { res.redirect('../slurry/your-details') }
})

router.get('*/slurry/applicant-details', function (req, res) {
  var backUrl

  if (req.session.data['preferred-contact'] === 'just the applicant') {
    backUrl = 'preferred-contact'
  } else {
    backUrl = 'your-details'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl
  })
})

module.exports = router
