const express = require('express')
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const serviceName = 'Apply for a large countryside productivity grant for water'

// console.log( 'This is the _routes file' );
// console.log( serviceName );

// Add your routes here - above the module.exports line

//* ****************************************************
// TASK LIST PAGE START //
router.get('/views/task-list', function (req, res) {
  var application_status
  var completed_sections

  switch (req.session.data.completed_sections) {
    case '0':
      application_status = 'Expression of interest not started'
      completed_sections = 'You have completed 0 of 4 sections.'
      break
    case '1':
      application_status = 'Expression of interest in progress'
      completed_sections = 'You have completed 1 of 4 sections.'
      break
    case '2':
      application_status = 'Expression of interest in progress'
      completed_sections = 'You have completed 2 of 4 sections.'
      break
    case '3':
      application_status = 'Expression of interest in progress'
      completed_sections = 'You have completed 3 of 4 sections.'
      break
    case '4':
      application_status = 'Expression of interest completed'
      completed_sections = 'You have completed 4 of 4 sections.'
      break
  }

  project_eligibility_status = req.session.data.project_eligibility_status
  project_eligibility_status_class = req.session.data.project_eligibility_status_class

  theme_eligibility_status = req.session.data.theme_eligibility_status
  theme_eligibility_status_class = req.session.data.theme_eligibility_status_class

  contact_details_status = req.session.data.contact_details_status
  contact_details_status_class = req.session.data.contact_details_status_class

  project_benefits_status = req.session.data.project_benefits_status
  project_benefits_status_class = req.session.data.project_benefits_status_class

  final_project_details_status = req.session.data.final_project_details_status
  final_project_details_status_class = req.session.data.final_project_details_status_class

  res.render('./' + req.originalUrl, {

    application_status: application_status,
    completed_sections: completed_sections,
    project_eligibility_status: project_eligibility_status,
    project_eligibility_status_class: project_eligibility_status_class,
    theme_eligibility_status: theme_eligibility_status,
    theme_eligibility_status_class: theme_eligibility_status_class,
    contact_details_status: contact_details_status,
    contact_details_status_class: contact_details_status_class,
    project_benefits_status: project_benefits_status,
    project_benefits_status_class: project_benefits_status_class,
    final_project_details_status: final_project_details_status,
    final_project_details_status_class: final_project_details_status_class

  })
})

// TASK LIST PAGE END //

router.get('/views/start', function (req, res) {
  // Set up all the section statuses

  // Cannot start yet = 'govuk-tag--grey'
  // Not started = 'govuk-tag--grey'
  // In progress = 'govuk-tag--blue'
  // Completed = ''

  req.session.data.completed_sections = '0'

  req.session.data.project_eligibility_status = 'Not started'
  req.session.data.project_eligibility_status_class = ''

  req.session.data.theme_eligibility_status = 'Cannot start yet'
  req.session.data.theme_eligibility_status_class = 'govuk-tag--grey'

  req.session.data.contact_details_status = 'Cannot start yet'
  req.session.data.contact_details_status_class = 'govuk-tag--grey'

  req.session.data.project_benefits_status = 'Cannot start yet'
  req.session.data.project_benefits_status_class = 'govuk-tag--grey'

  req.session.data.final_project_details_status = 'Cannot start yet'
  req.session.data.final_project_details_status_class = 'govuk-tag--grey'

  res.render('./' + req.originalUrl)
})

router.get('*/farming-type', function (req, res) {
  // test to check this section isn't completed...

  if (req.session.data.project_eligibility_status !== 'Completed') {
    req.session.data.project_eligibility_status = 'In progress'
    req.session.data.project_eligibility_status_class = 'govuk-tag--blue'
  }

  res.render('./' + req.originalUrl)
})

router.get('*/check-answers-project-eligibility', function (req, res) {
  req.session.data.completed_sections = '1'

  req.session.data.project_eligibility_status = 'Completed'
  req.session.data.project_eligibility_status_class = ''

  if (req.session.data.theme_eligibility_status !== 'Completed') {
    req.session.data.theme_eligibility_status = 'Not started'
  }

  res.render('./' + req.originalUrl)
})

router.get('*/project-items', function (req, res) {
  if (req.session.data.theme_eligibility_status !== 'Completed') {
    req.session.data.theme_eligibility_status = 'In progress'
    req.session.data.theme_eligibility_status_class = 'govuk-tag--blue'
  }

  res.render('./' + req.originalUrl)
})

router.get('*/check-answers-theme-eligibility', function (req, res) {
  req.session.data.completed_sections = '2'

  req.session.data.theme_eligibility_status = 'Completed'
  req.session.data.theme_eligibility_status_class = ''

  if (req.session.data.contact_details_status !== 'Completed') {
    req.session.data.contact_details_status = 'Not started'
  }

  res.render('./' + req.originalUrl)
})

router.get('*/business', function (req, res) {
  if (req.session.data.contact_details_status !== 'Completed') {
    req.session.data.contact_details_status = 'In progress'
    req.session.data.contact_details_status_class = 'govuk-tag--blue'
  }

  res.render('./' + req.originalUrl)
})

router.get('*/check-answers-contact-details', function (req, res) {
  req.session.data.completed_sections = '3'

  req.session.data.contact_details_status = 'Completed'
  req.session.data.contact_details_status_class = ''

  if (req.session.data.project_benefits_status !== 'Completed') {
    req.session.data.project_benefits_status = 'Not started'
  }

  var backUrl

  if (req.session.data.applying === 'own') {
    backUrl = 'your-details'
  } else {
    backUrl = 'applicant-details'
  }

  res.render('./' + req.originalUrl, {
    backUrl: backUrl
  })
})

router.get('*/irrigation', function (req, res) {
  if (req.session.data.project_benefits_status !== 'Completed') {
    req.session.data['project-benefits-status'] = 'In progress'
    req.session.data['project-benefits-status-class'] = 'govuk-tag--blue'
  }

  res.render('./' + req.originalUrl)
})

router.get('*/check-answers-project-benefits', function (req, res) {
  req.session.data.completed_sections = '4'

  req.session.data.project_benefits_status = 'Completed'
  req.session.data.project_benefits_status_class = ''

  res.render('./' + req.originalUrl)
})

// Question routing

router.get('*/farming-type-answer', function (req, res) {
  var farmingType = req.session.data['farming-type']

  if (farmingType === 'none') { res.redirect('farming-type-fail') } else { res.redirect('legal-status') }
})

router.post('*/legal-status-answer', function (req, res) {
  var legalStatus = req.session.data['legal-status']

  if (legalStatus === 'none') { res.redirect('legal-status-fail') } else { res.redirect('country') }
})

router.post('*/country-answer', function (req, res) {
  var country = req.session.data.country

  if (country === 'england') { res.redirect('tenancy') } else { res.redirect('country-fail') }
})

router.post('*/tenancy-answer', function (req, res) {
  var tenant = req.session.data.tenancy

  if (tenant === 'no') { res.redirect('project-cost') } else { res.redirect('tenancy-length') }
})

router.post('*/tenancy-length-answer', function (req, res) {
  var tenancyLength = req.session.data['tenancy-length']

  if (tenancyLength === 'no') { res.redirect('tenancy-length-condition') } else { res.redirect('project-cost') }
})

router.post('*/project-cost-answer', function (req, res) {
  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500) { res.redirect('project-cost-fail') } else { res.redirect('remaining-costs') }
})

router.post('*/remaining-costs-answer', function (req, res) {
  var remainingCosts = req.session.data['remaining-costs']
  var publicMoney = req.session.data['public-money']

  if (remainingCosts === 'no') { res.redirect('remaining-costs-fail') }
  if (publicMoney === 'yes') { res.redirect('remaining-costs-fail') } else { res.redirect('project-start') }
})

router.post('*/project-start-answer', function (req, res) {
  var projectStart = req.session.data['project-start']

  if (projectStart === 'yes') { res.redirect('project-start-fail') } else { res.redirect('check-answers-project-eligibility') }
})

router.post('*/planning-required-answer', function (req, res) {
  var planningRequired = req.session.data['planning-required']

  if (planningRequired === 'yes') { res.redirect('planning-permission') } else { res.redirect('abstraction-required') }
})

router.post('*/planning-permission-answer', function (req, res) {
  var planningPermission = req.session.data['planning-permission']

  if (planningPermission === 'yes') { res.redirect('abstraction-required') } else { res.redirect('planning-progress') }
})

router.post('*/planning-progress-answer', function (req, res) {
  var planningProgress = req.session.data['planning-progress']

  if (planningProgress === 'yes') { res.redirect('abstraction-required') } else { res.redirect('planning-permission-fail') }
})

router.post('*/abstraction-required-answer', function (req, res) {
  var abstractionRequired = req.session.data['abstraction-required']

  if (abstractionRequired === 'yes') { res.redirect('abstraction-licence') } else { res.redirect('check-answers-theme-eligibility') }
})

router.post('*/abstraction-licence-answer', function (req, res) {
  var abstractionLicence = req.session.data['abstraction-licence']

  if (abstractionLicence === 'yes') { res.redirect('abstraction-variation') } else { res.redirect('abstraction-licence-fail') }
})

router.post('*/abstraction-variation-answer', function (req, res) {
  var abstractionVariation = req.session.data['abstraction-variation']

  if (abstractionVariation === 'yes') { res.redirect('abstraction-variation-condition') } else { res.redirect('check-answers-theme-eligibility') }
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

router.post('*/irrigation-answer', function (req, res) {
  var irrigationAnswer = req.session.data.irrigation

  if (irrigationAnswer === 'improve') { res.redirect('current-irrigation') } else { res.redirect('new-irrigation') }
})

module.exports = router
