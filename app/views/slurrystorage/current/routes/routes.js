const express = require('express')
const router = express.Router()

const serviceName = 'Check if you can apply for a Farming Transformation Fund slurry acidification grant'

const { storeTypeCost, coverTypeCost, projectItemsCost, separatorTypeCost } = require('../../utils')

console.log('Service name: ' + serviceName)

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

// : Q: Farmer type
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
  var farmerType = req.session.data.farmertype

  if (farmerType === 'Beef' || farmerType === 'Dairy') {
    res.redirect('legal-status')}
  else if (farmerType === 'Pig') {
    res.redirect('intensive-farming-permit')}
  else if (farmerType === 'None of the above') {
    res.redirect('farmer-type-fail')}
})

router.post('/farmer-type-answer-completed', function (req, res) {
    var farmerType = req.session.data.farmertype
})


// : Q: Intensive farming permit
router.get('/intensive-farming-permit', function (req, res) {
  var backUrl = 'farmer-type'
  var nextUrl = 'intensive-farming-permit-answer'
  var completedUrl = 'farmer-type-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/intensive-farming-permit-answer', function (req, res) {
  var intensivePermit = req.session.data.intensivepermit

  if (intensivePermit === 'Yes') { res.redirect('permit-variation') } else { res.redirect('legal-status') }
})

router.post('/intensive-farming-permit-completed', function (req, res) {
    var intensivePermit = req.session.data.intensivepermit
})


// Q: LEGAL STATUS

router.get('/legal-status', function (req, res) {
  var backUrl = req.session.data.intensivepermit === 'Yes' ? 'permit-variation' : 'intensive-farming-permit'
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
    res.redirect('project-start')
  } else {
    res.redirect('country-fail')
  }
})


// PROJECT START

router.get('/project-start', function (req, res) {
  var planningPermission = req.session.data['planning-permission']

  var backUrl = 'country'
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
    res.redirect('system-type')
  } else { res.redirect('project-responsibility') }
})



// Q: Project responsibility

router.get('/project-responsibility', function (req, res) {
  var backUrl = 'tenancy'
  var nextUrl = 'system-type'
  var completedUrl = 'project-responsibility-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})





// : Q: System type
router.get('/system-type', function (req, res) {
  var backUrl = 'tenancy'
  var backUrl = req.session.data ['tenancy'] == 'No' ? 'project-responsibility' : 'tenancy'
  var nextUrl = 'system-type-answer'
  var completedUrl = 'system-type-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/system-type-answer', function (req, res) {
  var systemType = req.session.data.systemtype

  if (systemType === 'no system' || systemType === 'straw-bedded system') { res.redirect('system-type-fail') } else { res.redirect('existing-size-storage') }
})

router.post('/system-type-answer-completed', function (req, res) {
  var systemType = req.session.data.farmertype

  if (systemType === 'I do not have a system') { res.redirect('system-type-fail') } else { res.redirect('answers') }
})



// Q: Existing size Storage

router.get('/existing-size-storage', function (req, res) {
  var backUrl = 'system-type'
  var nextUrl = 'existing-size-storage-answer'
  var completedUrl = 'existing-size-storage-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/existing-size-storage-answer', function (req, res) {
  var existingSize = req.session.data['existing-size-storage']
  var existingSizePig = req.session.data['existing-size-storage-pig']

  if (existingSize === '6 months+ fit' || existingSizePig === '8 months+ fit') {
    res.redirect('existing-size-storage-fail') }

  else if (existingSize === '6 months+ not fit' || existingSizePig === '8 months+ not fit'){
      res.redirect('planned-size-storage') }
  else if (existingSize === '6 months' || existingSizePig === '8 months'){
      res.redirect('planned-size-storage') }
})



// Q: Planned size Storage

router.get('/planned-size-storage', function (req, res) {
  var backUrl = 'existing-size-storage'
  var nextUrl = 'planned-size-storage-answer'
  var completedUrl = 'planned-size-storage-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/planned-size-storage-answer', function (req, res) {
  var plannedSize = req.session.data['planned-size-storage']
  var plannedSizePig = req.session.data['planned-size-storage-pig']

  if (plannedSize === 'Less than 6 months' || plannedSizePig === 'Less than 8 months') {
    res.redirect('planned-size-storage-fail') }

  else if (plannedSize === 'More than 6 months' || plannedSizePig === 'More than 8 months'){
      res.redirect('applying-for') }
  else if (plannedSize === '6 months' || plannedSizePig === '8 months'){
      res.redirect('applying-for') }
  })


// Q: Applying for

router.get('/applying-for', function (req, res) {
  var backUrl = 'planned-size-storage'
  var nextUrl = 'applying-for-answer'
  var completedUrl = 'project-type-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/applying-for-answer', function (req, res) {
  var applyingFor = req.session.data.applyingfor


if (applyingFor === 'Store') {
  res.redirect('project-type')}
else if (applyingFor === 'Cover') {
  res.redirect('existing-fit-for-purpose')}
else if (applyingFor === 'None of the above') {
  res.redirect('applying-for-fail')}
})

// Q: Project type

router.get('/project-type', function (req, res) {
  var backUrl = 'applying-for'
  var nextUrl = 'project-type-answer'
  var completedUrl = 'project-type-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/project-type-answer', function (req, res) {
  var projectType = req.session.data.projecttype

  if (projectType === 'None of the above') { res.redirect('project-type-fail') } else { res.redirect('covers') }
})

// Q: Covers

router.get('/covers', function (req, res) {
  var backUrl = 'project-type'
  var nextUrl = 'covers-answer'
  var completedUrl = 'covers-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/covers-answer', function (req, res) {
  var coversImp = req.session.data.covers


  if (coversImp === 'No') { res.redirect('covers-fail') } else { res.redirect('cover-existing-stores') }
})



// Q: Cover existing stores

router.get('/cover-existing-stores', function (req, res) {
  var backUrl = 'covers'
  var nextUrl = 'cover-existing-stores-answer'
  var completedUrl = 'cover-existing-stores-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/cover-existing-stores-answer', function (req, res) {
  var coverExistingstores = req.session.data.coverexistingstores

  if (coverExistingstores === 'No') { res.redirect('estimate') } else { res.redirect('existing-fit-for-purpose') }
})

// Q: Existing stores - fit for purpose

router.get('/existing-fit-for-purpose', function (req, res) {
  var backUrl = req.session.data ['coverexistingstores'] === 'Yes' ? 'cover-existing-stores' : 'applying-for'
  var nextUrl = 'existing-fit-for-purpose-answer'
  var completedUrl = 'existing-fit-for-purpose-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/existing-fit-for-purpose-answer', function (req, res) {
  var existingFitPurpose = req.session.data.existingfitpurpose
  var applyingFor = req.session.data.applyingfor

if (existingFitPurpose === 'Yes' ) {
res.redirect('estimate')}
  else if (existingFitPurpose === 'No' || applyingFor === 'Cover') {
    res.redirect('existing-fit-for-purpose-fail')}
})



//Estimate  - guidance page
router.get('/estimate', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = req.session.data ['coverexistingstores'] === 'No' ? 'cover-existing-stores' : 'existing-fit-for-purpose'
  var nextUrl = 'standardised-grant-amounts'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})



//Standardised grant amounts - guidance page

router.get('/standardised-grant-amounts', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'estimate'
  var nextUrl = 'standardised-grant-amounts-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    storeTypeCost
  })
})


router.post('/standardised-grant-amounts-answer', function (req, res) {
  var coverOnlyRouting = req.session.data.projecttype

  if (coverOnlyRouting != 'None') { res.redirect('store-type') } else { res.redirect('cover-type') }
})




// Q: Standardised costs - routing embeded in-page

// Q: Store type

router.get('/store-type', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'standardised-grant-amounts'
  var nextUrl = 'store-type-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    storeTypeCost
  })
})

router.post('/store-type-answer', function (req, res) {
  var storeRouting = req.session.data.farmertype

  if (storeRouting === 'Pig') { res.redirect('storage-capacity-increase-pig') } else { res.redirect('storage-capacity-increase') }
})

// Q: Storage capacity increase

router.get('/storage-capacity-increase', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'store-type'
  var nextUrl = 'storage-capacity-increase-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    storeTypeCost
  })
})

router.post('/storage-capacity-increase-answer', function (req, res) {
  var covers = req.session.data['covers']
  var coverExistingStores = req.session.data['coverexistingstores']



  if (covers === 'Yes' || coverExistingStores === 'Yes') {
    res.redirect('cover-type') }
    else if (covers === 'Yes2' || coverExistingStores === 'Yes') {
        res.redirect('cover-type') }
        else if (covers === 'acidification' || coverExistingStores === 'Yes') {
            res.redirect('separator') }

  })




// Q: Storage capacity increase Pig

router.get('/storage-capacity-increase-pig', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'store-type'
  var nextUrl = 'storage-capacity-increase-pig-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    storeTypeCost
  })
})


router.post('/storage-capacity-increase-pig-answer', function (req, res) {
  var covers2 = req.session.data.covers
  var coverExistingStores2 = req.session.data['coverexistingstores']



  if (covers2 === 'Yes' || coverExistingStores2 === 'Yes') {
    res.redirect('cover-type') }
    else if (covers2 === 'Yes2' || coverExistingStores2 === 'Yes') {
        res.redirect('cover-type') }
        else if (covers2 === 'acidification' || coverExistingStores2 === 'Yes') {
            res.redirect('separator') }

  })



// Q: Cover type 1. GRAND-FUNDED STORE

router.get('/cover-type', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = req.session.data.farmertype === 'Pig' ? 'storage-capacity-increase-pig' : 'storage-capacity-increase'
  var nextUrl = 'cover-type-answer'
  var completedUrl = 'cover-type-completed'

  // Note: Routing here is based on - if user selected 'None of the above'

  router.post('/cover-type-answer', function (req, res) {
    var covers3 = req.session.data ['covers']
    var coverExistingStore3 = req.session.data ['coverexistingstores']


    if (coverExistingStore3 === 'No')  {res.redirect('cover-size') } else  {res.redirect('cover-type2')}
  })


  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    coverTypeCost,
    storeTypeCost
  })
})


// Q: Cover type 2. existing STORE

router.get('/cover-type2', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'cover-type'
  var nextUrl = 'cover-size2'
  var completedUrl = 'cover-size2-completed'



  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    coverTypeCost,
    storeTypeCost
  })
})

// Q: Cover size

router.get('/cover-size', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'cover-type'
  var nextUrl = 'separator'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    coverTypeCost,
    storeTypeCost
  })
})

// Q: Cover size 2

router.get('/cover-size2', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'cover-type2'
  var nextUrl = 'separator'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    coverTypeCost,
    storeTypeCost
  })
})

// Q: Separator

router.get('/separator', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'cover-type2'
  var backUrl = req.session.data ['cover-size2']  ? 'cover-size2' : 'cover-size'
  var nextUrl = 'separator-answer'
  var completedUrl = 'answers'


    router.post('/separator-answer', function (req, res) {
      var separator = req.session.data ['separator']

      if (separator === 'Yes')  {res.redirect('separator-options') } else  {res.redirect('project-items')}
    })



  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    coverTypeCost,
    storeTypeCost
  })
})

// Q: Cover size 2

router.get('/separator-options2', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'cover-type2'
  var nextUrl = 'separator'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    coverTypeCost,
    storeTypeCost,
    separatorTypeCost

  })
})

// Q: Other items

router.get('/project-items', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'separator'
  var nextUrl = 'project-items-answer'
  var completedUrl = 'project-items-completed'

  // Note: Routing here is based on - if user selected 'None of the above'

  router.post('/project-items-answer', function (req, res) {
    var otherItems = req.session.data ['projectitems']

    if (otherItems != 'none')  { res.redirect('item-sizes-quantities') } else { res.redirect('project-summary') }
  })



  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    coverTypeCost,
    storeTypeCost,
    projectItemsCost


  })
})

// Q: Item sizes and quantities

router.get('/item-sizes-quantities', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'project-items'
  var nextUrl = 'project-summary'
  var completedUrl = 'item-sizes-quantities-completed'


  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl,
    storeTypeCost,
    coverTypeCost,
    projectItemsCost
  })
})

// Q: Project summary

router.get('/project-summary', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'project-summary-back'
  var nextUrl = 'project-summary-answer'
  var completedUrl = 'estimate'

// Note: Back button - is routing here is based on 'potentialgrant'
  router.post('/project-summary-back', function (req, res) {
    var otherItems = req.session.data ['projectitems']
    if (otherItems != 'none')  { res.redirect('project-items') } else { res.redirect('item-sizes-quantities') }
  })



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
  separatorTypeCost,
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




// PLANNING PERMISSION

router.get('/planning-permission', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'remaining-costs'
  var nextUrl = 'planning-permission-answer'
  var completedUrl = 'evidence-summary'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// PLANNING PERMISSION COMPLETED
router.post('/planning-permission-answer', function (req, res) {
  var planningPermission = req.session.data['planning-permission']

  if (planningPermission === 'Approved' || planningPermission === 'Applied') {
    res.redirect('planning-list')
  }

  if (planningPermission === 'Not yet applied') {
    res.redirect('planning-required-condition')
  }

  res.redirect('os-grid')
})

// PLANNING PERMISSION CONDITION
router.get('/planning-required-condition', function (req, res) {
  var backUrl = 'planning-permission'
  var nextUrl = 'os-grid'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

// Planning list
router.get('/planning-list', function (req, res) {
  var backUrl = 'planning-permission'
  var nextUrl = 'os-grid'
  var completedUrl = 'evidence-summary'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})



// OS grid
router.get('/os-grid', function (req, res) {
  var backUrl = 'planning-permission'
  var nextUrl = 'evidence-summary'
  var completedUrl = 'evidence-summary'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

// evidence summary
router.get('/evidence-summary', function (req, res) {
  req.session.data.COMPLETED = true

  var backUrl = 'os-grid'
  var nextUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
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

// contractor-details
router.get('/contractor-details', function (req, res) {
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

// JOURNEY FINISHING
// ***************
// ***************
// ***************
// ***************
