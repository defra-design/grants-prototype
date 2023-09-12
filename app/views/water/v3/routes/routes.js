const express = require('express')
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const serviceName = 'Apply for a large grant for a water resource management project'

// console.log( 'This is the _routes file' );
console.log('Service name: ' + serviceName)

// Add your routes here - above the module.exports line

//* ****************************************************
// WATER START PAGE //
router.get('*/start', function (req, res) {
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

  res.render('./' + req.originalUrl, {
  })
})

// START PAGE END //

router.get('*/task-list-prefilled', function (req, res) {
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
router.get('*/task-list', function (req, res) {
  // console.log( 'This is the task list' );

  // Cannot start yet = 'govuk-tag--grey'
  // Not started = 'govuk-tag--grey'
  // In progress = 'govuk-tag--blue'
  // Completed = ''

  var backUrl = res.locals.prevURL

  if (req.session.data.water_s01_status !== 'Completed') {
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

router.get('*/farming-type', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'farming-type-answer'

  // test to check this section isn't completed...

  if (req.session.data.water_s01_status == 'Completed') {
    backUrl = 'check-answers-check-you-can-apply'
  } else {
    req.session.data.water_s01_status = 'In progress'
    req.session.data.water_s01_status_class = 'govuk-tag--blue'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.get('*/farming-type-answer', function (req, res) {
  var farmingType = req.session.data['farming-type']

  if (farmingType === 'no') { res.redirect('farming-type-fail') } else {
    if (req.session.data.water_s01_status === 'Completed') {
      res.redirect('check-answers-check-you-can-apply')
    } else {
      res.redirect('legal-status')
    }
  }
})

// Q: LEGAL STATUS

router.get('*/legal-status', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'legal-status-answer'

  if (req.session.data.water_s01_status === 'Completed') {
    backUrl = 'check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/legal-status-answer', function (req, res) {
  var legalStatus = req.session.data['legal-status']

  if (legalStatus === 'none') { res.redirect('legal-status-fail') } else {
    if (req.session.data.water_s01_status === 'Completed') {
      res.redirect('check-answers-check-you-can-apply')
    } else {
      res.redirect('country')
    }
  }
})

router.get('*/country', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'country-answer'

  if (req.session.data.water_s01_status === 'Completed') {
    backUrl = 'check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/country-answer', function (req, res) {
  var country = req.session.data.country

  if (country === 'yes') {
    if (req.session.data.water_s01_status === 'Completed') {
      res.redirect('check-answers-check-you-can-apply')
    } else {
      res.redirect('tenancy')
    }
  } else { res.redirect('country-fail') }
})

router.get('*/tenancy', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'tenancy-answer'

  if (req.session.data.water_s01_status === 'Completed') {
    backUrl = 'check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/tenancy-answer', function (req, res) {
  var tenant = req.session.data.tenancy

  if (tenant === 'yes') {
    if (req.session.data.water_s01_status === 'Completed') {
      res.redirect('check-answers-check-you-can-apply')
    } else {
      res.redirect('project-items')
    }
  } else { res.redirect('tenancy-length') }
})

router.post('*/tenancy-length-answer', function (req, res) {
  var tenancyLength = req.session.data['tenancy-length']

  if (tenancyLength === 'no') { res.redirect('tenancy-length-condition') } else {
    if (req.session.data.water_s01_status === 'Completed') {
      res.redirect('check-answers-check-you-can-apply')
    } else {
      res.redirect('project-items')
    }
  }
})

router.get('*/project-items', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'project-cost'

  if (req.session.data.water_s01_status === 'Completed') {
    backUrl = 'check-answers-check-you-can-apply'
    nextUrl = backUrl
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.get('*/project-cost', function (req, res) {
  req.session.data.currentProjectCost = req.session.data['project-cost']

  console.log(req.session.data.currentProjectCost)

  var backUrl = res.locals.prevURL
  var nextUrl = 'project-cost-answer'

  if (req.session.data.water_s01_status === 'Completed') {
    backUrl = 'check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/project-cost-answer', function (req, res) {
  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500) { res.redirect('project-cost-fail') } else {
    if (req.session.data.water_s01_status === 'Completed') {
      if (projectCost === req.session.data.currentProjectCost) {
        res.redirect('check-answers-check-you-can-apply')
      } else {
        res.redirect('grant')
      }
    } else {
      res.redirect('grant')
    }
  }
})

router.get('*/grant', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'remaining-costs'

  if (req.session.data.water_s01_status === 'Completed') {
    backUrl = 'check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.get('*/remaining-costs', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'remaining-costs-answer'

  if (req.session.data.water_s01_status === 'Completed') {
    backUrl = 'check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/remaining-costs-answer', function (req, res) {
  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts === 'no') { res.redirect('remaining-costs-fail') } else {
    if (req.session.data.water_s01_status === 'Completed') {
      res.redirect('check-answers-check-you-can-apply')
    } else {
      res.redirect('public-money')
    }
  }
})

// PUBLIC MONEY

router.get('*/public-money', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'public-money-answer'

  if (req.session.data.water_s01_status === 'Completed') {
    backUrl = 'check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/public-money-answer', function (req, res) {
  var publicMoney = req.session.data['public-money']

  if (publicMoney === 'yes') { res.redirect('public-money-fail') } else {
    if (req.session.data.water_s01_status === 'Completed') {
      res.redirect('check-answers-check-you-can-apply')
    } else {
      res.redirect('project-start')
    }
  }
})

// PROJECT START

router.get('*/project-start', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'project-start-answer'

  if (req.session.data.water_s01_status === 'Completed') {
    backUrl = 'check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/project-start-answer', function (req, res) {
  var projectStart = req.session.data['project-start']

  if (projectStart === 'yes') { res.redirect('project-start-fail') } else {
    if (req.session.data.water_s01_status === 'Completed') {
      res.redirect('check-answers-check-you-can-apply')
    } else {
      res.redirect('planning-required')
    }
  }
})

// PLANNING PERMISSION

router.get('*/planning-required', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'planning-required-answer'

  if (req.session.data.water_s01_status === 'Completed') {
    backUrl = 'check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/planning-required-answer', function (req, res) {
  var planningRequired = req.session.data['planning-required']

  if (planningRequired === 'yes') { res.redirect('planning-permission') }
  if (planningRequired === 'not sure') { res.redirect('planning-required-condition') } else {
    if (req.session.data.water_s01_status === 'Completed') {
      res.redirect('check-answers-check-you-can-apply')
    } else {
      res.redirect('abstraction-required')
    }
  }
})

router.get('*/planning-required-condition', function (req, res) {
  var nextUrl = 'abstraction-required'

  if (req.session.data.water_s01_status === 'Completed') {
    nextUrl = 'check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    nextUrl: nextUrl
  })
})

router.get('*/planning-permission', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'planning-permission-answer'

  if (req.session.data.water_s01_status === 'Completed') {
    backUrl = 'check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/planning-permission-answer', function (req, res) {
  var planningPermission = req.session.data['planning-permission']

  if (planningPermission === 'yes') { res.redirect('abstraction-required') } else { res.redirect('planning-progress') }
})

router.get('*/planning-progress', function (req, res) {
  var backUrl = 'planning-permission'
  var nextUrl = 'planning-progress-answer'

  if (req.session.data.water_s01_status === 'Completed') {
    backUrl = 'check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/planning-progress-answer', function (req, res) {
  var planningProgress = req.session.data['planning-progress']

  if (planningProgress === 'yes') { res.redirect('abstraction-required') }
  if (planningProgress === 'not sure') { res.redirect('planning-progress-condition') } else { res.redirect('planning-permission-fail') }
})

// ABSTRACTION LICENCE

router.get('*/abstraction-required', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'abstraction-required-answer'

  if (req.session.data.water_s01_status === 'Completed') {
    backUrl = 'check-answers-check-you-can-apply'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/abstraction-required-answer', function (req, res) {
  var abstractionRequired = req.session.data['abstraction-required']

  if (abstractionRequired === 'yes') { res.redirect('abstraction-licence') }
  if (abstractionRequired === 'not sure') { res.redirect('abstraction-required-condition') } else { res.redirect('check-answers-check-you-can-apply') }
})

router.post('*/abstraction-licence-answer', function (req, res) {
  var abstractionLicence = req.session.data['abstraction-licence']

  if (abstractionLicence === 'yes') { res.redirect('abstraction-variation') } else { res.redirect('abstraction-progress') }
})

router.post('*/abstraction-progress-answer', function (req, res) {
  var abstractionProgress = req.session.data['abstraction-progress']

  if (abstractionProgress === 'yes') { res.redirect('abstraction-variation') }
  if (abstractionProgress === 'not sure') { res.redirect('abstraction-progress-condition') } else { res.redirect('abstraction-licence-fail') }
})

router.post('*/abstraction-variation-answer', function (req, res) {
  var abstractionVariation = req.session.data['abstraction-variation']

  if (abstractionVariation === 'yes') { res.redirect('abstraction-variation-condition') } else { res.redirect('check-answers-check-you-can-apply') }
})

router.get('*/check-answers-check-you-can-apply', function (req, res) {
  var backUrl = res.locals.prevURL

  req.session.data.water_completed_sections = '1'

  req.session.data.water_s01_status = 'Completed'
  req.session.data.water_s01_status_class = ''

  if (req.session.data.water_s02_status !== 'Completed') {
    req.session.data.water_s02_status = 'Not started'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl
  })
})

// WATER SECTION 2

router.get('*/check-answers-project-details-and-benefits', function (req, res) {
  req.session.data.water_completed_sections = '2'

  req.session.data.water_s02_status = 'Completed'
  req.session.data.water_s02_status_class = ''

  if (req.session.data.water_s03_status !== 'Completed') {
    req.session.data.water_s03_status = 'Not started'
  }

  res.render('./' + req.originalUrl, {

    backUrl: res.locals.prevURL

  })
})

router.get('*/project', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'irrigation'

  if (req.session.data.water_s02_status === 'Completed') {
    nextUrl = 'check-answers-project-details-and-benefits'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.get('*/irrigation', function (req, res) {
  req.session.data.tempIrrigation = req.session.data.irrigation

  var backUrl = res.locals.prevURL

  if (req.session.data.water_s02_status === 'Completed') {
    backUrl = 'check-answers-project-details-and-benefits'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl
  })
})

router.post('*/irrigation-answer', function (req, res) {
  var irrigationAnswer = req.session.data.irrigation

  if (req.session.data.water_s02_status === 'Completed') {
    if (irrigationAnswer === req.session.data.tempIrrigation) {
      res.redirect('check-answers-project-details-and-benefits')
    }
  }

  if (irrigationAnswer === 'improve') { res.redirect('current-irrigation') } else { res.redirect('new-irrigation') }
})

router.get('*/collaboration', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'productivity'

  if (req.session.data.water_s02_status === 'Completed') {
    backUrl = 'check-answers-project-details-and-benefits'
    nextUrl = backUrl
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.get('*/productivity', function (req, res) {
  var backUrl = res.locals.prevURL
  var nextUrl = 'environment'

  if (req.session.data.water_s02_status === 'Completed') {
    backUrl = 'check-answers-project-details-and-benefits'
    nextUrl = backUrl
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.get('*/environment', function (req, res) {
  var backUrl = res.locals.prevURL

  if (req.session.data.water_s02_status === 'Completed') {
    backUrl = 'check-answers-project-details-and-benefits'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl
  })
})

// WATER SECTION 3

router.get('*/check-answers-contact-details', function (req, res) {
  req.session.data.water_completed_sections = '3'

  req.session.data.water_s03_status = 'Completed'
  req.session.data.water_s03_status_class = ''

  res.render('./' + req.originalUrl, {
    backUrl: res.locals.prevURL
  })
})

router.get('*/business', function (req, res) {
  if (req.session.data.water_s03_status !== 'Completed') {
    req.session.data.water_s03_status = 'In progress'
    req.session.data.water_s03_status_class = 'govuk-tag--blue'
  }

  var backUrl = res.locals.prevURL
  var nextUrl = 'business-answer'

  if (req.session.data.water_s03_status === 'Completed') {
    backUrl = 'check-answers-contact-details'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/business-answer', function (req, res) {
  var businessAnswer = req.session.data['new-business']

  if (businessAnswer === 'no') { res.redirect('new-business-condition') } else { res.redirect('applying') }
})

router.post('*/applying-answer', function (req, res) {
  var applyingAnswer = req.session.data.applying

  if (applyingAnswer === 'other') { res.redirect('preferred-contact') } else { res.redirect('your-details') }
})

router.get('*/your-details', function (req, res) {
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

router.post('*/your-details-answer', function (req, res) {
  var applyingAnswer = req.session.data.applying

  if (applyingAnswer === 'other') { res.redirect('applicant-details') } else { res.redirect('check-answers-contact-details') }
})

router.post('*/preferred-contact-answer', function (req, res) {
  var preferredContact = req.session.data['preferred-contact']

  if (preferredContact === 'just the applicant') { res.redirect('applicant-details') } else { res.redirect('your-details') }
})

router.get('*/applicant-details', function (req, res) {
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
