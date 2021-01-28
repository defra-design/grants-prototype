const express = require('express')
const router = express.Router()

const serviceName = 'Apply for a large grant for a water resource management project'

// console.log( 'This is the _routes file' );
console.log( 'Service name: ' + serviceName );

// Add your routes here - above the module.exports line



//*****************************************************
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
  req.session.data['water_s01_status'] = 'Not started'
  req.session.data['water_s01_status_class'] = 'govuk-tag--grey'

  // Part 2: Express interest

  // Section 2: Provide project details and benefits
  req.session.data['water_s02_status'] = 'Cannot start yet'
  req.session.data['water_s02_status_class'] = 'govuk-tag--grey'

  // Section 3 = 'Give contact details'
  req.session.data['water_s03_status'] = 'Cannot start yet'
  req.session.data['water_s03_status_class'] = 'govuk-tag--grey'

  // Section 4 = 'Full application'
  req.session.data['water_s04_status'] = 'Cannot start yet'
  req.session.data['water_s04_status_class'] = 'govuk-tag--grey'

  res.render( './' + req.originalUrl, {
  })
})

// START PAGE END //




router.get('*/water/task-list-prefilled', function (req, res) {

  req.session.data['water_s01_status'] = 'Completed'
  req.session.data['water__s01_status_class'] = ''

  req.session.data['water_s02_status'] = 'Not started'
  req.session.data['water_s02_status_class'] = 'govuk-tag--grey'

  req.session.data['water_s03_status'] = 'Cannot start yet'
  req.session.data['water_s03_status_class'] = 'govuk-tag--grey'

  req.session.data['water_s04_status'] = 'Cannot start yet'
  req.session.data['water_s04_status_class'] = 'govuk-tag--grey'

  res.redirect( './task-list' )
})









//*****************************************************
// TASK LIST PAGE START //
router.get('*/water/task-list', function (req, res) {

  // console.log( 'This is the task list' );

  // Cannot start yet = 'govuk-tag--grey'
  // Not started = 'govuk-tag--grey'
  // In progress = 'govuk-tag--blue'
  // Completed = ''

  var backUrl = res.locals.prevURL

  if( req.session.data['water_s01_status'] != 'Completed'){

    // Part 1: Check if you can apply
    // Section 1: Check now
    req.session.data['water_s01_status'] = 'Not started'
    req.session.data['water_s01_status_class'] = 'govuk-tag--grey'

    // Part 2: Express interest
    // Section 2: Provide project details and benefits
    req.session.data['water_s02_status'] = 'Cannot start yet'
    req.session.data['water_s02_status_class'] = 'govuk-tag--grey'

    // Section 3 = 'Give contact details'
    req.session.data['water_s03_status'] = 'Cannot start yet'
    req.session.data['water_s03_status_class'] = 'govuk-tag--grey'

    // Part 3: Apply in full
    // Section 4: Complete the full application
    req.session.data['water_s04_status'] = 'Cannot start yet'
    req.session.data['water_s04_status_class'] = 'govuk-tag--grey'

  }


  var water_application_status
  var water_completed_sections

  switch (req.session.data['water_completed_sections']) {
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


  var water_s01_status = req.session.data['water_s01_status']
  var water_s01_status_class = req.session.data['water_s01_status_class']

  // Part 2: Express interest

  // Section 2: Provide project details and benefits
  var water_s02_status = req.session.data['water_s02_status']
  var water_s02_status_class = req.session.data['water_s02_status_class']

  // Section 3 = 'Give contact details'
  var water_s03_status = req.session.data['water_s03_status']
  var water_s03_status_class = req.session.data['water_s03_status_class']

  // Part 3: Apply in full

  // Section 4: Complete the full application
  var water_s04_status = req.session.data['water_s04_status']
  var water_s04_status_class = req.session.data['water_s04_status_class']



  res.render( './' + req.originalUrl, {
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

  // test to check this section isn't completed...

  if ( req.session.data['water_s01_status'] == 'Completed' ){
    backUrl = "start"
  } else {
    req.session.data['water_s01_status'] = 'In progress'
    req.session.data['water_s01_status_class'] = 'govuk-tag--blue'
  }

res.render( './' + req.originalUrl,{
  backUrl: backUrl,
  nextUrl: nextUrl
} )

});

router.get('*/water/farming-type-answer', function (req, res) {

  var farmingType = req.session.data['farming-type']
  var farmingTypeOther = req.session.data['farming-type-other-options']

  if ( !!farmingType && farmingType == "no" && !!farmingTypeOther ) {

    if (farmingTypeOther == 'something else') {
      res.redirect('../water/farming-type-fail')
    } else {
      farmingType = "no: [" + farmingTypeOther + "]";
    }
    
  }

  req.session.data['summary-farming-type'] = farmingType;
  res.redirect('../water/legal-status')

});




// Q: LEGAL STATUS

router.get('*/water/legal-status', function (req, res) {

  var backUrl = 'farming-type'
  var nextUrl = '../water/legal-status-answer'

  if ( req.session.data['water_s01_status'] == 'Completed' ){
    // backUrl = "answers"
  }

res.render( './' + req.originalUrl,{
  backUrl: backUrl,
  nextUrl: nextUrl
} )

});


router.post('*/water/legal-status-answer', function (req, res) {

  var legalStatus = req.session.data['legal-status']

  if (legalStatus == "none"){res.redirect('../water/legal-status-fail')}
  else {

    if ( req.session.data['water_s01_status'] == 'Completed'){
      res.redirect('../water/answers')
    }else{
      res.redirect('../water/country')}
    }
});



router.get('*/water/country', function (req, res) {

  var backUrl = 'legal-status'
  var nextUrl = '../water/country-answer'

  if ( req.session.data['water_s01_status'] == 'Completed' ){
    // backUrl = "../water/answers"
  }

res.render( './' + req.originalUrl,{
  backUrl: backUrl,
  nextUrl: nextUrl
} )

});


router.post('*/water/country-answer', function (req, res) {

  var country = req.session.data['country']

  if (country == "yes"){

    if ( req.session.data['water_s01_status'] == 'Completed'){
      res.redirect('../water/answers')
    }else{
      res.redirect('../water/tenancy')}
    }
  else {res.redirect('../water/country-fail')}
});


router.get('*/water/tenancy', function (req, res) {

  var backUrl = 'country'
  var nextUrl = '../water/tenancy-answer'


  if ( req.session.data['water_s01_status'] == 'Completed' ){
    // backUrl = "../water/answers"
  }

res.render( './' + req.originalUrl,{
  backUrl: backUrl,
  nextUrl: nextUrl
} )

});


router.post('*/water/tenancy-answer', function (req, res) {

  var tenant = req.session.data['tenancy']

  if (tenant == "yes"){


    if ( req.session.data['water_s01_status'] == 'Completed'){
      res.redirect('../water/answers')
    }else{
      res.redirect('../water/project-items')
    }

  }
  else {res.redirect('../water/tenancy-length')}
});


router.post('*/water/tenancy-length-answer', function (req, res) {

  var tenancyLength = req.session.data['tenancy-length']

  if (tenancyLength == "no"){res.redirect('../water/tenancy-length-condition')}
  else {
    if ( req.session.data['water_s01_status'] == 'Completed'){
      res.redirect('../water/answers')
    }else{
      res.redirect('../water/project-items')
    }
  }
});



router.get('*/water/project-items', function (req, res) {

  var backUrl = 'tenancy'
  var nextUrl = '../water/project-cost'

  if( req.session.data['water_s01_status'] == 'Completed' ){
    // backUrl = '../water/answers'
    nextUrl = backUrl
  }

  res.render( './' + req.originalUrl,{
    backUrl: backUrl,
    nextUrl: nextUrl
  } )

});



router.get('*/water/project-cost', function (req, res) {

  req.session.data['currentProjectCost'] = req.session.data['project-cost']

  console.log( req.session.data['currentProjectCost'] )

  var backUrl = 'project-items'
  var nextUrl = '../water/project-cost-answer'

  if ( req.session.data['water_s01_status'] == 'Completed' ){
    // backUrl = "../water/answers"
  }

res.render( './' + req.originalUrl,{
  backUrl: backUrl,
  nextUrl: nextUrl
} )

});


router.post('*/water/project-cost-answer', function (req, res) {

  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500 ){res.redirect('../water/project-cost-fail')}
  else {

    if ( req.session.data['water_s01_status'] == 'Completed'){
      if ( projectCost == req.session.data['currentProjectCost']){
        res.redirect('../water/answers')
      }else{
        res.redirect('../water/grant')
      }
    }else{
      res.redirect('../water/grant')
    }

  }

})


router.get('*/water/grant', function (req, res) {

  var backUrl = 'project-cost'
  var nextUrl = 'remaining-costs'

  if ( req.session.data['water_s01_status'] == 'Completed' ){
    // backUrl = "../water/answers"
  }

res.render( './' + req.originalUrl,{
  backUrl: backUrl,
  nextUrl: nextUrl
} )

});





router.get('*/water/remaining-costs', function (req, res) {

  var backUrl = 'grant'
  var nextUrl = '../water/remaining-costs-answer'

  if ( req.session.data['water_s01_status'] == 'Completed' ){
    // backUrl = "../water/answers"
  }

res.render( './' + req.originalUrl,{
  backUrl: backUrl,
  nextUrl: nextUrl
} )

});


router.post('*/water/remaining-costs-answer', function (req, res) {

  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts == "no" ){res.redirect('../water/remaining-costs-fail')}
  else {

    if ( req.session.data['water_s01_status'] == 'Completed'){
      res.redirect('../water/answers')
    }else{
      res.redirect('../water/project-start')
    }

  }

})


// PROJECT START

router.get('*/water/project-start', function (req, res) {

  var backUrl = 'remaining-costs'
  var nextUrl = '../water/project-start-answer'

  if ( req.session.data['water_s01_status'] == 'Completed' ){
    // backUrl = "../water/answers"
  }

  res.render( './' + req.originalUrl,{
    backUrl: backUrl,
    nextUrl: nextUrl
  })

});


router.post('*/water/project-start-answer', function (req, res) {

  var projectStart = req.session.data['project-start']

  if (projectStart == "yes"){res.redirect('../water/project-start-fail')}
  else {
    if ( req.session.data['water_s01_status'] == 'Completed'){
      res.redirect('../water/answers')
    }else{
      res.redirect('../water/planning-required')
    }
  }
});

// PLANNING PERMISSION

router.get('*/water/planning-required', function (req, res) {

  var backUrl = 'project-start'
  var nextUrl = '../water/planning-required-answer'

  if ( req.session.data['water_s01_status'] == 'Completed' ){
    // backUrl = "../water/answers"
  }

  res.render( './' + req.originalUrl,{
    backUrl: backUrl,
    nextUrl: nextUrl
  })

});



router.post('*/water/planning-required-answer', function (req, res) {

  var planningRequired = req.session.data['planning-required']

  if (planningRequired == "yes"){res.redirect('../water/planning-permission')}
  if (planningRequired == "not sure"){res.redirect('../water/planning-required-condition')}
  else {
    if ( req.session.data['water_s01_status'] == 'Completed'){
      res.redirect('../water/answers')
    }else{
      res.redirect('../water/abstraction-required')
    }
  }
});



router.get('*/water/planning-required-condition', function (req, res) {

  var nextUrl = '../water/abstraction-required'

  if ( req.session.data['water_s01_status'] == 'Completed' ){
    // nextUrl = "../water/answers"
  }

  res.render( './' + req.originalUrl,{
    nextUrl: nextUrl
  })

});


router.get('*/water/planning-permission', function (req, res) {

  var backUrl = 'planning-required'
  var nextUrl = '../water/planning-permission-answer'

  if ( req.session.data['water_s01_status'] == 'Completed' ){
    // backUrl = "../water/answers"
  }

  res.render( './' + req.originalUrl,{
    backUrl: backUrl,
    nextUrl: nextUrl
  })

});

router.post('*/water/planning-permission-answer', function (req, res) {

  var planningPermission = req.session.data['planning-permission']
  
  if (planningPermission == "yes"){res.redirect('../water/abstraction-required')}
  else {res.redirect('../water/planning-progress-condition')}
});



// ABSTRACTION LICENCE

router.get('*/water/abstraction-required', function (req, res) {

  var backUrl = res.locals.prevURL
  var nextUrl = '../water/abstraction-required-answer'

  if ( req.session.data['water_s01_status'] == 'Completed' ){
    // backUrl = "../water/answers"
  }

  res.render( './' + req.originalUrl,{
    backUrl: backUrl,
    nextUrl: nextUrl
  })

});


router.post('*/water/abstraction-required-answer', function (req, res) {

  var abstractionRequired = req.session.data['abstraction-required']

  if (abstractionRequired == "yes"){res.redirect('../water/abstraction-licence')}
  if (abstractionRequired == "not sure"){res.redirect('../water/abstraction-required-condition')}
  else {res.redirect('../water/project-summary')}
});

router.post('*/water/abstraction-licence-answer', function (req, res) {

  var abstractionLicence = req.session.data['abstraction-licence']

  if (abstractionLicence == "yes"){res.redirect('../water/abstraction-variation')}
  else {res.redirect('../water/abstraction-progress-condition')}
});

router.post('*/water/abstraction-variation-answer', function (req, res) {

  var abstractionVariation = req.session.data['abstraction-variation']

  if (abstractionVariation == "yes"){res.redirect('../water/abstraction-variation-condition')}
  else {res.redirect('../water/project-summary')}
});



router.get('*/water/project-summary', function (req, res) {

  var backUrl = res.locals.prevURL
  var nextUrl = '../water/irrigated-land'

  if ( req.session.data['water_s02_status'] == 'Completed' ){
    // nextUrl = "../water/answers"
  }

  res.render( './' + req.originalUrl,{
    backUrl: backUrl,
    nextUrl: nextUrl
  })

});

router.get('*/water/irrigated-land', function (req, res) {

  var backUrl = 'project-summary'
  var nextUrl = '../water/irrigated-crops'

  if ( req.session.data['water_s02_status'] == 'Completed' ){
    // nextUrl = "../water/answers"
  }

  res.render( './' + req.originalUrl,{
    backUrl: backUrl,
    nextUrl: nextUrl
  })

});

router.get('*/water/irrigated-crops', function (req, res) {

  var backUrl = 'irrigated-land'
  var nextUrl = '../water/irrigation-water-source'

  if ( req.session.data['water_s02_status'] == 'Completed' ){
    // nextUrl = "../water/answers"
  }

  res.render( './' + req.originalUrl,{
    backUrl: backUrl,
    nextUrl: nextUrl
  })

});

router.get('*/water/irrigation-water-source', function (req, res) {

  req.session.data['tempIrrigationAnswer'] = req.session.data['irrigationAnswer']
  var backUrl = 'irrigated-crops'
  var nextUrl = '../water/irrigation-water-source-answer'

  if ( req.session.data['water_s02_status'] == 'Completed' ){
    // nextUrl = "../water/answers"
    // backUrl = "../water/answers"
  }

  res.render( './' + req.originalUrl,{
    backUrl: backUrl,
    // nextUrl: nextUrl
  })

});

router.post('*/water/irrigation-water-source-answer', function (req, res) {

  var irrigationTargetAnswer = req.session.data['irrigation-target'];

  if (!!irrigationTargetAnswer && irrigationTargetAnswer.includes("mains")){
    res.redirect('../water/irrigation-water-source-fail')
  }
  else {
    res.redirect('../water/irrigation-systems')
  }

});

router.get('*/water/irrigation-systems', function (req, res) {

  var backUrl = 'irrigation-water-source'
  var nextUrl = '../water/productivity'

  if ( req.session.data['water_s02_status'] == 'Completed' ){
    nextUrl = "../water/answers"
  }

  res.render( './' + req.originalUrl,{
    backUrl: backUrl,
    nextUrl: nextUrl
  })

});

router.get('*/water/productivity', function (req, res) {

  var backUrl = 'irrigation-systems'
  var nextUrl = 'environment'

  if ( req.session.data['water_s02_status'] == 'Completed' ){
    // backUrl = "../water/answers"
    nextUrl = backUrl
  }

  res.render( './' + req.originalUrl,{
    backUrl: backUrl,
    nextUrl: nextUrl
    })

});

router.get('*/water/environment', function (req, res) {

  var backUrl = 'productivity'
  var nextUrl = 'environment-answer'

  if ( req.session.data['water_s02_status'] == 'Completed' ){
    // backUrl = "../water/answers"
    nextUrl = backUrl
  }

  res.render( './' + req.originalUrl,{
    backUrl: backUrl,
    nextUrl: nextUrl
    })

});

router.post('*/water/environment-answer', function (req, res) {

  var tempEnvironmentData = req.session.data['environment'];
  var tempReservoirData = req.session.data['environment-reservoir-options'];

  if (  !!tempEnvironmentData && tempEnvironmentData.includes('Reservoir design') &&
        !!tempReservoirData && tempReservoirData.length > 0
  ) {
    var addEnvData = 'Reservoir design: ['+ tempReservoirData.join(', ') +']';

    tempEnvironmentData = tempEnvironmentData.map(x => (
      x === 'Reservoir design' ?
        addEnvData : x
    ))
  }

  req.session.data['environment-summary'] = tempEnvironmentData;
  res.redirect('../water/collaboration');

});

router.get('*/water/collaboration', function (req, res) {

  var backUrl = 'environment'
  var nextUrl = 'answers'

  if ( req.session.data['water_s02_status'] == 'Completed' ){
    // backUrl = "../water/answers"
    nextUrl = backUrl
  }

  res.render( './' + req.originalUrl,{
    backUrl: backUrl,
    nextUrl: nextUrl
  })

});


router.get('*/water/answers', function (req, res) {

  var backUrl = 'collaboration'
  var nextUrl = 'business'

  res.render( './' + req.originalUrl,{
    backUrl: backUrl,
    nextUrl: nextUrl
  })

});






















router.get('*/water/business', function (req, res) {

  if ( req.session.data['water_s03_status'] != 'Completed' ){
    req.session.data['water_s03_status'] = 'In progress'
    req.session.data['water_s03_status_class'] = 'govuk-tag--blue'
  }

  var backUrl = 'answers'
  var nextUrl = '../water/applying'

  if ( req.session.data['water_s03_status'] == 'Completed' ){
    // backUrl = "../water/check-answers-contact-details"
  }

  res.render( './' + req.originalUrl,{
    backUrl: backUrl,
    nextUrl: nextUrl
  })

});


router.post('*/water/applying-answer', function (req, res) {
  res.redirect('../water/your-details');
});


router.get('*/water/consent', function (req, res) {
  var nextUrl = "reference-number";
  var backUrl = "your-details";

  res.render( './' + req.originalUrl, {
    backUrl: backUrl,
    nextUrl: nextUrl
  })
});

router.get('*/water/reference-number', function (req, res) {
  var backUrl = "consent";

  res.render( './' + req.originalUrl, {
    backUrl: backUrl
  })
});


router.get('*/water/survey', function (req, res) {

  req.session.data['water_completed_sections'] = '3'
  
  req.session.data['water_s03_status'] = 'Completed'
  req.session.data['water_s03_status_class'] = ''
  
    res.render( './' + req.originalUrl, {
      backUrl: res.locals.prevURL
    })
  
  });


  router.get('*/water/email', function (req, res) {
    res.render( './' + req.originalUrl, {
      backUrl: res.locals.prevURL
    })
  });


module.exports = router
