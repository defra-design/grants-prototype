//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here


  var filters = {}

  filters.commafy = function (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },

  filters.toFixed = function (num, digits) {
    return parseFloat(num).toFixed(digits).replace(/\.00$/, '')
  },

  filters.joinArray = function (array) {
    if (!array || array.length === 0) {
      return ''
    }
    return array.join(', ')
  }

// Add the filters using the addFilter function
Object.entries(filters).forEach(([name, fn]) => addFilter(name, fn))
