const express = require('express')
const router = express.Router()

const serviceName = 'Check if you can apply for a Farming Transformation Fund slurry acidification grant'

const { storeTypeCost, coverTypeCost, projectItemsCost } = require('../../utils')

//console.log('Service name: ' + serviceName)

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


// Farmer type
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
  const typeCondition = req.session.data.farmertype
   console.log ('typeCondition',typeCondition)

  if (typeCondition.includes('None of the above')) {
    res.redirect('farmer-type-fail')
  }
  else {
  res.redirect('legal-status')
  }

})



// Q: LEGAL STATUS

router.get('/legal-status', function (req, res) {
  var backUrl = 'farmer-type'
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

  else if (planningPermission === 'maybe') {
    res.redirect('planning-required-condition')
  }
  else {
  res.redirect('planning-permission-fail')
  }
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

  var backUrl = 'planning-permission'
  var nextUrl = 'project-start-answer'
  var completedUrl = 'project-start-answer-completed'

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

  if (tenant === 'Yes' || tenant === 'Contractor') {
    res.redirect('project-about')
  } else { res.redirect('tenancy-length') }
})

router.post('/tenancy-length-answer', function (req, res) {
  var tenancyLength = req.session.data['tenancy-length']

  if (tenancyLength === 'No') { res.redirect('tenancy-length-condition') } else { res.redirect('project-about') }
})

router.post('/tenancy-length-answer-completed', function (req, res) {
  res.redirect('answers')
})


// Q: Project about

router.get('/project-about', function (req, res) {
  var backUrl = 'tenancy-answer'
  var nextUrl = 'project-about-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/project-about-answer', function (req, res) {
  var projectAbout = req.session.data['projectabout']

  if (projectAbout === 'else') {
    res.redirect('project-about-fail')
  }
  else {
     res.redirect('calf-weight')
  }
})

  // Q: Calf weight

  router.get('/calf-weight', function (req, res) {
    var backUrl = 'project-about'
    var nextUrl = 'calf-weight-answer'
    var completedUrl = 'answers'

    res.render('./' + req.originalUrl, {
      backUrl,
      nextUrl,
      completedUrl
    })
  })

  router.post('/calf-weight-answer', function (req, res) {
    var calfWeight = req.session.data['calfweight']

    if (calfWeight === '201') {
      res.redirect('calf-weight-fail')
    }
    else {
       res.redirect('calf-weight-route')
    }
})

    // Q: Calf weight route

    router.get('/calf-weight-route', function (req, res) {
      var backUrl = 'calf-weight'
      var nextUrl = 'calf-weight-route-answer'
      var completedUrl = 'answers'

      res.render('./' + req.originalUrl, {
        backUrl,
        nextUrl,
        completedUrl
      })
    })

    router.post('/calf-weight-route-answer', function (req, res) {
      var sqM1 = req.session.data['sqm1']
      var sqM2 = req.session.data['sqm2']
      var sqM3 = req.session.data['sqm3']

      if (sqM1 === 'yes') {
        res.redirect('calf-healthy')
      }
      else if (sqM2 === 'yes') {
        res.redirect('calf-healthy')
      }
      else if (sqM3 === 'yes') {
        res.redirect('calf-healthy')
      }
      else {
         res.redirect('calf-weight-route-fail')
      }
})




  // Q: Calf healthy

        router.get('/calf-healthy', function (req, res) {
          var backUrl = 'calf-weight-route'
          var nextUrl = 'calf-healthy-answer'
          var completedUrl = 'answers'

          res.render('./' + req.originalUrl, {
            backUrl,
            nextUrl,
            completedUrl
          })
        })


        router.post('/calf-healthy-answer', function (req, res) {
          var calfHealthy = req.session.data['calfhealthy']

          if (calfHealthy === 'yes') {
            res.redirect('calf-healthy-fail')
          }
          else {
            res.redirect ('calf-sick')
          }
})

// Q: Calf sick

      router.get('/calf-sick', function (req, res) {
        var backUrl = 'calf-healthy'
        var nextUrl = 'calf-sick-answer'
        var completedUrl = 'answers'

        res.render('./' + req.originalUrl, {
          backUrl,
          nextUrl,
          completedUrl
        })
      })


      router.post('/calf-sick-answer', function (req, res) {
        var calfSick = req.session.data['calfsick']

        if (calfSick === 'no') {
          res.redirect('calf-sick-fail')
        }
        else {
          res.redirect ('flooring-type')
        }
})

// Q: Flooring type

      router.get('/flooring-type', function (req, res) {
        var backUrl = 'calf-sick'
        var nextUrl = 'flooring-type-answer'
        var completedUrl = 'answers'

        res.render('./' + req.originalUrl, {
          backUrl,
          nextUrl,
          completedUrl
        })
      })


      router.post('/flooring-type-answer', function (req, res) {
        var flooringType = req.session.data['flooringtype']

        if (flooringType === 'no') {
          res.redirect('flooring-type-fail')
        }
        else {
          res.redirect ('straw-bedding')
        }
})


// Q: Straw bedding

      router.get('/straw-bedding', function (req, res) {
        var backUrl = 'flooring-type'
        var nextUrl = 'straw-bedding-answer'
        var completedUrl = 'answers'

        res.render('./' + req.originalUrl, {
          backUrl,
          nextUrl,
          completedUrl
        })
      })


      router.post('/straw-bedding-answer', function (req, res) {
        var strawBedding = req.session.data['strawbedding']

        if (strawBedding === 'no') {
          res.redirect('straw-bedding-fail')
        }
        else {
          res.redirect ('enrichment')
        }


      })


      // Q: Enrichment

            router.get('/enrichment', function (req, res) {
              var backUrl = 'straw-bedding'
              var nextUrl = 'enrichment-answer'
              var completedUrl = 'answers'

              res.render('./' + req.originalUrl, {
                backUrl,
                nextUrl,
                completedUrl
              })
            })


            router.post('/enrichment-answer', function (req, res) {
              var enrichment = req.session.data['enrichment']

              if (enrichment === 'no') {
                res.redirect('enrichment-fail')
              }
              else {
                res.redirect ('building-route')
              }




// Note: Routing here is based on 'potentialgrant' session value, which is a hidden value based on input method I've created on page. Calculations happen on page, we're passing a hidden value because of the temporary value stored on page.

router.post('/project-summary-answer', function (req, res) {
  var potentialGrant = req.session.data['potentialgrant']

  if (potentialGrant < 25000 )  { res.redirect('project-summary-fail') } else { res.redirect('potential-grant') }
})

res.render('./' + req.originalUrl, {
  backUrl,
  nextUrl,
  completedUrl,
  storeTypeCost,
  coverTypeCost,
  projectItemsCost
})
})


// Q: Grant
router.get('/potential-grant', function (req, res) {
  var backUrl = 'project-summary'
  var nextUrl = 'remaining-costs'
  var completedUrl = 'grant-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})


// Q: remaining costs
router.get('/remaining-costs', function (req, res) {
  var backUrl = 'potential-grant'
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

  if (remainingCosts === 'no') { res.redirect('remaining-costs-fail') } else { res.redirect('planning-permission') }
})


// answers

router.get('/answers', function (req, res) {

  var backUrl = 'answers-back'
  var nextUrl = 'business'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

router.get('/answers-back', function (req, res) {
  req.session.data.COMPLETED = false
  res.redirect('evidence-summary')
})

// business

router.get('/business', function (req, res) {
  var backUrl = 'tenancy'
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
  var nextUrl = 'consent'
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

// JOURNEY FINISHING
// ***************
// ***************
// ***************
// ***************
