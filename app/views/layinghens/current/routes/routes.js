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
        res.redirect('hen-welfare-ramps')
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
        res.redirect('hen-led-lighting')
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
        res.redirect('hen-aviary-lighting')
    } else { 
        res.redirect('kickout') }
    })

router.post('/hen-aviary-lighting-answer', function (req, res) {
    var henAviaryLighting = req.session.data['hen-aviary-lighting']
    
    if (henAviaryLighting == "yes") {
        res.redirect('hen-ventilation-speed')
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
        res.redirect('score') }
    })

router.post('/hen-environmental-data-type-answer', function (req, res) {
    var henEnvironmentalDataType = req.session.data['hen-environmental-data-type']

    if (henEnvironmentalDataType.includes ("other")) {
        res.redirect('score')
    }  else { 
        res.redirect('score') }
    })
    

// Pullet journey


router.post('/pullet-building-items-answer', function (req, res) {
    var pulletBuildingItems = req.session.data['pullet-building-items']

    if (pulletBuildingItems == "yes") {
        res.redirect('pullet-inlets')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-inlets-answer', function (req, res) {
    var pulletInlets = req.session.data['pullet-inlets']

    if (pulletInlets == "yes") {
        res.redirect('pullet-insulation')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-insulation-answer', function (req, res) {
    var pulletInsulation = req.session.data['pullet-insulation']

    if (pulletInsulation == "yes") {
        res.redirect('pullet-cleaning-area')
    } else { 
        res.redirect('kickout') }
    })
  

router.post('/pullet-cleaning-area-answer', function (req, res) {
    var pulletCleaningArea = req.session.data['pullet-cleaning-area']
    
    if (pulletCleaningArea == "yes") {
        res.redirect('pullet-vaccination')
    } else { 
        res.redirect('kickout') }
    })

router.post('/pullet-vaccination-answer', function (req, res) {
    var pulletVaccination = req.session.data['pullet-vaccination']
    
    if (pulletVaccination == "yes") {
        res.redirect('pullet-density')
    } else { 
        res.redirect('kickout') }
    })

router.post('/pullet-density-answer', function (req, res) {
    var pulletDensity = req.session.data['pullet-density']
    
    if (pulletDensity == "yes") {
        res.redirect('pullet-housing-requirements')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-housing-requirements-answer', function (req, res) {
    var pulletHousingRequirements = req.session.data['pullet-housing-requirements']
    
    if (pulletHousingRequirements == "yes") {
        res.redirect('pullet-which-system')
    } else { 
        res.redirect('kickout') }
    })

router.post('/pullet-which-system-answer', function (req, res) {
    var pulletWhichSystem = req.session.data['pullet-which-system']
    
    if (pulletWhichSystem == "aviary") {
        res.redirect('pullet-aviary-system')
    } else { 
        res.redirect('pullet-step-system') }
    })


router.post('/pullet-aviary-system-answer', function (req, res) {
    var pulletAviarySystem = req.session.data['pullet-aviary-system']
    
    if (pulletAviarySystem == "yes") {
        res.redirect('pullet-ventilation-speed')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-step-system-answer', function (req, res) {
    var pulletStepSystem = req.session.data['pullet-step-system']
    
    if (pulletStepSystem == "yes") {
        res.redirect('pullet-ventilation-speed')
    } else { 
        res.redirect('kickout') }
    })





router.post('/pullet-aviary-system-answer', function (req, res) {
    var pulletAviarySystem = req.session.data['pullet-aviary-system']
    
    if (pulletAviarySystem == "yes") {
        res.redirect('pullet-welfare-ramps')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-ventilation-speed-answer', function (req, res) {
    var pulletVentilationSpeed = req.session.data['pullet-ventilation-speed']
    
    if (pulletVentilationSpeed == "yes") {
        res.redirect('pullet-ventilation-rate')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-ventilation-rate-answer', function (req, res) {
    var pulletVentilationRate = req.session.data['pullet-ventilation-rate']
    
    if (pulletVentilationRate == "yes") {
        res.redirect('pullet-ventilation-quality')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-ventilation-quality-answer', function (req, res) {
    var pulletVentilationQuality = req.session.data['pullet-ventilation-quality']
    
    if (pulletVentilationQuality == "yes") {
        res.redirect('pullet-ventilation-features')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-ventilation-features-answer', function (req, res) {
    var pulletVentilationFeatures = req.session.data['pullet-ventilation-features']
    
    if (pulletVentilationFeatures == "yes") {
        res.redirect('pullet-led-lighting')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-welfare-ramps-answer', function (req, res) {
    var pulletWelfareRamps = req.session.data['pullet-welfare-ramps']
    
    if (pulletWelfareRamps == "yes") {
        res.redirect('pullet-manure-removal')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-manure-removal-answer', function (req, res) {
    var pulletManureRemoval = req.session.data['pullet-manure-removal']
    
    if (pulletManureRemoval == "yes") {
        res.redirect('pullet-aviary-lighting')
    } else { 
        res.redirect('kickout') }
    })

router.post('/pullet-aviary-lighting-answer', function (req, res) {
    var pulletAviaryLighting = req.session.data['pullet-aviary-lighting']
    
    if (pulletAviaryLighting == "yes") {
        res.redirect('pullet-ventilation-speed')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-led-lighting-answer', function (req, res) {
    var pulletLEDLighting = req.session.data['pullet-led-lighting']
    
    if (pulletLEDLighting == "yes") {
        res.redirect('pullet-lighting-features')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-lighting-features-answer', function (req, res) {
    var pulletLightingFeatures = req.session.data['pullet-lighting-features']
    
    if (pulletLightingFeatures == "yes") {
        res.redirect('pullet-concrete-apron')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-veranda-size-answer', function (req, res) {
    var pulletVerandaSize = req.session.data['pullet-veranda-size']
    
    if (pulletVerandaSize == "yes" || pulletVerandaSize == "exempt") {
        res.redirect('pullet-veranda-placement')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-veranda-placement-answer', function (req, res) {
    var pulletVerandaPlacement = req.session.data['pullet-veranda-placement']
    
    if (pulletVerandaPlacement == "yes") {
        res.redirect('pullet-veranda-specification')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-veranda-specification-answer', function (req, res) {
    var pulletVerandaSpecification = req.session.data['pullet-veranda-specification']
    
    if (pulletVerandaSpecification == "yes") {
        res.redirect('pullet-veranda-biosecurity')
    } else { 
        res.redirect('kickout') }
    })

router.post('/pullet-veranda-biosecurity-answer', function (req, res) {
    var pulletVerandaBiosecurity = req.session.data['pullet-veranda-biosecurity']
    
    if (pulletVerandaBiosecurity == "yes") {
        res.redirect('pullet-pop-holes')
    } else { 
        res.redirect('kickout') }
    })

router.post('/pullet-pop-holes-answer', function (req, res) {
    var pulletPopHoles = req.session.data['pullet-pop-holes']
    
    if (pulletPopHoles == "yes") {
        res.redirect('pullet-concrete-apron')
    } else { 
        res.redirect('kickout') }
    })

router.post('/pullet-concrete-apron-answer', function (req, res) {
    var pulletConcreteApron = req.session.data['pullet-concrete-apron']
    
    if (pulletConcreteApron == "yes") {
        res.redirect('pullet-vehicle-washing')
    } else { 
        res.redirect('kickout') }
    })

router.post('/pullet-vehicle-washing-answer', function (req, res) {
    var pulletVehicleWashing = req.session.data['pullet-vehicle-washing']
    
    if (pulletVehicleWashing == "yes") {
        res.redirect('pullet-drains')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-drains-answer', function (req, res) {
    var pulletDrains = req.session.data['pullet-drains']
    
    if (pulletDrains == "yes") {
        res.redirect('pullet-external-taps')
    } else { 
        res.redirect('kickout') }
    })

router.post('/pullet-external-taps-answer', function (req, res) {
    var pulletExternalTaps = req.session.data['pullet-external-taps']
    
    if (pulletExternalTaps == "yes") {
        res.redirect('pullet-roof-support')
    } else { 
        res.redirect('kickout') }
    })

router.post('/pullet-roof-support-answer', function (req, res) {
    var pulletRoofSupport = req.session.data['pullet-roof-support']
    
    if (pulletRoofSupport == "yes" || pulletRoofSupport == "exempt") {
        res.redirect('pullet-solar-system')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-solar-system-answer', function (req, res) {
    var pulletSolarSystem = req.session.data['pullet-solar-system']
    
    if (pulletSolarSystem == "yes") {
        res.redirect('pullet-project-cost')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-project-cost-answer', function (req, res) {
    var pulletProjectCost = req.session.data['pullet-project-cost']
    
    if (pulletProjectCost >= 1) {
        res.redirect('pullet-solar-cost')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-solar-cost-answer', function (req, res) {
    var pulletSolarCost = req.session.data['pullet-solar-cost']
    
    if (pulletSolarCost >= 1) {
        res.redirect('pullet-current-system')
    } else { 
        res.redirect('kickout') }
    })



// Pullet scoring questions


router.post('/pullet-current-system-answer', function (req, res) {
    var pulletCurrentSystem = req.session.data['pullet-current-system']
    
    if (pulletCurrentSystem == "none") {
        res.redirect('kickout')
    } else { 
        res.redirect('pullet-level-ramp') }
    })

router.post('/pullet-level-ramp-answer', function (req, res) {
    var pulletLevelRamp = req.session.data['pullet-level-ramp']
    
    if (pulletLevelRamp == "yes") {
        res.redirect('pullet-highest-tier')
    } else { 
        res.redirect('kickout') }
    })

router.post('/pullet-highest-tier-answer', function (req, res) {
    var pulletHighestTier = req.session.data['pullet-highest-tier']
    
    if (pulletHighestTier == "yes") {
        res.redirect('pullet-three-tiers')
    } else { 
        res.redirect('kickout') }
    })

router.post('/pullet-three-tiers-answer', function (req, res) {
    var pulletThreeTiers = req.session.data['pullet-three-tiers']
    
    if (pulletThreeTiers == "yes") {
        res.redirect('pullet-natural-light')
    } else { 
        res.redirect('kickout') }
    })

router.post('/pullet-natural-light-answer', function (req, res) {
    var pulletNaturalLight = req.session.data['pullet-natural-light']
    
    if (pulletNaturalLight == "yes") {
        res.redirect('pullet-easy-grip')
    } else { 
        res.redirect('kickout') }
    })

router.post('/pullet-easy-grip-answer', function (req, res) {
    var pulletEasyGrip = req.session.data['pullet-easy-grip']
    
    if (pulletEasyGrip == "yes") {
        res.redirect('pullet-housing-structure')
    } else { 
        res.redirect('kickout') }
    })


router.post('/pullet-housing-structure-answer', function (req, res) {
    var pulletHousingStructure = req.session.data['pullet-housing-structure']
    
    if (pulletHousingStructure.includes ("none")) {
        res.redirect('kickout')
    } else { 
        res.redirect('pullet-air-space') }
    })

router.post('/pullet-air-space-answer', function (req, res) {
    var pulletAirSpace = req.session.data['pullet-air-space']
    
    if (pulletAirSpace == "yes") {
        res.redirect('pullet-housing-features')
    } else { 
        res.redirect('kickout') }
    })

router.post('/pullet-housing-features-answer', function (req, res) {
    var pulletHousingFeatures = req.session.data['pullet-housing-features']

    if (pulletHousingFeatures.includes ("none")) {
        res.redirect('kickout')
    }  else { 
        res.redirect('pullet-energy-sources') }
    })

router.post('/pullet-energy-sources-answer', function (req, res) {
    var pulletEnergySources = req.session.data['pullet-energy-sources']

    if (pulletEnergySources.includes ("none")) {
        res.redirect('kickout')
    }  else { 
        res.redirect('pullet-bird-data') }
    })


router.post('/pullet-bird-data-answer', function (req, res) {
    var pulletBirdData = req.session.data['pullet-bird-data']
    
    if (pulletBirdData == "yes") {
        res.redirect('pullet-bird-data-type')
    } else { 
        res.redirect('pullet-environmental-data') }
    })


router.post('/pullet-bird-data-type-answer', function (req, res) {
    var pulletBirdDataType = req.session.data['pullet-bird-data-type']

    if (pulletBirdDataType.includes ("other")) {
        res.redirect('pullet-environmental-data')
    }  else { 
        res.redirect('pullet-environmental-data') }
    })

router.post('/pullet-environmental-data-answer', function (req, res) {
    var pulletEnvironmentalData = req.session.data['pullet-environmental-data']
    
    if (pulletEnvironmentalData == "yes") {
        res.redirect('pullet-environmental-data-type')
    } else { 
        res.redirect('score') }
    })

router.post('/pullet-environmental-data-type-answer', function (req, res) {
    var pulletEnvironmentalDataType = req.session.data['pullet-environmental-data-type']

    if (pulletEnvironmentalDataType.includes ("other")) {
        res.redirect('score')
    }  else { 
        res.redirect('score') }
    })

    
      



module.exports = router
