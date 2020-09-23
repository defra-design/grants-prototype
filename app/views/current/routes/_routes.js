const express = require('express')
const router = express.Router()

const serviceName = 'Apply for a large grant for a water resource management project'

// console.log( 'This is the _routes file' );
console.log( 'Service name: ' + serviceName );

// Add your routes here - above the module.exports line



//*****************************************************
// START PAGE //
router.get('*/start', function (req, res) {

  console.log( 'This is the start page' );

  // Cannot start yet = 'govuk-tag--grey'
  // Not started = 'govuk-tag--grey'
  // In progress = 'govuk-tag--blue'
  // Completed = ''

  // We only count the sections (weird part of the pattern tbh nicprice comment)

  // Part 1: Check if you can apply

  // Section 1: Check now
  req.session.data['s01_status'] = 'Not started'
  req.session.data['s01_status_class'] = 'govuk-tag--grey'

  // Part 2: Express interest

  // Section 2: Provide project details and benefits
  req.session.data['s02_status'] = 'Cannot start yet'
  req.session.data['s02_status_class'] = 'govuk-tag--grey'

  // Section 3 = 'Give contact details'
  req.session.data['s03_status'] = 'Not started'
  req.session.data['s01_status_class'] = 'govuk-tag--grey'

  res.render( './' + req.originalUrl, {
  })
})

// START PAGE END //











//*****************************************************
// TASK LIST PAGE START //
router.get('*/task-list', function (req, res) {

  console.log( 'This is the task list' );

  // Cannot start yet = 'govuk-tag--grey'
  // Not started = 'govuk-tag--grey'
  // In progress = 'govuk-tag--blue'
  // Completed = ''



  if( req.session.data['s01_status'] != 'Completed'){

    // Part 1: Check if you can apply
    // Section 1: Check now
    req.session.data['s01_status'] = 'Not started'
    req.session.data['s01_status_class'] = 'govuk-tag--grey'

    // Part 2: Express interest
    // Section 2: Provide project details and benefits
    req.session.data['s02_status'] = 'Cannot start yet'
    req.session.data['s02_status_class'] = 'govuk-tag--grey'

    // Section 3 = 'Give contact details'
    req.session.data['s03_status'] = 'Cannot start yet'
    req.session.data['s03_status_class'] = 'govuk-tag--grey'

    // Part 3: Apply in full
    // Section 4: Complete the full application
    req.session.data['s04_status'] = 'Cannot start yet'
    req.session.data['s04_status_class'] = 'govuk-tag--grey'

  }


  var application_status
  var completed_sections

  switch (req.session.data['completed_sections']) {
      case '0':
        application_status = 'Expression of interest not started'
        completed_sections = 'You have completed 0 of 3 sections.'
        break
      case '1':
      application_status = 'Expression of interest in progress'
      completed_sections = 'You have completed 1 of 3 sections.'
        break
      case '2':
      application_status = 'Expression of interest in progress'
      completed_sections = 'You have completed 2 of 3 sections.'
        break
      case '3':
      application_status = 'Expression of interest in progress'
      completed_sections = 'You have completed 3 of 3 sections.'
        break
    }




  var s01_status = req.session.data['s01_status']
  var s01_status_class = req.session.data['s01_status_class']

  // Part 2: Express interest

  // Section 2: Provide project details and benefits
  var s02_status = req.session.data['s02_status']
  var s02_status_class = req.session.data['s02_status_class']

  // Section 3 = 'Give contact details'
  var s03_status = req.session.data['s03_status']
  var s03_status_class = req.session.data['s03_status_class']

  // Part 3: Apply in full

  // Section 4: Complete the full application
  var s04_status = req.session.data['s04_status']
  var s04_status_class = req.session.data['s04_status_class']



  res.render( './' + req.originalUrl, {
    application_status: application_status,
    completed_sections: completed_sections,
    s01_status: s01_status,
    s01_status_class: s01_status_class,
    s02_status: s02_status,
    s02_status_class: s02_status_class,
    s03_status: s03_status,
    s03_status_class: s03_status_class,
    s04_status: s04_status,
    s04_status_class: s04_status_class
  })
})

// TASK LIST PAGE END //


router.get('*/farming-type', function (req, res) {

  // test to check this section isn't completed...

if ( req.session.data['project_eligibility_status'] != 'Completed' ){

  req.session.data['project_eligibility_status'] = 'In progress'
  req.session.data['project_eligibility_status_class'] = 'govuk-tag--blue'

}

res.render( './' + req.originalUrl )

});


router.get('*/check-answers-check-you-can-apply', function (req, res) {

var backUrl = res.locals.prevURL

req.session.data['completed_sections'] = '1'

req.session.data['s01_status'] = 'Completed'
req.session.data['s01_status_class'] = ''

if ( req.session.data['s02_status'] != 'Completed' ){
  req.session.data['s02_status'] = 'Not started'
}

res.render( './' + req.originalUrl,{
  backUrl: backUrl
} )

});


router.get('*/project-items', function (req, res) {

if ( req.session.data['s02_status'] != 'Completed' ){

req.session.data['s02_status'] = 'In progress'
req.session.data['s02_status_class'] = 'govuk-tag--blue'

}

res.render( './' + req.originalUrl )

});


router.get('*/check-answers-project-details-and-benefits', function (req, res) {


req.session.data['completed_sections'] = '2'

req.session.data['s02_status'] = 'Completed'
req.session.data['s02_status_class'] = ''

if ( req.session.data['s03_status'] != 'Completed' ){
  req.session.data['s03_status'] = 'Not started'
}

res.render( './' + req.originalUrl,{

  backUrl : res.locals.prevURL

} )

});


router.get('*/business', function (req, res) {


  if ( req.session.data['contact_details_status'] != 'Completed' ){

req.session.data['contact_details_status'] = 'In progress'
req.session.data['contact_details_status_class'] = 'govuk-tag--blue'

}

res.render( './' + req.originalUrl )

});


router.get('*/check-answers-contact-details', function (req, res) {

req.session.data['completed_sections'] = '3'

req.session.data['s03_status'] = 'Completed'
req.session.data['s03_status_class'] = ''

  res.render( './' + req.originalUrl, {
    backUrl: res.locals.prevURL
  })

});

router.get('*/irrigation', function (req, res) {

  if ( req.session.data['project_benefits_status'] != 'Completed' ){

  req.session.data['project-benefits-status'] = 'In progress'
  req.session.data['project-benefits-status-class'] = 'govuk-tag--blue'

}

res.render( './' + req.originalUrl )

});


router.get('*/check-answers-project-benefits', function (req, res) {

req.session.data['completed_sections'] = '4'

req.session.data['project_benefits_status'] = 'Completed'
req.session.data['project_benefits_status_class'] = ''

res.render( './' + req.originalUrl )

});



// Question routing

router.get('*/farming-type-answer', function (req, res) {

  var farmingType = req.session.data['farming-type']

  if (farmingType == "no"){res.redirect('../water/farming-type-fail')}
  else {res.redirect('../water/legal-status')}
});

router.post('*/legal-status-answer', function (req, res) {

  var legalStatus = req.session.data['legal-status']

  if (legalStatus == "none"){res.redirect('../water/legal-status-fail')}
  else {res.redirect('../water/country')}
});

router.post('*/country-answer', function (req, res) {

  var country = req.session.data['country']

  if (country == "yes"){res.redirect('../water/tenancy')}
  else {res.redirect('../water/country-fail')}
});

router.post('*/tenancy-answer', function (req, res) {

  var tenant = req.session.data['tenancy']

  if (tenant == "yes"){res.redirect('../water/project-items')}
  else {res.redirect('../water/tenancy-length')}
});

router.post('*/tenancy-length-answer', function (req, res) {

  var tenancyLength = req.session.data['tenancy-length']

  if (tenancyLength == "no"){res.redirect('../water/tenancy-length-condition')}
  else {res.redirect('../water/project-items')}
});

router.post('*/project-cost-answer', function (req, res) {

  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500 ){res.redirect('../water/project-cost-fail')}
  else {res.redirect('../water/grant')}

})

router.post('*/remaining-costs-answer', function (req, res) {

  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts == "no" ){res.redirect('../water/remaining-costs-fail')}
  else {res.redirect('../water/public-money')}

})

router.post('*/public-money-answer', function (req, res) {

  var publicMoney = req.session.data['public-money']

  if (publicMoney == "yes" ){res.redirect('../water/public-money-fail')}
  else {res.redirect('../water/project-start')}

})

router.post('*/project-start-answer', function (req, res) {

  var projectStart = req.session.data['project-start']

  if (projectStart == "yes"){res.redirect('../water/project-start-fail')}
  else {res.redirect('../water/planning-required')}
});

router.post('*/planning-required-answer', function (req, res) {

  var planningRequired = req.session.data['planning-required']

  if (planningRequired == "yes"){res.redirect('../water/planning-permission')}
  if (planningRequired == "not sure"){res.redirect('../water/planning-required-condition')}
  else {res.redirect('../water/abstraction-required')}
});

router.post('*/planning-permission-answer', function (req, res) {

  var planningPermission = req.session.data['planning-permission']

  if (planningPermission == "yes"){res.redirect('../water/abstraction-required')}
  else {res.redirect('../water/planning-progress')}
});

router.post('*/planning-progress-answer', function (req, res) {

  var planningProgress = req.session.data['planning-progress']

  if (planningProgress == "yes"){res.redirect('../water/abstraction-required')}
  if (planningProgress == "not sure"){res.redirect('../water/planning-progress-condition')}
  else {res.redirect('../water/planning-permission-fail')}
});

router.post('*/abstraction-required-answer', function (req, res) {

  var abstractionRequired = req.session.data['abstraction-required']

  if (abstractionRequired == "yes"){res.redirect('../water/abstraction-licence')}
  if (abstractionRequired == "not sure"){res.redirect('../water/abstraction-required-condition')}
  else {res.redirect('../water/check-answers-check-you-can-apply')}
});

router.post('*/abstraction-licence-answer', function (req, res) {

  var abstractionLicence = req.session.data['abstraction-licence']

  if (abstractionLicence == "yes"){res.redirect('../water/abstraction-variation')}
  else {res.redirect('../water/abstraction-licence-fail')}
});

router.post('*/abstraction-variation-answer', function (req, res) {

  var abstractionVariation = req.session.data['abstraction-variation']

  if (abstractionVariation == "yes"){res.redirect('../water/abstraction-variation-condition')}
  else {res.redirect('../water/check-answers-check-you-can-apply')}
});

router.post('*/business-answer', function (req, res) {

  var businessAnswer = req.session.data['new-business']

  if (businessAnswer == "no"){res.redirect('../water/new-business-condition')}
  else {res.redirect('../water/applying')}
});

router.post('*/applying-answer', function (req, res) {

  var applyingAnswer = req.session.data['applying']

  if (applyingAnswer == "other"){res.redirect('../water/preferred-contact')}
  else {res.redirect('../water/your-details')}
});

router.get('*/your-details', function (req, res) {

  var backUrl

  if (req.session.data['applying'] == 'own') {
    backUrl = 'applying' }
  else {
    backUrl = 'preferred-contact'
    }

  res.render( './' + req.originalUrl, {
    backUrl: backUrl
  })

})

router.post('*/your-details-answer', function (req, res) {

  var applyingAnswer = req.session.data['applying']

  if (applyingAnswer == "other"){res.redirect('../water/applicant-details')}
  else {res.redirect('../water/check-answers-contact-details')}
});

router.post('*/preferred-contact-answer', function (req, res) {

  var preferredContact = req.session.data['preferred-contact']

  if (preferredContact == "just the applicant"){res.redirect('../water/applicant-details')}
  else {res.redirect('../water/your-details')}
});


router.get('*/applicant-details', function (req, res) {

  var backUrl

  if (req.session.data['preferred-contact'] == 'just the applicant') {
    backUrl = 'preferred-contact' }
  else {
    backUrl = 'your-details'
    }

  res.render( './' + req.originalUrl, {
    backUrl: backUrl
  })

})

router.post('*/irrigation-answer', function (req, res) {

  var irrigationAnswer = req.session.data['irrigation']

  if (irrigationAnswer == "improve"){res.redirect('../water/current-irrigation')}
  else {res.redirect('../water/new-irrigation')}
});

module.exports = router
