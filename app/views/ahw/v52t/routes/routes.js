const express = require('express')
const router = express.Router()

const serviceName = 'Service name not here defined'
const { groupType } = require('../../utils')


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
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/farmer-type-answer', function (req, res) {
  const typeCondition = req.session.data['farmertype']
  const farmerTypeOptions = [
    'beef',
    'dairy'
  ]
  const eligibleCondition = farmerTypeOptions.some(item =>(typeCondition.includes(item)
  ))
   console.log ('typeCondition',eligibleCondition)

  if (eligibleCondition){
    res.redirect('project-about')
  }

  else {
  res.redirect('farmer-type-fail')
  }

})



// Q: Project about

router.get('/project-about', function (req, res) {
  var backUrl = 'farmer-type'
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
    var calfWeight = req.session.data['sqm1']

    if (calfWeight === 'yes') {
      res.redirect('flooring-type')
    }
    else {
       res.redirect('calf-weight-fail')
    }
})



      // Q: Flooring type

            router.get('/flooring-type', function (req, res) {
              var backUrl = 'calf-weight'
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
                res.redirect ('additional-items')
              }
      })




      // Q: Additional items

      router.get('/additional-items', function (req, res) {
        var backUrl = 'flooring-type'
        var nextUrl = 'additional-items-answer'
        var completedUrl = 'answers'

        res.render('./' + req.originalUrl, {
          backUrl,
          nextUrl,
          completedUrl
        })
      })


      router.post('/additional-items-answer', function (req, res) {
        var additionalItems = req.session.data['additionalitems']

        if (additionalItems === 'yes') {
          res.redirect('solar')
        }

        else {
          res.redirect ('additional-items-fail')
        }
      })





// Q: Solar PV

router.get('/solar', function (req, res) {
var backUrl = 'additional-items'
var nextUrl = 'solar-answer'
var completedUrl = 'answers'

 res.render('./' + req.originalUrl, {
backUrl,
nextUrl,
completedUrl
})
} )


router.post('/solar-answer', function (req, res) {
  var solar = req.session.data['solar']

  if (solar === 'no') {
    res.redirect('solar-fail')
  }

  else {
    res.redirect ('project-cost')
  }

})





// Q: Project cost

router.get('/project-cost', function (req, res) {
  req.session.data.currentProjectCost = req.session.data['project-cost']

  var backUrl = 'solar'
  var nextUrl = 'project-cost-answer'
  var completedUrl = 'answers'


  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/project-cost-answer', function (req, res) {
  var projectCost = req.session.data['project-cost']

  if (projectCost > 1250000 || projectCost < 87500 )  { res.redirect('project-cost-fail') } else { res.redirect('potential-grant') }
})

router.post('/project-cost-answer-completed', function (req, res) {
  var projectCost = req.session.data['project-cost']

  if (projectCost > 12500000 || projectCost < 87500  ) { res.redirect('project-cost-fail') } else { res.redirect('answers') }

})






// Q: Grant
router.get('/potential-grant', function (req, res) {
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
  var backUrl = 'potential-grant'
  var nextUrl = 'remaining-costs-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/remaining-costs-answer', function (req, res) {
  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts === 'no') { res.redirect('remaining-costs-fail') } else { res.redirect('sick-pen') }
})



// SCORING JOURNEY - Q4 Sick pen
router.get('/sick-pen', function (req, res) {
  var backUrl = 'remaining-costs'
  var nextUrl = 'environmental-options'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})


router.post('/environmental-options', function (req, res) {
  var solar2 = req.session.data['solar']

  if (solar2 === 'My roof is exempt') { res.redirect('water-collection') } else { res.redirect('environmental-impact') }
})



// SCORING JOURNEY - Q5 Environmental impact - option 1
router.get('/environmental-impact', function (req, res) {
  var backUrl = 'sick-pen'
  var nextUrl = 'innovation'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})






// SCORING JOURNEY - Q5 Environmental impact - option 2
router.get('/water-collection', function (req, res) {
  var backUrl = 'sick-pen'
  var nextUrl = 'innovation'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})





// SCORING JOURNEY - Q7 Innovation
router.get('/innovation', function (req, res) {
  var backUrl = 'sustainable-materials'
  var nextUrl = 'answers'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})


// Score results - Answers
router.get('/answers', function (req, res) {
  req.session.data.COMPLETED = true

  var backUrl = 'answers-back'
  var nextUrl = '#'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    groupType
  })
})

router.get('/answers-back', function (req, res) {
  req.session.data.COMPLETED = false
  res.redirect('innovation')
})



module.exports = router

// JOURNEY FINISHING
// ***************
// ***************
// ***************
// ***************
