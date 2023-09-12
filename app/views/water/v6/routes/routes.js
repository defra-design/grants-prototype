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

  // ------------------------------------------
  req.session.data.COMPLETED = false
  // ------------------------------------------

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
  var backUrl = 'start'
  var nextUrl = 'farming-type-answer'
  var completedUrl = 'farming-type-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.get('*/farming-type-answer', function (req, res) {
  var farmingType = req.session.data['farming-type']
  var farmingTypeOther = req.session.data['farming-type-other-options']

  if (!!farmingType && farmingType === 'no' && !!farmingTypeOther) {
    if (farmingTypeOther === 'something else') {
      res.redirect('farming-type-fail')
    } else {
      farmingType = 'no: [' + farmingTypeOther + ']'
    }
  }

  req.session.data['summary-farming-type'] = farmingType
  res.redirect('legal-status')
})

router.get('*/farming-type-answer-completed', function (req, res) {
  var farmingType = req.session.data['farming-type']
  var farmingTypeOther = req.session.data['farming-type-other-options']

  if (!!farmingType && farmingType === 'no' && !!farmingTypeOther) {
    if (farmingTypeOther === 'something else') {
      res.redirect('farming-type-fail')
    } else {
      farmingType = 'no: [' + farmingTypeOther + ']'
    }
  }

  req.session.data['summary-farming-type'] = farmingType
  res.redirect('answers')
})

// Q: LEGAL STATUS

router.get('*/legal-status', function (req, res) {
  var backUrl = 'farming-type'
  var nextUrl = 'legal-status-answer'
  var completedUrl = 'legal-status-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.post('*/legal-status-answer', function (req, res) {
  var legalStatus = req.session.data['legal-status']

  if (legalStatus === 'none') { res.redirect('legal-status-fail') } else { res.redirect('country') }
})

router.post('*/legal-status-answer-completed', function (req, res) {
  var legalStatus = req.session.data['legal-status']

  if (legalStatus === 'none') { res.redirect('legal-status-fail') } else { res.redirect('answers') }
})

router.get('*/country', function (req, res) {
  var backUrl = 'legal-status'
  var nextUrl = 'country-answer'
  var completedUrl = 'country-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.post('*/country-answer', function (req, res) {
  var country = req.session.data.country
  var postcode = req.session.data.postcode

  if (!!country && country === 'yes') {
    if (!!postcode && postcode.length > 0) {
      country = 'yes: [ Postcode: ' + postcode + ' ]'
    }

    req.session.data['summary-country'] = country
    res.redirect('tenancy')
  } else {
    res.redirect('country-fail')
  }
})

router.post('*/country-answer-completed', function (req, res) {
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

router.get('*/tenancy', function (req, res) {
  var backUrl = 'country'
  var nextUrl = 'tenancy-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.post('*/tenancy-answer', function (req, res) {
  var tenant = req.session.data.tenancy

  if (tenant === 'yes') {
    res.redirect('project-items')
  } else { res.redirect('tenancy-length') }
})

router.post('*/tenancy-length-answer', function (req, res) {
  var tenancyLength = req.session.data['tenancy-length']

  if (tenancyLength === 'no') { res.redirect('tenancy-length-condition') } else { res.redirect('project-items') }
})

router.post('*/tenancy-length-answer-completed', function (req, res) {
  res.redirect('answers')
})

router.get('*/project-items', function (req, res) {
  var backUrl = 'tenancy'
  var nextUrl = 'project-cost'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.get('*/project-cost', function (req, res) {
  req.session.data.currentProjectCost = req.session.data['project-cost']

  var backUrl = 'project-items'
  var nextUrl = 'project-cost-answer'
  var completedUrl = 'project-cost-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.post('*/project-cost-answer', function (req, res) {
  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500) { res.redirect('project-cost-fail') } else { res.redirect('grant') }
})

router.post('*/project-cost-answer-completed', function (req, res) {
  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500) { res.redirect('project-cost-fail') } else { res.redirect('answers') }
})

router.get('*/grant', function (req, res) {
  var backUrl = 'project-cost'
  var nextUrl = 'remaining-costs'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.get('*/remaining-costs', function (req, res) {
  var backUrl = 'grant'
  var nextUrl = 'remaining-costs-answer'
  var completedUrl = 'remaining-costs-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.post('*/remaining-costs-answer', function (req, res) {
  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts === 'no') { res.redirect('remaining-costs-fail') } else { res.redirect('project-start') }
})

router.post('*/remaining-costs-answer-completed', function (req, res) {
  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts === 'no') { res.redirect('remaining-costs-fail') } else { res.redirect('answers') }
})

// PROJECT START

router.get('*/project-start', function (req, res) {
  var backUrl = 'remaining-costs'
  var nextUrl = 'project-start-answer'
  var completedUrl = 'project-start-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.post('*/project-start-answer', function (req, res) {
  var projectStart = req.session.data['project-start']

  if (projectStart === 'yes') { res.redirect('project-start-fail') } else { res.redirect('planning-permission') }
})

router.post('*/project-start-answer-completed', function (req, res) {
  var projectStart = req.session.data['project-start']

  if (projectStart === 'yes') { res.redirect('project-start-fail') } else { res.redirect('answers') }
})

// PLANNING PERMISSION

router.get('*/planning-permission', function (req, res) {
  var backUrl = 'project-start'
  var nextUrl = 'abstraction-licence'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

// ABSTRACTION LICENCE

router.get('*/abstraction-licence', function (req, res) {
  var backUrl = 'planning-permission'
  var nextUrl = 'project-summary'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.get('*/project-summary', function (req, res) {
  var backUrl = 'abstraction-licence'
  var nextUrl = 'irrigated-land'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.get('*/irrigated-land', function (req, res) {
  var backUrl = 'project-summary'
  var nextUrl = 'irrigated-crops'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.get('*/irrigated-crops', function (req, res) {
  var backUrl = 'irrigated-land'
  var nextUrl = 'irrigation-water-source'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.get('*/irrigation-water-source', function (req, res) {
  req.session.data.tempIrrigationAnswer = req.session.data.irrigationAnswer
  var backUrl = 'irrigated-crops'
  var nextUrl = 'irrigation-water-source-answer'
  var completedUrl = 'irrigation-water-source-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.post('*/irrigation-water-source-answer', function (req, res) {
  var irrigationTargetAnswer = req.session.data['irrigation-target']

  if (!!irrigationTargetAnswer && irrigationTargetAnswer.includes('mains')) {
    res.redirect('irrigation-water-source-fail')
  } else { res.redirect('irrigation-systems') }
})

router.post('*/irrigation-water-source-answer-completed', function (req, res) {
  var irrigationTargetAnswer = req.session.data['irrigation-target']

  if (!!irrigationTargetAnswer && irrigationTargetAnswer.includes('mains')) {
    res.redirect('irrigation-water-source-fail')
  } else { res.redirect('answers') }
})

router.get('*/irrigation-systems', function (req, res) {
  var backUrl = 'irrigation-water-source'
  var nextUrl = 'productivity'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.get('*/productivity', function (req, res) {
  var backUrl = 'irrigation-systems'
  var nextUrl = 'environment'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.get('*/environment', function (req, res) {
  var backUrl = 'productivity'
  var nextUrl = 'environment-answer'
  var completedUrl = 'environment-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.post('*/environment-answer', function (req, res) {
  var tempEnvironmentData = req.session.data.environment
  var tempReservoirData = req.session.data['environment-reservoir-options']

  if (!!tempEnvironmentData && tempEnvironmentData.includes('Reservoir design') &&
        !!tempReservoirData && tempReservoirData.length > 0
  ) {
    var addEnvData = 'Reservoir design: [' + tempReservoirData.join(', ') + ']'

    tempEnvironmentData = tempEnvironmentData.map(x => (
      x === 'Reservoir design'
        ? addEnvData : x
    ))
  }

  req.session.data['environment-summary'] = tempEnvironmentData
  res.redirect('collaboration')
})

router.post('*/environment-answer-completed', function (req, res) {
  var tempEnvironmentData = req.session.data.environment
  var tempReservoirData = req.session.data['environment-reservoir-options']

  if (!!tempEnvironmentData && tempEnvironmentData.includes('Reservoir design') &&
        !!tempReservoirData && tempReservoirData.length > 0
  ) {
    var addEnvData = 'Reservoir design: [' + tempReservoirData.join(', ') + ']'

    tempEnvironmentData = tempEnvironmentData.map(x => (
      x === 'Reservoir design'
        ? addEnvData : x
    ))
  }

  req.session.data['environment-summary'] = tempEnvironmentData
  res.redirect('answers')
})

router.get('*/collaboration', function (req, res) {
  var backUrl = 'environment'
  var nextUrl = 'answers'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl,
    completedUrl: completedUrl
  })
})

router.get('*/answers', function (req, res) {
  req.session.data.COMPLETED = true

  var backUrl = 'collaboration'
  var nextUrl = 'business'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.get('*/business', function (req, res) {
  if (req.session.data.water_s03_status !== 'Completed') {
    req.session.data.water_s03_status = 'In progress'
    req.session.data.water_s03_status_class = 'govuk-tag--blue'
  }

  var backUrl = 'answers'
  var nextUrl = 'applying'

  if (req.session.data.water_s03_status === 'Completed') {
    // backUrl = "check-answers-contact-details"
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.post('*/applying-answer', function (req, res) {
  res.redirect('your-details')
})

router.get('*/consent', function (req, res) {
  var nextUrl = 'reference-number'
  var backUrl = 'your-details'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
})

router.get('*/reference-number', function (req, res) {
  var backUrl = 'consent'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl
  })
})

router.get('*/survey', function (req, res) {
  req.session.data.water_completed_sections = '3'

  req.session.data.water_s03_status = 'Completed'
  req.session.data.water_s03_status_class = ''

  res.render('./' + req.originalUrl, {
    // backUrl: res.locals.prevURL
  })
})

router.get('*/email', function (req, res) {
  res.render('./' + req.originalUrl, {
    // backUrl: res.locals.prevURL
  })
})

module.exports = router
