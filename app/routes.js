const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// GET SPRINT NAME - useful for relative templates
router.use('/', (req, res, next) => {
  res.locals.currentURL = req.originalUrl; //current screen
  res.locals.prevURL = req.get('Referrer'); // previous screen
  req.folder = req.originalUrl.split('/')[1]; //folder, e.g. 'current'
  req.subfolder = req.originalUrl.split('/')[2]; //sub-folder e.g. 'service'
  res.locals.folder = req.folder; // what folder the url is
  res.locals.subfolder = req.subfolder; // what subfolder the URL is in
  console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder  );
  console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );
  next();
});



// Route index page
router.get('/', function (req, res) {
  res.render('./index')
});



// Set service name based on sub folders for different prototypes
router.get('/current/*', function(req, res, next){
  res.locals['serviceName'] = 'Apply for a large countryside productivity grant for water'
  next()
});



// Start folder specific route
router.use('/current', require('./views/current/routes/_routes'));
router.use('/v1', require('./views/v1/routes/_routes'));



// START PAGE

router.get('*/start', function (req, res) {

// Set up all the task list status settings

// Cannot start yet = 'govuk-tag--grey'
// Not started = 'govuk-tag--grey'
// In progress = 'govuk-tag--blue'
// Completed = ''

req.session.data['completed_sections'] = '0'

req.session.data['project_eligibility_status'] = 'Not started'
req.session.data['project_eligibility_status_class'] = ''

req.session.data['theme_eligibility_status'] = 'Cannot start yet'
req.session.data['theme_eligibility_status_class'] = 'govuk-tag--grey'

req.session.data['contact_details_status'] = 'Cannot start yet'
req.session.data['contact_details_status_class'] = 'govuk-tag--grey'

req.session.data['project_benefits_status'] = 'Cannot start yet'
req.session.data['project_benefits_status_class'] = 'govuk-tag--grey'

req.session.data['final_project_details_status'] = 'Cannot start yet'
req.session.data['final_project_details_status_class'] = 'govuk-tag--grey'

res.render( './' + req.originalUrl )

});





// FARMING TYPE

router.get('*/farming-type', function (req, res) {

  // test to check this section isn't completed...

  var backUrl = 'start'
  if ( req.session.data['cya-project-eligibility'] == 'hub' ){
    backUrl = 'check-answers-project-eligibility'
  }

if ( req.session.data['project_eligibility_status'] != 'Completed' ){

    req.session.data['project_eligibility_status'] = 'In progress'
    req.session.data['project_eligibility_status_class'] = 'govuk-tag--blue'
    }

  res.render( './' + req.originalUrl, {
    backUrl: backUrl
  } )

});

router.post('*/farming-type-answer', function (req, res) {

  var farmingType = req.session.data['farming-type']

  if (farmingType == "none"){res.redirect('current/views/farming-type-fail')}
  else {

    if ( req.session.data['cya-project-eligibility'] == 'hub' ){

      res.redirect('current/views/check-answers-project-eligibility')

    } else {

      res.redirect('current/views/legal-status')

    }

  }
});


// FARMING TYPE

router.get('*/legal-status', function (req, res) {
  var backUrl = 'farming-type'
  if ( req.session.data['cya-project-eligibility'] == 'hub' ){
    backUrl = 'check-answers-project-eligibility'
  }
  res.render( './' + req.originalUrl, {
    backUrl: backUrl
  } )

});


router.post('/legal-status-answer', function (req, res) {

  var legalStatus = req.session.data['legal-status']

  if (legalStatus == "none"){res.redirect('current/views/legal-status-fail')}
  else {

    if ( req.session.data['cya-project-eligibility'] == 'hub' ){

      res.redirect('current/views/check-answers-project-eligibility')

    } else {

      res.redirect('current/views/country')

    }
  }
});


// COUNTRY

router.get('*/country', function (req, res) {
  var backUrl = 'legal-status'
  if ( req.session.data['cya-project-eligibility'] == 'hub' ){
    backUrl = 'check-answers-project-eligibility'
  }
  res.render( './' + req.originalUrl, {
    backUrl: backUrl
  } )
});


router.post('/country-answer', function (req, res) {

  var country = req.session.data['country']

  if (country == "england"){

    if ( req.session.data['cya-project-eligibility'] == 'hub' ){

      res.redirect('current/views/check-answers-project-eligibility')

    } else {

    res.redirect('current/views/tenancy')

    }

  }
  else {res.redirect('current/views/country-fail')}
});


// TENANCY

router.get('*/tenancy', function (req, res) {
  var backUrl = 'country'
  if ( req.session.data['cya-project-eligibility'] == 'hub' ){
    backUrl = 'check-answers-project-eligibility'
  }
  res.render( './' + req.originalUrl, {
    backUrl: backUrl
  } )
});

router.post('/tenancy-answer', function (req, res) {

  var tenant = req.session.data['tenancy']

  if (tenant == "no"){


    if ( req.session.data['cya-project-eligibility'] == 'hub' ){

      res.redirect('current/views/check-answers-project-eligibility')

    } else {

      res.redirect('current/views/project-cost')

    }

  }
  else {

    res.redirect('current/views/tenancy-length')

  }
});


// TENANCY LENGTH

router.post('/tenancy-length-answer', function (req, res) {

  var tenancyLength = req.session.data['tenancy-length']

  if (tenancyLength == "no"){res.redirect('current/views/tenancy-length-condition')}
  else {

    if ( req.session.data['cya-project-eligibility'] == 'hub' ){

      res.redirect('current/views/check-answers-project-eligibility')

    } else {

      res.redirect('current/views/project-cost')

    }

  }
});


router.get('*/tenancy-length-condition', function (req, res) {

  var nextUrl = 'project-cost'

  if ( req.session.data['cya-project-eligibility'] == 'hub' ){

    nextUrl = 'check-answers-project-eligibility'

  }

  res.render( './' + req.originalUrl, {
    nextUrl: nextUrl
  } )


});







// PROJECT COST


router.get('*/project-cost', function (req, res) {

  req.session.data['temp-project-cost'] = req.session.data['project-cost']

  // console.log( 'Previously entered project cost: £' + req.session.data['temp-project-cost'])

  var backUrl = 'tenancy'
  if ( req.session.data['cya-project-eligibility'] == 'hub' ){
    backUrl = 'check-answers-project-eligibility'
  }
  res.render( './' + req.originalUrl, {
    backUrl: backUrl
  } )

});

router.post('/project-cost-answer', function (req, res) {

  var projectCost = req.session.data['project-cost']
  var tempProjectCost = 0

  if ( req.session.data['temp-project-cost'] ){
    tempProjectCost = req.session.data['temp-project-cost']
  }

  console.log( 'Difference: £' + ( projectCost - tempProjectCost ) )

  if (projectCost < 87500 ){res.redirect('/current/views/project-cost-fail')}
  else {

    if ( tempProjectCost ){

        if ( projectCost == tempProjectCost ){
          res.redirect('current/views/check-answers-project-eligibility')
        }

    }

    // this is either the first time round, or the applicant is asking for a different amount
    req.session.data['remaining-costs'] = ''
    req.session.data['public-money'] = ''

    res.redirect('/current/views/remaining-costs')

  }

})


// REMAINING COSTS

router.get('*/remaining-costs', function (req, res) {
  var backUrl = 'project-cost'
  if ( req.session.data['cya-project-eligibility'] == 'hub' ){
    backUrl = 'check-answers-project-eligibility'
  }
  res.render( './' + req.originalUrl, {
    backUrl: backUrl
  } )

});


router.post('/remaining-costs-answer', function (req, res) {

  var remainingCosts = req.session.data['remaining-costs']
  var publicMoney = req.session.data['public-money']

  if (remainingCosts == "no" ){res.redirect('/current/views/remaining-costs-fail')}
  if (publicMoney == "yes" ){res.redirect('/current/views/remaining-costs-fail')}
  else {
    if ( req.session.data['cya-project-eligibility'] == 'hub' ){

      res.redirect('current/views/check-answers-project-eligibility')

    } else {

    res.redirect('current/views/project-start')

    }

  }

})



// PROJECT START

router.get('*/project-start', function (req, res) {
  var backUrl = 'remaining-costs'
  if ( req.session.data['cya-project-eligibility'] == 'hub' ){
    backUrl = 'check-answers-project-eligibility'
  }
  res.render( './' + req.originalUrl, {
    backUrl: backUrl
  } )

});

router.post('/project-start-answer', function (req, res) {

  var projectStart = req.session.data['project-start']

  if (projectStart == "yes"){res.redirect('current/views/project-start-fail')}
  else {res.redirect('current/views/check-answers-project-eligibility')}
});


























router.get('*/check-answers-project-eligibility', function (req, res) {

req.session.data['cya-project-eligibility'] = 'hub'

req.session.data['completed_sections'] = '1'

req.session.data['project_eligibility_status'] = 'Completed'
req.session.data['project_eligibility_status_class'] = ''

if ( req.session.data['theme_eligibility_status'] != 'Completed' ){
  req.session.data['theme_eligibility_status'] = 'Not started'
}

res.render( './' + req.originalUrl, {

  backUrl : res.locals.prevURL

} )

});


router.get('*/project-items', function (req, res) {

if ( req.session.data['theme_eligibility_status'] != 'Completed' ){

req.session.data['theme_eligibility_status'] = 'In progress'
req.session.data['theme_eligibility_status_class'] = 'govuk-tag--blue'

}

res.render( './' + req.originalUrl )

});


router.post('/planning-required-answer', function (req, res) {

  var planningRequired = req.session.data['planning-required']

  if (planningRequired == "yes"){res.redirect('current/views/planning-permission')}
  else {res.redirect('current/views/abstraction-required')}
});

router.post('/planning-permission-answer', function (req, res) {

  var planningPermission = req.session.data['planning-permission']

  if (planningPermission == "yes"){res.redirect('current/views/abstraction-required')}
  else {res.redirect('current/views/planning-progress')}
});

router.post('/planning-progress-answer', function (req, res) {

  var planningProgress = req.session.data['planning-progress']

  if (planningProgress == "yes"){res.redirect('current/views/abstraction-required')}
  else {res.redirect('current/views/planning-permission-fail')}
});

router.post('/abstraction-required-answer', function (req, res) {

  var abstractionRequired = req.session.data['abstraction-required']

  if (abstractionRequired == "yes"){res.redirect('current/views/abstraction-licence')}
  else {res.redirect('current/views/check-answers-theme-eligibility')}
});

router.post('/abstraction-licence-answer', function (req, res) {

  var abstractionLicence = req.session.data['abstraction-licence']

  if (abstractionLicence == "yes"){res.redirect('current/views/abstraction-variation')}
  else {res.redirect('current/views/abstraction-licence-fail')}
});

router.post('/abstraction-variation-answer', function (req, res) {

  var abstractionVariation = req.session.data['abstraction-variation']

  if (abstractionVariation == "yes"){res.redirect('current/views/abstraction-variation-condition')}
  else {res.redirect('current/views/check-answers-theme-eligibility')}
});





















router.get('*/check-answers-theme-eligibility', function (req, res) {

req.session.data['completed_sections'] = '2'

req.session.data['theme_eligibility_status'] = 'Completed'
req.session.data['theme_eligibility_status_class'] = ''

if ( req.session.data['contact_details_status'] != 'Completed' ){
  req.session.data['contact_details_status'] = 'Not started'
}

res.render( './' + req.originalUrl )

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

req.session.data['contact_details_status'] = 'Completed'
req.session.data['contact_details_status_class'] = ''

if ( req.session.data['project_benefits_status'] != 'Completed' ){
  req.session.data['project_benefits_status'] = 'Not started'
}

var backUrl

if (req.session.data['applying'] == 'own') {
  backUrl = 'your-details' }
else {
  backUrl = 'applicant-details'
  }

  res.render( './' + req.originalUrl, {
    backUrl: backUrl
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















router.post('/business-answer', function (req, res) {

  var businessAnswer = req.session.data['new-business']

  if (businessAnswer == "no"){res.redirect('current/views/new-business-condition')}
  else {res.redirect('current/views/applying')}
});

router.post('/applying-answer', function (req, res) {

  var applyingAnswer = req.session.data['applying']

  if (applyingAnswer == "other"){res.redirect('current/views/preferred-contact')}
  else {res.redirect('current/views/your-details')}
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




router.post('/your-details-answer', function (req, res) {

  var applyingAnswer = req.session.data['applying']

  if (applyingAnswer == "other"){res.redirect('current/views/applicant-details')}
  else {res.redirect('current/views/check-answers-contact-details')}
});

router.post('/preferred-contact-answer', function (req, res) {

  var preferredContact = req.session.data['preferred-contact']

  if (preferredContact == "just the applicant"){res.redirect('current/views/applicant-details')}
  else {res.redirect('current/views/your-details')}
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









router.post('/irrigation-answer', function (req, res) {

  var irrigationAnswer = req.session.data['irrigation']

  if (irrigationAnswer == "improve"){res.redirect('current/views/current-irrigation')}
  else {res.redirect('current/views/new-irrigation')}
});

//*****************************************************
// TASK LIST PAGE START //
router.get('*/task-list', function (req, res) {

    var application_status
    var completed_sections

    switch (req.session.data['completed_sections']) {
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

    project_eligibility_status = req.session.data['project_eligibility_status']
    project_eligibility_status_class = req.session.data['project_eligibility_status_class']

    theme_eligibility_status = req.session.data['theme_eligibility_status']
    theme_eligibility_status_class = req.session.data['theme_eligibility_status_class']

    contact_details_status = req.session.data['contact_details_status']
    contact_details_status_class = req.session.data['contact_details_status_class']

    project_benefits_status = req.session.data['project_benefits_status']
    project_benefits_status_class = req.session.data['project_benefits_status_class']

    final_project_details_status = req.session.data['final_project_details_status']
    final_project_details_status_class = req.session.data['final_project_details_status_class']



  res.render( './' + req.originalUrl, {

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


module.exports = router
