/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

const fs = require('fs')
const path = require('path')

var services = {
	layinghens: {
		name: 'Laying Hens',
		description: 'This service is for laying hens',
		basefolder: './app/views/layinghens/current/',
		baseurl: '/layinghens/current/',
	},
}

// Write a function called populateServicePageStructure that recursively looks into each file and folder inside the 'basefolder' for each service (listed in the services object), each loop should maintain an object called 'structure' that represents the structure of the service's pages. The structure object should have the following format: { type: 'folder || page', name: 'foldername [strip .html if needed]', url: [optional if there is an index.html file in the folder], children: [array of child objects] } or { type: 'file', name: 'filename', url: 'url' }

const populateServicePageStructure = (services) => {
	const serviceKeys = Object.keys(services)
	serviceKeys.forEach((serviceKey) => {
		const service = services[serviceKey]
		const basefolder = service.basefolder
		const baseurl = service.baseurl
		service.structure = populateFolder(basefolder, baseurl)
	})
}

const populateFolder = (folderPath, baseurl) => {
	const structure = {}
	const files = fs.readdirSync(folderPath)
	files.forEach((file) => {
		const fullPath = path.join(folderPath, file)
		const relativePath = path.relative(baseurl, fullPath)
		if (fs.statSync(fullPath).isDirectory()) {
			const children = populateFolder(fullPath, baseurl)
			structure[file] = {
				type: 'folder',
				name: file,
				url: fs.existsSync(path.join(fullPath, 'index.html'))
					? trimStartOfString(relativePath, baseurl)
					: null,
				children: Object.keys(children).length > 0 ? children : null,
			}
		} else if (file.endsWith('.html')) {
			structure[file.replace('.html', '')] = {
				type: 'page',
				name: file.replace('.html', ''),
				url: trimStartOfString(relativePath, baseurl),
			}
		}
	})
	return structure
}

const trimStartOfString = (fullString, matchString) => {
	const index = fullString.indexOf(matchString)
	if (index !== -1) {
		return fullString.substring(index)
	}
	return fullString
}

populateServicePageStructure(services)

module.exports = {
	// Insert values here

	services: services,
}
