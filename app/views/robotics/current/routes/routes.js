const express = require('express')
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const serviceName = 'Check if you can apply for a Farming Transformation Fund slurry acidification grant'

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

router.post('/farming-type-answer', function (req, res) {
  var farmingType = req.session.data['farming-type']

  if (farmingType === 'Robotics and automatic technology') {
    res.redirect('who-are-you')
  } else {
    res.redirect('who-are-you')
  }
})



//: Q: Who are you

router.get('/who-are-you', function (req, res) {
  var backUrl = 'farming-type'
  var nextUrl = 'who-are-you-answer'
  var completedUrl = 'farming-type-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/who-are-you-answer', function (req, res) {
  var whoisthisUser = req.session.data['who-are-you']
  var farmingType = req.session.data['farming-type']

  if (whoisthisUser === 'farmer') {
    res.redirect('legal-status')
  } else if (whoisthisUser === 'contractor' && farmingType == 'Solar') {
    res.redirect('contractor-fail')
  } else {
    res.redirect('register')
  }
})






//: Q: Registered in England?
router.get('/register', function (req, res) {
  var backUrl = 'who-are-you'
  var nextUrl = 'register-answer'
  var completedUrl = 'register-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/register-answer', function (req, res) {
  var registerEngland = req.session.data['register']

  if (registerEngland === 'yes') {
    res.redirect('legal-status')
  } else {
    res.redirect('register-fail')
  }
})


// Q: LEGAL STATUS

router.get('/legal-status', function (req, res) {
  var backUrl = "register"
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
  var identityUser = req.session.data['who-are-you']

  if (legalStatus === 'None') { res.redirect('legal-status-fail') }
  else if (identityUser === 'contractor') {
    { res.redirect('planning-permission') }
  }
   else {
  res.redirect('country')}

})

router.post('/legal-status-answer-completed', function (req, res) {
  var legalStatus = req.session.data['legal-status']

  if (legalStatus === 'None') { res.redirect('legal-status-fail') } else { res.redirect('answers') }
})


// Model to build if, else if and else structure.
// if (planningPermission === 'Not needed' || planningPermission === 'Secured') {
//  backUrl = 'planning-permission'
//  } else if (planningPermission === 'maybe') {
//   backUrl = 'planning-required-condition'
//  } else {
//   backUrl = 'planning-permission-fail'
//  }






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
  else if (planningPermission === 'No'){
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

  var backUrl
  var nextUrl = 'project-start-answer'
  var completedUrl = 'project-start-answer-completed'


  if (planningPermission === 'Not needed' || planningPermission === 'Secured'){
    backUrl = 'planning-permission'
  } else if (planningPermission === 'maybe') {
    backUrl = 'planning-required-condition'
  }
  else {
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
  var identityUser = req.session.data['who-are-you']

  if (projectStart === 'project work')
  { res.redirect('project-start-fail') }
 else if (identityUser === 'contractor')
  { res.redirect('project-items') }
  else { res.redirect('tenancy') }
})

router.post('/project-start-answer-completed', function (req, res) {
  var projectStart = req.session.data['project-start']

  if (projectStart === 'project work') { res.redirect('project-start-fail') } else { res.redirect('answers') }
})

// Q: Tenancy - modified 2 October 2023, changing tenancy length to project responsibility.

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
  var tenant = req.session.data['tenancy']
  var farmingType = req.session.data['farming-type']

  if (tenant === 'Yes' && farmingType == 'Robotics and automatic technology') {
    res.redirect('project-items')
  } else if (tenant === 'Yes' && farmingType == 'Solar') {
    res.redirect('solar-existing-system')
  } else { 
    res.redirect('project-responsibility') }
})


router.get('/project-responsibility', function (req, res) {
  var backUrl = 'tenancy'
  var nextUrl = 'project-responsibility-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/project-responsibility-answer', function (req, res) {
  var projectResponsibility = req.session.data['project-responsibility']
  var farmingType = req.session.data['farming-type']

  if (projectResponsibility == 'Yes' && farmingType == 'Robotics and automatic technology') {
    res.redirect('project-items')
  } else if (projectResponsibility == 'Yes' && farmingType == 'Solar') {
    res.redirect('solar-existing-system')
  } else { res.redirect('project-items') }
})


router.post('/tenancy-length-condition-answer', function (req, res) {  
  var farmingType = req.session.data['farming-type']

  if (farmingType == 'Robotics and automatic technology') {
    res.redirect('project-items')
  } else { res.redirect('solar-existing-system') }
})





/*
router.post('/tenancy-length-answer', function (req, res) {
  var tenancyLength = req.session.data['tenancy-length']

  if (tenancyLength === 'No') { res.redirect('tenancy-length-condition') } else { res.redirect('project-items') }
})

router.post('/tenancy-length-answer-completed', function (req, res) {
  res.redirect('answers')
})
*/


// Q: Project items (1)

router.get('/project-items', function (req, res) {
  var backUrl = 'tenancy'
  var nextUrl = 'project-items-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/project-items-answer', function (req, res) {
  var projectItems = req.session.data['project-items']

  if (projectItems.includes("Robotic or automatic technology")) {
    res.redirect('robotic-items')
  } else { res.redirect('project-cost') }
})





// Choose which robotic or automatic technology type

router.get('/robotic-items', function (req, res) {
  var backUrl = 'project-items'
  var nextUrl = 'robotic-items-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})


router.post('/robotic-items-answer', function (req, res) {
  
  var roboticEquipment = req.session.data['robotic-equipment']
  
  if (roboticEquipment == "Driverless robotic tractor or platform"){    
    res.redirect('robotic-eligibility')
  } else {    
    res.redirect('equipment-type')
  }
})

// Choose if item is robotic or automatic

router.get('/equipment-type', function (req, res) {
  var backUrl = 'robotic-items'
  var nextUrl = 'equipment-type-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/equipment-type-answer', function (req, res) {

  var equipmentType = req.session.data['equipment-type']
  
  if (equipmentType == 'Robotic'){    
    res.redirect('robotic-eligibility')
  } else {    
    res.redirect('equipment-eligibility')
  }
})

router.post('/robotic-eligibility-answer', function (req, res) {

  var roboticEquipment = req.session.data['robotic-equipment']
  var roboticEligibility = req.session.data['robotic-eligibility']
  
  if (roboticEligibility == "no") {    
    res.redirect('robotic-eligibility-fail')
  } else {
    res.redirect('technology-description')
  }
})


/*
router.post('/robotic-eligibility-answer', function (req, res) {

  var addItem = req.session.data['add-item']
  var roboticEquipment = req.session.data['robotic-equipment']
  var roboticEligibility = req.session.data['robotic-eligibility']
  
  if (roboticEligibility == "no") {    
    res.redirect('robotic-eligibility-fail')
  } else if (roboticEligibility == 'yes' && addItem == 'Yes'){    
    res.redirect('project-items-summary')
  } else if (roboticEligibility == 'yes' && roboticEquipment == 'Other technology'){    
      res.redirect('other-robotic-equipment')
  } else {
    res.redirect('add-item')
  }
})
*/


router.get('/equipment-eligibility', function (req, res) {
  var backUrl = '#'
  var nextUrl = 'equipment-eligibility-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})


router.post('/equipment-eligibility-answer', function (req, res) {  
  
  var roboticEquipment = req.session.data['robotic-equipment']
  var equipmentEligibility = req.session.data['equipment-eligibility']

  if (equipmentEligibility.length < 2 || equipmentEligibility.includes("None")){
    res.redirect('technology-criteria-fail')
  } else {    
    res.redirect('technology-description')
  }
})


/*
router.post('/equipment-eligibility-answer', function (req, res) {
  
  var addItem = req.session.data['add-item']
  var roboticEquipment = req.session.data['robotic-equipment']
  var equipmentEligibility = req.session.data['equipment-eligibility']

  if (equipmentEligibility.length < 2 || equipmentEligibility.includes("None")){
    res.redirect('technology-criteria-fail')
  } else if (addItem == 'Yes'){    
    res.redirect('project-items-summary')
  } else if (roboticEquipment == 'Other technology'){    
    res.redirect('other-robotic-equipment')
  } else {    
    res.redirect('add-item')
  }
})
*/

router.post('/technology-description-answer', function (req, res) {
  
  var addItem = req.session.data['add-item']
 

  if (addItem == 'Yes'){
    res.redirect('project-items-summary')
  } else {    
    res.redirect('add-item')
  }
})


// Do you want to add another item?

router.get('/add-item', function (req, res) {
  var backUrl = '#'
  var nextUrl = 'add-item-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/add-item-answer', function (req, res) {
  
  var addItem = req.session.data['add-item']
  
  if (addItem == "Yes"){    
    res.redirect('robotic-items')
  } else {    
    res.redirect('technology-conditional')
  }
})





router.get('/project-items-summary', function (req, res) {
  var backUrl = 'equipment-eligibility'
  var nextUrl = 'technology-conditional'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})


router.post('/remove-item-answer', function (req, res) {
  
  var removeItem = req.session.data['remove-item']
  
  if (removeItem == "Yes"){    
    res.redirect('project-items-summary')
  } else {    
    res.redirect('project-items-summary')
  }
})



/*

router.post('/project-items-answer', function (req, res) {
  var projectItems1 = req.session.data['robotic-equipment2']
  const roboticEquipment3 = req.session.data ['robotic-equipment2']

  const otherRoboticEquipmentOptions2 = [
    'Robotic equipment item'
  ]

  const otherRoboticEquipmentCond2 = otherRoboticEquipmentOptions2.some(otherRoboticItem22 => (
    roboticEquipment3.includes(otherRoboticItem22)
    ))

  if (otherRoboticEquipmentCond2) {
    res.redirect ('project-items2')
  }
  res.redirect('project-cost')
})

*/

// Q: Flow 1 to 4

router.get('/project-items2', function (req, res) {
  var backUrl = 'project-items'
  var nextUrl = 'project-items2-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/project-items2-answer', function (req, res) {
  var projectItems = req.session.data['robotic-equipment']
  const roboticEquipment2 = req.session.data ['robotic-equipment']

  const otherRoboticEquipmentOptions = [
    'Other robotic equipment'
  ]

  const otherRoboticEquipmentCond = otherRoboticEquipmentOptions.some(otherRoboticItem => (
    roboticEquipment2.includes(otherRoboticItem)
    ))

  if (otherRoboticEquipmentCond) {
    res.redirect ('other-robotic-equipment')
  }
  res.redirect('project-cost')
})




// Q: Other robotic equipment (2)

router.get('/other-robotic-equipment', function (req, res) {
  
  var nextUrl = 'other-robotic-conditional'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    
    nextUrl,
    completedUrl
  })
})


router.post('/other-robotic-conditional-answer', function (req, res) {
  
  var addItem = req.session.data['add-item']
  
  if (addItem == 'Yes'){    
    res.redirect('project-items-summary')
  } else {    
    res.redirect('add-item')
  }
})




/*

router.post('/other-robotic-equipment-answer', function (req, res) {
  var otherRoboticRadio = req.session.data['other-robotic-radio']
  var projectItems = req.session.data['robotic-equipment']
  var projectItemsPage1 = req.session.data['robotic-equipment2']


  if (otherRoboticRadio === 'no'){
    if (
      projectItems.includes('Other robotic equipment') &&
      (typeof(projectItems) === 'string' ||
      (typeof(projectItems) === 'object' && projectItems.length === 1)
    )){
      res.redirect('other-robotic-fail')
    } else if (
      projectItems.includes('Other robotic equipment') &&
      (
        (typeof(projectItems) === 'object' && projectItems.length > 1)
      )
    ){
      res.redirect('other-robotic-fail2')
    }
    //  res.redirect('other-robotic-conditional') //If yes and Other and all items
                                          //If no and Other and all items

 }

 else {
   if (projectItems.includes('Other robotic equipment')){
     res.redirect('other-robotic-conditional')
   }
   //  res.redirect('other-robotic-conditional') //If yes and Other and all items
                                         //If no and Other and all items

}

  //if (otherRoboticRadio === 'no') { res.redirect('other-robotic-fail') } else { res.redirect('other-robotic-conditional') }
})

*/

// Q: Other robotic conditional (3)

router.get('/other-robotic-conditional', function (req, res) {
  var backUrl = 'other-robotic-equipment'
  var nextUrl = 'add-item'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})


// Q: Other robotic conditional (3)

router.get('/other-robotic-fail2', function (req, res) {
  var backUrl = 'other-robotic-equipment'
  var nextUrl = 'project-cost'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})


// Q: Project cost (4)

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

  if (projectCost < 87500)   { res.redirect('project-cost-fail') } else { res.redirect('grant') }
})

router.post('/project-cost-answer-completed', function (req, res) {
  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500)   { res.redirect('project-cost-fail') } else { res.redirect('answers') }
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
  var projectItems = req.session.data['project-items']

  if (remainingCosts === 'no') { 
    res.redirect('remaining-costs-fail') 
  } else if (remainingCosts == 'yes' && projectItems.includes ("Robotic or automatic technology")) {
    res.redirect('improve-productivity')
  } else { res.redirect('energy-source') } 
})




router.post('/remaining-costs-answer-completed', function (req, res) {
  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts === 'no') {res.redirect('remaining-costs-fail')} else {res.redirect('answers')}
})



router.post('/improve-productivity-answer', function (req, res) {
  var improveProductivity = req.session.data['improve-productivity']

  if (improveProductivity == "Yes") {
    res.redirect('project-impact')
  } else { 
    res.redirect('project-impact') }
})



// PROJECT IMPACT (ROBOTICS) and Wider farming condition
router.get('/project-impact', function (req, res) {
  var backUrl = 'remaining-costs'
  var nextUrl = 'project-impact-answer'
  var completedUrl = 'answers'

 res.render('./' + req.originalUrl, {
  backUrl,
  nextUrl,
  completedUrl
})
})

router.post('/project-impact-answer', function (req, res) {
  var projectImpact = req.session.data['project-impact']

  if (projectImpact == 'no') 
    { res.redirect('project-impact-fail') }

    else { res.redirect('energy-source') }
  
})




/*

router.post('/project-impact-answer', function (req, res) {
  var projectImpact = req.session.data['project-impact']

  if (projectImpact !== 'yes') {res.redirect('project-impact-fail')}
  const roboticEquipment = req.session.data ['robotic-equipment']

  const widerFarmingOptions = [
    'Harvesting equipment',
    'Weeding equipment',
    'Spraying equipment',
    'Driverless tractor or platform',
    'Voluntary robotic milking system',
    'Feeding system',
    'Transplanting',
    'Other robotic equipment'
  ]

  const widerFarmingCond = widerFarmingOptions.some(widerFarmingItem => (
    roboticEquipment.includes(widerFarmingItem)
    ))

  if (widerFarmingCond) {
    res.redirect ('wider-farming')
  }
  res.redirect('energy-source')
})*/




// Wider farming
router.get('/wider-farming', function (req, res) {
  var backUrl = 'project-impact'
  var nextUrl = 'energy-source'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})


// Energy source
router.get('/energy-source', function (req, res) {
  var backUrl = 'project-impact'
  var nextUrl = 'energy-source-answer'
  var completedUrl = 'answers'


  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/energy-source-answer', function (req, res) {
  var energySource = req.session.data['energy-source']

  if (energySource.includes ("fossil fuels")) 
    { res.redirect('fossil-fuel-eligibility') }

    else { res.redirect('agricultural-sector') }
  
})

router.get('/fossil-fuel-eligibility', function (req, res) {
  var backUrl = 'energy-source'
  var nextUrl = 'agricultural-sector'
  var completedUrl = 'answers'


  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// Agricultural sector
router.get('/agricultural-sector', function (req, res) {

  var nextUrl = 'agricultural-sector-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    
    nextUrl,
    completedUrl
  })
})

router.post('/agricultural-sector-answer', function (req, res) {
  var farmingType = req.session.data['farming-type']

  if (farmingType == "Solar") {
    res.redirect('answers')
  } else { 
    res.redirect('introducing-innovation') }
})


// INTRODUCING INNOVATION (ROBOTICS)
router.get('/introducing-innovation', function (req, res) {
  var backUrl = 'agricultural-sector'
  var nextUrl = 'labour-saved'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// Labour saved (ROBOTICS)
router.get('/labour-saved', function (req, res) {
  var backUrl = 'introducing-innovation'
  var nextUrl = 'answers'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})



// Solar journey

router.post('/solar-existing-answer', function (req, res) {
  var existingSystem = req.session.data['existing-system']

  if (existingSystem == "no") {
    res.redirect('solar-technology')
  } else { 
    res.redirect('solar-technology') }
})


router.post('/solar-technology-answer', function (req, res) {
  var solarTechnology = req.session.data['solar-technology']
  var existingSystem = req.session.data['existing-system']

  if (solarTechnology.includes ("panels")) {
    res.redirect('solar-installation')
  } else if (!solarTechnology.includes ("panels") && existingSystem == "no") {
    res.redirect('solar-technology-fail')
  } else { 
    res.redirect('solar-cost') }
})


router.post('/solar-installation-answer', function (req, res) {
  var solarInstallation = req.session.data['solar-installation']

  if (solarInstallation.includes ("none")) {
    res.redirect('solar-panel-fail')
  } else { 
    res.redirect('solar-system-size') }
})

router.post('/solar-cost-answer', function (req, res) {
  var solarCost = req.session.data['solar-cost']

  if (solarCost < 60000) { 
    res.redirect('solar-cost-fail') 
  } else { 
    res.redirect('potential-grant') }
})

router.post('/solar-remaining-costs-answer', function (req, res) {
  var solarRemainingCost = req.session.data['solar-remaining-costs']

  if (solarRemainingCost == "no") {
    res.redirect('remaining-costs-fail')
  } else { 
    res.redirect('agricultural-sector') }
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
  res.redirect('introducing-innovation')
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

  var applicantUser = req.session.data['applicant']
  var identityUser = req.session.data['who-are-you']

  if (identityUser === 'farmer' && applicantUser === 'Applicant') {
    res.redirect('farmer-details')
  }

  else if (identityUser === 'contractor' && applicantUser === 'Applicant') {
    res.redirect('contractor-details')
  }

  else

  res.redirect('agent-details')
})




// Model to build if, else if and else structure.
// if (planningPermission === 'Not needed' || planningPermission === 'Secured') {
//  backUrl = 'planning-permission'
//  } else if (planningPermission === 'maybe') {
//   backUrl = 'planning-required-condition'
//  } else {
//   backUrl = 'planning-permission-fail'
//  }







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
  var identityUser = req.session.data['who-are-you']

if (identityUser === 'contractor') {
  res.redirect('contractor-details')
} else { res.redirect('farmer-details') }
})



// farmer-details
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
