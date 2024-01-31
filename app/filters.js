//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
// arb change

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here

var filters = {}

;(filters.commafy = function (number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}),
	(filters.toFixed = function (num, digits) {
		return parseFloat(num).toFixed(digits).replace(/\.00$/, '')
	}),
	(filters.joinArray = function (array) {
		if (!array || array.length === 0) {
			return ''
		}
		return array.join(', ')
	})

// Add filter that takes an optional array of items and a value to check if the value is in the array
filters.isIn = function (value, array) {
	if (!array || array.length === 0) {
		return false
	}
	return array.includes(value)
}

filters.redirect = function (url) {
	return '<script> window.location.href ="' + url + '";</script>'
}

addFilter('inPounds', (input) => {
	const num = Number(input)
	if (isNaN(num)) {
		return '£XX.XX'
	}
	var returnStr =
		'£' +
		num.toLocaleString('en-GB', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})
	returnStr = returnStr.replace(/\.00$/, '')
	return returnStr
})

addFilter('checkboxAnswersToList', (input, fallback = '') => {
	var returnStr = '<ul class="govuk-list govuk-list--bullet">'
	if (input) {
		if (Array.isArray(input)) {
			if (input.length) {
				input.forEach((element) => {
					returnStr += '<li>' + element + '</li>'
				})
			} else if (fallback) {
				returnStr += '<li>' + fallback + '</li>'
			}
		} else {
			if (fallback) {
				returnStr += '<li>' + fallback + '</li>'
			} else {
				returnStr += '<li>' + input + '</li>'
			}
		}
	} else {
		returnStr += '<li>' + input + '</li>'
	}
	return returnStr + '</ul>'
})

addFilter('percent', (input, percentage) => {
	return (Number(input) * (Number(percentage) / 100)).toFixed(2)
})

// Add the filters using the addFilter function
Object.entries(filters).forEach(([name, fn]) => addFilter(name, fn))
