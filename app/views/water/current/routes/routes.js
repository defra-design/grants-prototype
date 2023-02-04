const express = require('express')
const router = express.Router()

const serviceName = 'Apply for a large grant for a water resource management project'

console.log('Service name: ' + serviceName)

router.get('/start', function (req, res) {
  // =================================
  req.session.data = {
    COMPLETED: false,
    DETAILS: false
  }
  // =================================

  var nextUrl = 'farming-type'

  res.render('./' + req.originalUrl, {
    nextUrl
  })
})

router.get('/farming-type', function (req, res) {
  var backUrl = 'start'
  var nextUrl = 'farming-type-answer'
  var completedUrl = 'farming-type-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.get('/farming-type-answer', function (req, res) {
  var farmingType = req.session.data['farming-type']
  var farmingTypeOther = req.session.data['farming-type-other-options']

  if (!!farmingType && farmingType === 'Something else') {
    res.redirect('farming-type-fail')
  }
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

router.get('/farming-type-answer-completed', function (req, res) {
  var farmingType = req.session.data['farming-type']
  var farmingTypeOther = req.session.data['farming-type-other-options']

  if (!!farmingType && farmingType === 'Something else') {
    res.redirect('farming-type-fail')
  }

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

router.get('/legal-status', function (req, res) {
  var backUrl = 'farming-type'
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
    res.redirect('planning-permission')
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

  if (tenant === 'Yes') {
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

router.get('/project-items', function (req, res) {
  var backUrl = 'tenancy-length'
  var nextUrl = 'project-cost'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})



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

router.get('/project-cost', function (req, res) {
  req.session.data.currentProjectCost = req.session.data['project-cost']

  var backUrl = 'project-items'
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

  if (projectCost < 87500) { res.redirect('project-cost-fail') } else { res.redirect('grant') }
})

router.post('/project-cost-answer-completed', function (req, res) {
  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500) { res.redirect('project-cost-fail') } else { res.redirect('answers') }
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

  if (remainingCosts === 'no') { res.redirect('remaining-costs-fail') } else { res.redirect('water-SSSI') }
})

router.post('/remaining-costs-answer-completed', function (req, res) {
  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts === 'no') { res.redirect('remaining-costs-fail') } else { res.redirect('answers') }
})

// Water SSSI

router.get('/water-SSSI', function (req, res) {
  var nextUrl = 'abstraction-licence'
  var backUrl = 'remaining-costs'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// ABSTRACTION LICENCE

router.get('/abstraction-licence', function (req, res) {
  var backUrl = 'water-SSSI'
  var nextUrl = 'abstraction-licence-answer-completed'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// ABSTRACTION LICENCE COMPLETED

router.post('/abstraction-licence-answer-completed', function (req, res) {
  var abstractionLicence = req.session.data['abstraction-licence']

  if (abstractionLicence === 'Not needed' || abstractionLicence === 'Secured') {
    res.redirect('current-irrigating')
  }

  res.redirect('abstraction-required-condition')
})

// ABSTRACTION LICENCE CONDITION
router.get('/abstraction-required-condition', function (req, res) {
  var backUrl = 'abstraction-licence'
  var nextUrl = 'current-irrigating'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})






// Change summer abstraction

router.get('/change-summerabs', function (req, res) {
  var backUrl = 'current-irrigating'
  var nextUrl = 'change-summerabs-answer'
  var completedUrl = 'answers'

  router.get('/change-summerabs-answer', function (req, res) {
    var changeSummerabs = req.session.data['change-summerabs']
    var irrigation = req.session.data['current-irrigating']
    if (changeSummerabs === 'no' && irrigation === 'Yes') { res.redirect('water-source-2') }
    if (changeSummerabs === 'no') { res.redirect('water-source') }
    else { res.redirect('summerabs-fail') }
  })


  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})



//NEW Summer abs routing
router.get('/water-source-2', function (req, res) {
  var backUrl = 'abstraction-license'
  var nextUrl = 'water-source-2-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})


  router.get('/water-source-2-answer', function (req, res) {
    const ws2Current = req.session.data ['water-source-2-current']
    const ws2Target = req.session.data ['water-source-2-target']

    const currentOptions1 = [
      'summer abs current'
    ]
    const currentOptions2 = [
      'mains current'
    ]
    const targetOptions1 = [
      'summer abs target'
    ]
    const targetOptions2 = [
      'mains target'
    ]
    const targetOptions3 = [
      'summer abs target',
      'mains target'
    ]
    const currentOptions3 = [
      'summer abs current',
      'mains current'
    ]




    const currentCondition1 =
    (currentOptions1.some(item => ws2Current.includes(item)
    ))
    const targetCondition1 =
    (targetOptions1.some(item => ws2Target.includes(item)
    ))
    const currentCondition2 =
    (currentOptions2.some(item => ws2Current.includes(item)
    ))
    const targetCondition2 =
    (targetOptions2.some(item => ws2Target.includes(item)
    ))
    const currentCondition3 =
    (currentOptions3.every(item => ws2Current.includes(item)
    ))
    const targetCondition3 =
    (targetOptions3.every(item => ws2Target.includes(item)
    ))
    const targetCondition4 =
    (targetOptions3.some(item => ws2Target.includes(item)
    ))




    if (currentCondition3 && targetCondition3) {
      res.redirect ('unsustainable-watersource')
    }
    if (currentCondition3 && targetCondition2) {
      res.redirect ('mains-only')
    }
    if (currentCondition2 && targetCondition2) {
      res.redirect ('mains-only')
    }
    if (currentCondition3 && targetCondition1) {
      res.redirect ('summerabs-only')
    }
    if (currentCondition1 && targetCondition1) {
      res.redirect ('summerabs-only')
    }
    if (currentCondition2 && targetCondition1) {
      res.redirect ('water-source-2-error')
    }
    if (ws2Current !== 'summer abs current' && ws2Current !== 'mains current' && targetCondition4){
      res.redirect ('water-source-2-error')
    }
    if (currentCondition1 && targetCondition2) {
      res.redirect ('water-source-2-error')
    }


    res.redirect('irrigation-systems')
    })




    //ERROR validation
    router.get('/water-source-2-error', function (req, res) {
      var backUrl = 'water-source-2'
      var nextUrl = 'water-source-2-error-answer'
      var completedUrl = 'answers'

      res.render('./' + req.originalUrl, {
        backUrl,
        nextUrl,
        completedUrl
      })
    })

    router.get('/water-source-2-error-answer', function (req, res) {
      const ws2Current = req.session.data ['water-source-2-current']
      const ws2Target = req.session.data ['water-source-2-target']

      const currentOptions1 = [
        'summer abs current'
      ]
      const currentOptions2 = [
        'mains current'
      ]
      const targetOptions1 = [
        'summer abs target'
      ]
      const targetOptions2 = [
        'mains target'
      ]
      const targetOptions3 = [
        'summer abs target',
        'mains target'
      ]
      const currentOptions3 = [
        'summer abs current',
        'mains current'
      ]



      const currentCondition1 =
      (currentOptions1.some(item => ws2Current.includes(item)
      ))
      const targetCondition1 =
      (targetOptions1.some(item => ws2Target.includes(item)
      ))
      const currentCondition2 =
      (currentOptions2.some(item => ws2Current.includes(item)
      ))
      const targetCondition2 =
      (targetOptions2.some(item => ws2Target.includes(item)
      ))
      const currentCondition3 =
      (currentOptions3.every(item => ws2Current.includes(item)
      ))
      const targetCondition3 =
      (targetOptions3.every(item => ws2Target.includes(item)
      ))
      const targetCondition4 =
      (targetOptions3.some(item => ws2Target.includes(item)
      ))


      if (currentCondition3 && targetCondition3) {
        res.redirect ('unsustainable-watersource')
      }
      if (currentCondition3 && targetCondition2) {
        res.redirect ('mains-only')
      }
      if (currentCondition2 && targetCondition2) {
        res.redirect ('mains-only')
      }
      if (currentCondition3 && targetCondition1) {
        res.redirect ('summerabs-only')
      }
      if (currentCondition1 && targetCondition1) {
        res.redirect ('summerabs-only')
      }
      if (currentCondition2 && targetCondition1) {
        res.redirect ('water-source-2-error')
      }
      if (ws2Current !== 'summer abs current' && ws2Current !== 'mains current' && targetCondition4){
        res.redirect ('water-source-2-error')
      }
      if (currentCondition1 && targetCondition2) {
        res.redirect ('water-source-2-error')
      }
      if (currentCondition1 && targetCondition1) {
        res.redirect ('summerabs-only')
      }

      res.redirect('irrigation-systems')
      })




// Water source

router.get('/water-source', function (req, res) {
  req.session.data.tempIrrigationAnswer = req.session.data.irrigationAnswer
  var backUrl = 'change-summerabs'
  var nextUrl = 'water-source-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/water-source-answer', function (req, res) {
  res.redirect('irrigation-system')
})





// Irrigation system (Happy path - the future)

router.get('/irrigation-system', function (req, res) {
  var backUrl = 'water-source'
  var nextUrl = 'irrigated-crops'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// Irrigation-systems (Present and Future)

router.get('/irrigation-systems', function (req, res) {
  var data1 = req.session.data['water-source-1-current']
  var data2 = req.session.data['water-source-2-current']
  var data3 = req.session.data['water-source-3-current']
  var data4 = req.session.data['water-source-4-current']
  var data5 = req.session.data['water-source-5-current']
  var backUrl
  var nextUrl = 'irrigated-crops'
  var completedUrl = 'answers'
  if (data1) { backUrl = 'water-source-1' }
  if (data2) { backUrl = 'water-source-2' }
  if (data3) { backUrl = 'water-source-3' }
  if (data4) { backUrl = 'water-source-4' }
  if (data5) { backUrl = 'water-source-5' }

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})


// Summerabs fail (backURL)

router.get('/summerabs-fail', function (req, res) {
  var data = req.session.data['current-irrigating']
  var backUrl
  var nextUrl
  var completedUrl = 'answers'

  if (data === 'Yes') { backUrl = 'change-summerabs-yes' } else { backUrl = 'change-summerabs' }


  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// irrigated-crops (Happy path - the future)

router.get('/irrigated-crops', function (req, res) {
  var data = req.session.data['current-irrigating']
  var backUrl
  var nextUrl
  var completedUrl = 'answers'

  if (data === 'Yes') { nextUrl = 'irrigated-land' } else { nextUrl = 'irrigated-land-future' }
  if (data === 'Yes') { backUrl = 'irrigation-systems' } else { backUrl = 'irrigation-system' }


  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// Irrigated-land

router.get('/irrigated-land', function (req, res) {
  var backUrl = 'irrigated-crops'
  var nextUrl = 'productivity'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// Irrigated-land future (Happy path - the future)

router.get('/irrigated-land-future', function (req, res) {
  var backUrl = 'irrigated-crops'
  var nextUrl = 'productivity'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})



// productivity
router.get('/productivity', function (req, res) {
  var data = req.session.data['current-irrigating']
  var backUrl
  var nextUrl = 'collaboration'
  var completedUrl = 'answers'
  if (data === 'Yes') { backUrl = 'irrigated-land' } else { backUrl = 'irrigated-land-future' }

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// collaboration

router.get('/collaboration', function (req, res) {
  var backUrl = 'productivity'
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
  res.redirect('collaboration')
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

  if (applicant === 'Agent') {
    res.redirect('agent-details')
  }

  res.redirect('farmer-details')
})

router.get('/agent-details', function (req, res) {
  var backUrl = 'applying'
  var nextUrl = 'farmer-details'
  var detailsUrl = 'check-details'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    detailsUrl
  })
})

router.get('/farmer-details', function (req, res) {
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
  res.redirect('farmer-details')
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
