const express = require('express')
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const serviceName = 'Check if you can apply for a Farming Transformation Fund slurry acidification grant'

console.log('Service name: ' + serviceName)

// Select Poultry Type

router.post('/poultry-type-answer', function (req, res) {
    var poultryType = req.session.data['poultry-type']

    if (poultryType.includes ("hens")) {
        res.redirect('hen-project-type')
    } else if (poultryType.includes ("pullets")) {
        res.redirect('pullet-project-type')
    } else { 
        res.redirect('kickout') }
    })

// Select Project Type 

router.post('/hen-project-type-answer', function (req, res) {
    var henProjectType = req.session.data['hen-project-type']

    if (henProjectType == "new") {
        res.redirect('hen-building-items')
    } else if (henProjectType == "refurbishing") {
        res.redirect('hen-building-items')
    } else if (henProjectType == "veranda") {
        res.redirect('veranda')
    } else { 
        res.redirect('kickout') }
    })


// Hen journey

router.post('/hen-building-items-answer', function (req, res) {
    var henBuildingItems = req.session.data['hen-building-items']

    if (henBuildingItems == "yes") {
        res.redirect('hen-inlets')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-inlets-answer', function (req, res) {
    var henInlets = req.session.data['hen-inlets']

    if (henInlets == "yes") {
        res.redirect('hen-insulation')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-insulation-answer', function (req, res) {
    var henInsulation = req.session.data['hen-insulation']

    if (henInsulation == "yes") {
        res.redirect('hen-cleaning-area')
    } else { 
        res.redirect('kickout') }
    })
  

router.post('/hen-cleaning-area-answer', function (req, res) {
    var henCleaningArea = req.session.data['hen-cleaning-area']
    
    if (henCleaningArea == "yes") {
        res.redirect('hen-egg-store')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-biolock-answer', function (req, res) {
    var henBiolock = req.session.data['hen-biolock']
    
    if (henBiolock == "yes") {
        res.redirect('hen-internal-barrier')
    } else { 
        res.redirect('kickout') }
    })
    

router.post('/hen-internal-barrier-answer', function (req, res) {
    var henInteralBarrier = req.session.data['hen-internal-barrier']
    
    if (henInteralBarrier == "yes") {
        res.redirect('hen-egg-store')
    } else { 
        res.redirect('kickout') }
    })
    

router.post('/hen-egg-store-answer', function (req, res) {
    var henEggStore = req.session.data['hen-egg-store']
    
    if (henEggStore == "yes") {
        res.redirect('hen-aviary-system')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-aviary-system-answer', function (req, res) {
    var henAviarySystem = req.session.data['hen-aviary-system']
    
    if (henAviarySystem == "yes") {
        res.redirect('hen-ventilation-speed')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-ventilation-speed-answer', function (req, res) {
    var henVentilationSpeed = req.session.data['hen-ventilation-speed']
    
    if (henVentilationSpeed == "yes") {
        res.redirect('hen-ventilation-rate')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-ventilation-rate-answer', function (req, res) {
    var henVentilationRate = req.session.data['hen-ventilation-rate']
    
    if (henVentilationRate == "yes") {
        res.redirect('hen-ventilation-quality')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-ventilation-quality-answer', function (req, res) {
    var henVentilationQuality = req.session.data['hen-ventilation-quality']
    
    if (henVentilationQuality == "yes") {
        res.redirect('hen-ventilation-features')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-ventilation-features-answer', function (req, res) {
    var henVentilationFeatures = req.session.data['hen-ventilation-features']
    
    if (henVentilationFeatures == "yes") {
        res.redirect('hen-welfare-ramps')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-welfare-ramps-answer', function (req, res) {
    var henWelfareRamps = req.session.data['hen-welfare-ramps']
    
    if (henWelfareRamps == "yes") {
        res.redirect('hen-manure-removal')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-manure-removal-answer', function (req, res) {
    var henManureRemoval = req.session.data['hen-manure-removal']
    
    if (henManureRemoval == "yes") {
        res.redirect('hen-led-lighting')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-led-lighting-answer', function (req, res) {
    var henLEDLighting = req.session.data['hen-led-lighting']
    
    if (henLEDLighting == "yes") {
        res.redirect('hen-lighting-features')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-lighting-features-answer', function (req, res) {
    var henLightingFeatures = req.session.data['hen-lighting-features']
    
    if (henLightingFeatures == "yes") {
        res.redirect('hen-veranda-size')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-veranda-size-answer', function (req, res) {
    var henVerandaSize = req.session.data['hen-veranda-size']
    
    if (henVerandaSize == "yes" || henVerandaSize == "exempt") {
        res.redirect('hen-veranda-placement')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-veranda-placement-answer', function (req, res) {
    var henVerandaPlacement = req.session.data['hen-veranda-placement']
    
    if (henVerandaPlacement == "yes") {
        res.redirect('hen-veranda-specification')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-veranda-specification-answer', function (req, res) {
    var henVerandaSpecification = req.session.data['hen-veranda-specification']
    
    if (henVerandaSpecification == "yes") {
        res.redirect('hen-veranda-biosecurity')
    } else { 
        res.redirect('kickout') }
    })

router.post('/hen-veranda-biosecurity-answer', function (req, res) {
    var henVerandaBiosecurity = req.session.data['hen-veranda-biosecurity']
    
    if (henVerandaBiosecurity == "yes") {
        res.redirect('hen-pop-holes')
    } else { 
        res.redirect('kickout') }
    })

router.post('/hen-pop-holes-answer', function (req, res) {
    var henPopHoles = req.session.data['hen-pop-holes']
    
    if (henPopHoles == "yes") {
        res.redirect('hen-concrete-apron')
    } else { 
        res.redirect('kickout') }
    })

router.post('/hen-concrete-apron-answer', function (req, res) {
    var henConcreteApron = req.session.data['hen-concrete-apron']
    
    if (henConcreteApron == "yes") {
        res.redirect('hen-vehicle-washing')
    } else { 
        res.redirect('kickout') }
    })

router.post('/hen-vehicle-washing-answer', function (req, res) {
    var henVehicleWashing = req.session.data['hen-vehicle-washing']
    
    if (henVehicleWashing == "yes") {
        res.redirect('hen-drains')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-drains-answer', function (req, res) {
    var henDrains = req.session.data['hen-drains']
    
    if (henDrains == "yes") {
        res.redirect('hen-external-taps')
    } else { 
        res.redirect('kickout') }
    })

router.post('/hen-external-taps-answer', function (req, res) {
    var henExternalTaps = req.session.data['hen-external-taps']
    
    if (henExternalTaps == "yes") {
        res.redirect('hen-roof-support')
    } else { 
        res.redirect('kickout') }
    })

router.post('/hen-roof-support-answer', function (req, res) {
    var henRoofSupport = req.session.data['hen-roof-support']
    
    if (henRoofSupport == "yes" || henRoofSupport == "exempt") {
        res.redirect('hen-solar-system')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-solar-system-answer', function (req, res) {
    var henSolarSystem = req.session.data['hen-solar-system']
    
    if (henSolarSystem == "yes") {
        res.redirect('hen-project-cost')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-project-cost-answer', function (req, res) {
    var henProjectCost = req.session.data['hen-project-cost']
    
    if (henProjectCost >= 1) {
        res.redirect('hen-solar-cost')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-solar-cost-answer', function (req, res) {
    var henSolarCost = req.session.data['hen-solar-cost']
    
    if (henSolarCost >= 1) {
        res.redirect('hen-current-system')
    } else { 
        res.redirect('kickout') }
    })

router.post('/hen-current-system-answer', function (req, res) {
    var henCurrentSystem = req.session.data['hen-current-system']
    
    if (henCurrentSystem == "none") {
        res.redirect('kickout')
    } else { 
        res.redirect('hen-level-ramp') }
    })

router.post('/hen-level-ramp-answer', function (req, res) {
    var henLevelRamp = req.session.data['hen-level-ramp']
    
    if (henLevelRamp == "yes") {
        res.redirect('hen-highest-tier')
    } else { 
        res.redirect('kickout') }
    })

router.post('/hen-highest-tier-answer', function (req, res) {
    var henHighestTier = req.session.data['hen-highest-tier']
    
    if (henHighestTier == "yes") {
        res.redirect('hen-three-tiers')
    } else { 
        res.redirect('kickout') }
    })

router.post('/hen-three-tiers-answer', function (req, res) {
    var henThreeTiers = req.session.data['hen-three-tiers']
    
    if (henThreeTiers == "yes") {
        res.redirect('hen-natural-light')
    } else { 
        res.redirect('kickout') }
    })

router.post('/hen-natural-light-answer', function (req, res) {
    var henNaturalLight = req.session.data['hen-natural-light']
    
    if (henNaturalLight == "yes") {
        res.redirect('hen-easy-grip')
    } else { 
        res.redirect('kickout') }
    })

router.post('/hen-easy-grip-answer', function (req, res) {
    var henEasyGrip = req.session.data['hen-easy-grip']
    
    if (henEasyGrip == "yes") {
        res.redirect('hen-housing-structure')
    } else { 
        res.redirect('kickout') }
    })


router.post('/hen-housing-structure-answer', function (req, res) {
    var henHousingStructure = req.session.data['hen-housing-structure']
    
    if (henHousingStructure.includes ("none")) {
        res.redirect('kickout')
    } else { 
        res.redirect('hen-air-space') }
    })

router.post('/hen-air-space-answer', function (req, res) {
    var henAirSpace = req.session.data['hen-air-space']
    
    if (henAirSpace == "yes") {
        res.redirect('hen-housing-features')
    } else { 
        res.redirect('kickout') }
    })

router.post('/hen-housing-features-answer', function (req, res) {
    var henHousingFeatures = req.session.data['hen-housing-features']

    if (henHousingFeatures.includes ("none")) {
        res.redirect('kickout')
    }  else { 
        res.redirect('hen-energy-sources') }
    })

router.post('/hen-energy-sources-answer', function (req, res) {
    var henEnergySources = req.session.data['hen-energy-sources']

    if (henEnergySources.includes ("none")) {
        res.redirect('kickout')
    }  else { 
        res.redirect('hen-bird-data') }
    })


router.post('/hen-bird-data-answer', function (req, res) {
    var henBirdData = req.session.data['hen-bird-data']
    
    if (henBirdData == "yes") {
        res.redirect('hen-bird-data-type')
    } else { 
        res.redirect('hen-environmental-data') }
    })


router.post('/hen-bird-data-type-answer', function (req, res) {
    var henBirdDataType = req.session.data['hen-bird-data-type']

    if (henBirdDataType.includes ("other")) {
        res.redirect('hen-environmental-data')
    }  else { 
        res.redirect('hen-environmental-data') }
    })

router.post('/hen-environmental-data-answer', function (req, res) {
    var henEnvironmentalData = req.session.data['hen-environmental-data']
    
    if (henEnvironmentalData == "yes") {
        res.redirect('hen-environmental-data-type')
    } else { 
        res.redirect('hen-business-details') }
    })

router.post('/hen-environmental-data-type-answer', function (req, res) {
    var henEnvironmentalDataType = req.session.data['hen-environmental-data-type']

    if (henEnvironmentalDataType.includes ("other")) {
        res.redirect('hen-business-details')
    }  else { 
        res.redirect('hen-business-details') }
    })
    


    
      



module.exports = router
