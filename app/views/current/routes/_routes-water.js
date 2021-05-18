const express = require('express')
const router = express.Router()

const serviceName = 'Apply for a large grant for a water resource management project'

// console.log( 'This is the _routes file' );
console.log('Service name: ' + serviceName)

// Add your routes here - above the module.exports line

//* ****************************************************
// WATER START PAGE //
router.get('*/water/start', function (req, res) {
  // console.log( 'This is the start page' );

  // Cannot start yet = 'govuk-tag--grey'
  // Not started = 'govuk-tag--grey'
  // In progress = 'govuk-tag--blue'
  // Completed = ''

  // We only count the sections (weird part of the pattern tbh nicprice comment)

  // Part 1: Check if you can apply

  // Section 1: Check now
  req.session.data.water_s01_status = 'Not started'
  req.session.data.water_s01_status_class = 'govuk-tag--grey'

  // Part 2: Express interest

  // Section 2: Provide project details and benefits
  req.session.data.water_s02_status = 'Cannot start yet'
  req.session.data.water_s02_status_class = 'govuk-tag--grey'

  // Section 3 = 'Give contact details'
  req.session.data.water_s03_status = 'Cannot start yet'
  req.session.data.water_s03_status_class = 'govuk-tag--grey'

  // Section 4 = 'Full application'
  req.session.data.water_s04_status = 'Cannot start yet'
  req.session.data.water_s04_status_class = 'govuk-tag--grey'

  // ------------------------------------------
  req.session.data.COMPLETED = false
  // ------------------------------------------

  res.render('./' + req.originalUrl, {
  })
})

// START PAGE END //

router.get('*/water/task-list-prefilled', function (req, res) {
  req.session.data.water_s01_status = 'Completed'
  req.session.data.water__s01_status_class = ''

  req.session.data.water_s02_status = 'Not started'
  req.session.data.water_s02_status_class = 'govuk-tag--grey'

  req.session.data.water_s03_status = 'Cannot start yet'
  req.session.data.water_s03_status_class = 'govuk-tag--grey'

  req.session.data.water_s04_status = 'Cannot start yet'
  req.session.data.water_s04_status_class = 'govuk-tag--grey'

  res.redirect('./task-list')
})

//* ****************************************************
// TASK LIST PAGE START //
router.get('*/water/task-list', function (req, res) {
  // console.log( 'This is the task list' );

  // Cannot start yet = 'govuk-tag--grey'
  // Not started = 'govuk-tag--grey'
  // In progress = 'govuk-tag--blue'
  // Completed = ''

  var backUrl = res.locals.prevURL

  if (req.session.data.water_s01_status != 'Completed') {
    // Part 1: Check if you can apply
    // Section 1: Check now
    req.session.data.water_s01_status = 'Not started'
    req.session.data.water_s01_status_class = 'govuk-tag--grey'

    // Part 2: Express interest
    // Section 2: Provide project details and benefits
    req.session.data.water_s02_status = 'Cannot start yet'
    req.session.data.water_s02_status_class = 'govuk-tag--grey'

    // Section 3 = 'Give contact details'
    req.session.data.water_s03_status = 'Cannot start yet'
    req.session.data.water_s03_status_class = 'govuk-tag--grey'

    // Part 3: Apply in full
    // Section 4: Complete the full application
    req.session.data.water_s04_status = 'Cannot start yet'
    req.session.data.water_s04_status_class = 'govuk-tag--grey'
  }

  var water_application_status
  var water_completed_sections

  switch (req.session.data.water_completed_sections) {
    case '0':
      water_application_status = 'Expression of interest not started'
      water_completed_sections = 'You have completed 0 of 3 sections.'
      break
    case '1':
      water_application_status = 'Expression of interest in progress'
      water_completed_sections = 'You have completed 1 of 3 sections.'
      break
    case '2':
      water_application_status = 'Expression of interest in progress'
      water_completed_sections = 'You have completed 2 of 3 sections.'
      break
    case '3':
      water_application_status = 'Expression of interest in progress'
      water_completed_sections = 'You have completed 3 of 3 sections.'
      break
  }

  var water_s01_status = req.session.data.water_s01_status
  var water_s01_status_class = req.session.data.water_s01_status_class

  // Part 2: Express interest

  // Section 2: Provide project details and benefits
  var water_s02_status = req.session.data.water_s02_status
  var water_s02_status_class = req.session.data.water_s02_status_class

  // Section 3 = 'Give contact details'
  var water_s03_status = req.session.data.water_s03_status
  var water_s03_status_class = req.session.data.water_s03_status_class

  // Part 3: Apply in full

  // Section 4: Complete the full application
  var water_s04_status = req.session.data.water_s04_status
  var water_s04_status_class = req.session.data.water_s04_status_class

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    water_application_status: water_application_status,
    water_completed_sections: water_completed_sections,
    water_s01_status: water_s01_status,
    water_s01_status_class: water_s01_status_class,
    water_s02_status: water_s02_status,
    water_s02_status_class: water_s02_status_class,
    water_s03_status: water_s03_status,
    water_s03_status_class: water_s03_status_class,
    water_s04_status: water_s04_status,
    water_s04_status_class: water_s04_status_class
  })
})

// TASK LIST PAGE END //

// SECTION 1

// Q: FARMING TYPE

router.get('*/water/farming-type', function (req, res) {
  var backUrl = 'start'
  var nextUrl = '../water/farming-type-answer'
  var completedUrl = 'farming-type-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.get('*/water/farming-type-answer', function (req, res) {
  var farmingType = req.session.data['farming-type']
  var farmingTypeOther = req.session.data['farming-type-other-options']

  if (!!farmingType && farmingType === 'Something else') {
    res.redirect('../water/farming-type-fail')
  }
  if (!!farmingType && farmingType === 'no' && !!farmingTypeOther) {
    if (farmingTypeOther === 'something else') {
      res.redirect('../water/farming-type-fail')
    } else {
      farmingType = 'no: [' + farmingTypeOther + ']'
    }
  }

  req.session.data['summary-farming-type'] = farmingType
  res.redirect('../water/legal-status')
})

router.get('*/water/farming-type-answer-completed', function (req, res) {
  var farmingType = req.session.data['farming-type']
  var farmingTypeOther = req.session.data['farming-type-other-options']

  if (!!farmingType && farmingType === 'Something else') {
    res.redirect('../water/farming-type-fail')
  }

  if (!!farmingType && farmingType === 'no' && !!farmingTypeOther) {
    if (farmingTypeOther === 'something else') {
      res.redirect('../water/farming-type-fail')
    } else {
      farmingType = 'no: [' + farmingTypeOther + ']'
    }
  }

  req.session.data['summary-farming-type'] = farmingType
  res.redirect('../water/answers')
})

// Q: LEGAL STATUS

router.get('*/water/legal-status', function (req, res) {
  var backUrl = 'farming-type'
  var nextUrl = '../water/legal-status-answer'
  var completedUrl = 'legal-status-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.post('*/water/legal-status-answer', function (req, res) {
  var legalStatus = req.session.data['legal-status']

  if (legalStatus === 'None') { res.redirect('../water/legal-status-fail') } else { res.redirect('../water/country') }
})

router.post('*/water/legal-status-answer-completed', function (req, res) {
  var legalStatus = req.session.data['legal-status']

  if (legalStatus === 'None') { res.redirect('../water/legal-status-fail') } else { res.redirect('../water/answers') }
})

// Q : Country

router.get('*/water/country', function (req, res) {
  var backUrl = 'legal-status'
  var nextUrl = '../water/country-answer'
  var completedUrl = 'country-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.post('*/water/country-answer', function (req, res) {
  var country = req.session.data.country
  var postcode = req.session.data.postcode

  if (!!country && country === 'yes') {
    if (!!postcode && postcode.length > 0) {
      country = 'yes: [ Postcode: ' + postcode + ' ]'
    }

    req.session.data['summary-country'] = country
    res.redirect('../water/project-start')
  } else {
    res.redirect('../water/country-fail')
  }
})

router.post('*/water/country-answer-completed', function (req, res) {
  var country = req.session.data.country
  var postcode = req.session.data.postcode

  if (!!country && country === 'yes') {
    if (!!postcode && postcode.length > 0) {
      country = 'yes: [ Postcode: ' + postcode + ' ]'
    }

    req.session.data['summary-country'] = country
    res.redirect('../water/answers')
  } else {
    res.redirect('../water/country-fail')
  }
})

// PROJECT START

router.get('*/water/project-start', function (req, res) {
  var backUrl = 'country'
  var nextUrl = '../water/project-start-answer'
  var completedUrl = 'project-start-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.post('*/water/project-start-answer', function (req, res) {
  var projectStart = req.session.data['project-start']

  if (projectStart === 'yes') { res.redirect('../water/project-start-fail') } else { res.redirect('../water/tenancy') }
})

router.post('*/water/project-start-answer-completed', function (req, res) {
  var projectStart = req.session.data['project-start']

  if (projectStart === 'yes') { res.redirect('../water/project-start-fail') } else { res.redirect('../water/answers') }
})

// Q: Tenancy
router.get('*/water/tenancy', function (req, res) {
  var backUrl = 'project-start'
  var nextUrl = '../water/tenancy-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.post('*/water/tenancy-answer', function (req, res) {
  var tenant = req.session.data.tenancy

  if (tenant === 'Yes') {
    res.redirect('../water/project-items')
  } else { res.redirect('../water/tenancy-length') }
})

router.post('*/water/tenancy-length-answer', function (req, res) {
  var tenancyLength = req.session.data['tenancy-length']

  if (tenancyLength === 'No') { res.redirect('../water/tenancy-length-condition') } else { res.redirect('../water/project-items') }
})

router.post('*/water/tenancy-length-answer-completed', function (req, res) {
  res.redirect('../water/answers')
})

router.get('*/water/project-items', function (req, res) {
  var backUrl = 'tenancy-length'
  var nextUrl = '../water/project-cost'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.get('*/water/project-cost', function (req, res) {
  req.session.data.currentProjectCost = req.session.data['project-cost']

  var backUrl = 'project-items'
  var nextUrl = '../water/project-cost-answer'
  var completedUrl = 'project-cost-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.post('*/water/project-cost-answer', function (req, res) {
  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500) { res.redirect('../water/project-cost-fail') } else { res.redirect('../water/grant') }
})

router.post('*/water/project-cost-answer-completed', function (req, res) {
  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500) { res.redirect('../water/project-cost-fail') } else { res.redirect('answers') }
})

router.get('*/water/grant', function (req, res) {
  var backUrl = 'project-cost'
  var nextUrl = 'remaining-costs'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

// Q: remaining costs
router.get('*/water/remaining-costs', function (req, res) {
  var backUrl = 'grant'
  var nextUrl = '../water/remaining-costs-answer'
  var completedUrl = 'remaining-costs-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.post('*/water/remaining-costs-answer', function (req, res) {
  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts === 'no') { res.redirect('../water/remaining-costs-fail') } else { res.redirect('../water/planning-permission') }
})

router.post('*/water/remaining-costs-answer-completed', function (req, res) {
  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts === 'no') { res.redirect('../water/remaining-costs-fail') } else { res.redirect('../water/answers') }
})

// PLANNING PERMISSION

router.get('*/water/planning-permission', function (req, res) {
  var backUrl = 'remaining-costs'
  var nextUrl = 'abstraction-licence'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

// ABSTRACTION LICENCE

router.get('*/water/abstraction-licence', function (req, res) {
  var backUrl = 'planning-permission'
  var nextUrl = 'water-SSSI'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

// Water SSSI
router.get('*/water/water-SSSI', function (req, res) {
  var backUrl = 'abstraction-licence'
  var nextUrl = 'project-summary'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

// project-summary

router.get('*/water/project-summary', function (req, res) {
  var backUrl = 'water-SSSI'
  var nextUrl = '../water/irrigated-crops'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

// irrigated-crops

router.get('*/water/irrigated-crops', function (req, res) {
  var backUrl = 'project-summary'
  var nextUrl = '../water/irrigated-land'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

// irrigated-land

router.get('*/water/irrigated-land', function (req, res) {
  var backUrl = 'irrigated-crops'
  var nextUrl = '../water/irrigation-water-source'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

// irrigation-water-source

router.get('*/water/irrigation-water-source', function (req, res) {
  req.session.data.tempIrrigationAnswer = req.session.data.irrigationAnswer
  var backUrl = 'irrigated-land'
  var nextUrl = 'irrigation-water-source-answer'
  var completedUrl = 'irrigation-water-source-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.post('*/water/irrigation-water-source-answer', function (req, res) {
  res.redirect('../water/irrigation-systems')
})

router.post('*/water/irrigation-water-source-answer-completed', function (req, res) {
  res.redirect('answers')
})

// irrigation-systems

router.get('*/water/irrigation-systems', function (req, res) {
  var backUrl = 'irrigation-water-source'
  var nextUrl = '../water/productivity'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

// productivity

router.get('*/water/productivity', function (req, res) {
  var backUrl = 'irrigation-systems'
  var nextUrl = 'collaboration'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

// collaboration

router.get('*/water/collaboration', function (req, res) {
  var backUrl = 'productivity'
  var nextUrl = 'answers'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})
// answers

router.get('*/water/answers', function (req, res) {
  req.session.data.COMPLETED = true

  var backUrl = 'collaboration'
  var nextUrl = 'next-steps'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

// next-steps

router.get('*/water/next-steps', function (req, res) {
  var backUrl = 'answers'
  var nextUrl = 'business'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

// business
router.get('*/water/business', function (req, res) {
  if (req.session.data.water_s03_status !== 'Completed') {
    req.session.data.water_s03_status = 'In progress'
    req.session.data.water_s03_status_class = 'govuk-tag--blue'
  }

  var nextUrl = 'applying'
  var backUrl = 'next-steps'
  var completedUrl = 'check-details'

  // if (req.session.data.water_s03_status === 'Completed') {
  // backUrl = "../water/check-answers-contact-details"
  // }

  res.render('./' + req.originalUrl, {
    nextUrl: nextUrl,
    backUrl: backUrl,
    completedUrl: completedUrl
  })
})

// applying

router.post('*/water/applying-answer', function (req, res) {
  res.redirect('../water/your-details')
})

router.get('*/water/your-details', function (req, res) {
  var nextUrl = 'check-details'
  var backUrl = 'applying-answer'
  var completedUrl = 'check-details'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

// check-details

router.get('*/water/check-details', function (req, res) {
  // req.session.data.COMPLETED = true
  var nextUrl = 'consent'
  var backUrl = 'your-details'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

// consent

router.get('*/water/consent', function (req, res) {
  var nextUrl = 'reference-number'
  var backUrl = 'check-details'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})
// reference-number

router.get('*/water/reference-number', function (req, res) {
  var backUrl = 'consent'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl
  })
})

router.get('*/water/survey', function (req, res) {
  req.session.data.water_completed_sections = '3'

  req.session.data.water_s03_status = 'Completed'
  req.session.data.water_s03_status_class = ''

  res.render('./' + req.originalUrl, {
    // backUrl: res.locals.prevURL
  })
})

router.get('*/water/email', function (req, res) {
  res.render('./' + req.originalUrl, {
    // backUrl: res.locals.prevURL
  })
})

module.exports = router
