const serviceName = {
  water: {
    v2: 'Apply for a large countryside productivity grant for water',
    v3: 'Apply for a large grant for a water resource management project',
    v4: 'Apply for a large grant for a water resource management project',
    v4b: 'Apply for a large grant for a water resource management project',
    v5: 'Apply for a Farming Transformation Fund water resource management grant',
    v6: 'Check if you can apply for a water resource management grant',
    v7private: 'Check if you can apply for a water resource management grant',
    v8public: 'Check if you can apply for a Farming Transformation Fund water management grant',
    r2v2: 'Check if you can apply for a Farming Transformation Fund water management grant',
    current: 'Check if you can apply for a Water Management Grant'
  },

  ahw: {
    current: 'Check if you can apply for a Calf Housing for Health and Welfare Grant',
    v1: 'Check if you can apply for an Upgrading Cattle Housing Grant',
    v2: 'Check if you can apply for an Upgrading Cattle Housing Grant'
  },

slurrystorage: {
    current: 'Check if you can apply for a Slurry Infrastructure Grant',
        v1: 'Check if you can apply for a Farming Transformation Fund Slurry Infrastructure Grant',
        v2: 'Check if you can apply for a Farming Transformation Fund Slurry Infrastructure Grant',
        v3: 'Check if you can apply for a Farming Transformation Fund Slurry Infrastructure Grant'
},
  slurry: {
    current: 'Check if you can apply for a Farming Transformation Fund Improving Farm Productivity Grant',
         v1: 'Check if you can apply for a Farming Transformation Fund productivity grant',
        v2: 'Check if you can apply for a Farming Transformation Fund productivity grant'
  },
  robotics: {
    current: 'Check if you can apply for a Farming Transformation Fund Improving Farm Productivity Grant',
         v1: 'Check if you can apply for a Farming Transformation Fund Improving Farm Productivity Grant',
         v2: 'Check if you can apply for a Farming Transformation Fund Improving Farm Productivity Grant',
         v3: 'Check if you can apply for a Farming Transformation Fund Improving Farm Productivity Grant',
         v4: 'Check if you can apply for a Farming Transformation Fund Improving Farm Productivity Grant'
  },
  addingvalue: {
    current: 'Check if you can apply for a Farming Transformation Fund Adding Value grant',
         v1: 'Check if you can apply for a Farming Transformation Fund Adding Value grant',
         v2: 'Check if you can apply for a Farming Transformation Fund Adding Value grant'
  }
}

const schemeList = Object.keys(serviceName)

module.exports = { serviceName, schemeList }
