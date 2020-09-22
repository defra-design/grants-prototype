const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// GET SPRINT NAME - useful for relative templates
router.use('/', (req, res, next) => {
  res.locals.currentURL = req.originalUrl; //current screen
  res.locals.prevURL = req.get('Referrer'); // previous screen
  req.folder = req.originalUrl.split('/')[1]; //folder, e.g. 'current'
  req.subfolder = req.originalUrl.split('/')[2]; //sub-folder e.g. 'service'
  res.locals.folder = req.folder; // what folder the url is
  res.locals.subfolder = req.subfolder; // what subfolder the URL is in
  console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder  );
  console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );
  next();
});



// Route index page
router.get('/', function (req, res) {
  res.render('./index')
});



// Set service name based on sub folders for different prototypes
router.get('/current/*', function(req, res, next){
  res.locals['serviceName'] = 'Apply for a large countryside productivity grant for water'
  next()
});



// Start folder specific route
router.use('/current', require('./views/current/routes/_routes'));
router.use('/v1', require('./views/v1/routes/_routes'));
router.use('/v2', require('./views/v2/routes/_routes'));


// Task list status settings


router.get('*/start', function (req, res) {

// Set up all the section statuses

  // Cannot start yet = 'govuk-tag--grey'
  // Not started = 'govuk-tag--grey'
  // In progress = 'govuk-tag--blue'
  // Completed = ''

req.session.data['completed_sections'] = '0'

req.session.data['project_eligibility_status'] = 'Not started'
req.session.data['project_eligibility_status_class'] = ''

req.session.data['theme_eligibility_status'] = 'Cannot start yet'
req.session.data['theme_eligibility_status_class'] = 'govuk-tag--grey'

req.session.data['contact_details_status'] = 'Cannot start yet'
req.session.data['contact_details_status_class'] = 'govuk-tag--grey'

req.session.data['project_benefits_status'] = 'Cannot start yet'
req.session.data['project_benefits_status_class'] = 'govuk-tag--grey'

req.session.data['final_project_details_status'] = 'Cannot start yet'
req.session.data['final_project_details_status_class'] = 'govuk-tag--grey'

res.render( './' + req.originalUrl )

});

//*****************************************************
// TASK LIST PAGE START //
router.get('*/task-list', function (req, res) {

    var application_status
    var completed_sections

    switch (req.session.data['completed_sections']) {
        case '0':
          application_status = 'Expression of interest not started'
          completed_sections = 'You have completed 0 of 4 sections.'
          break
        case '1':
        application_status = 'Expression of interest in progress'
        completed_sections = 'You have completed 1 of 4 sections.'
          break
        case '2':
        application_status = 'Expression of interest in progress'
        completed_sections = 'You have completed 2 of 4 sections.'
          break
        case '3':
        application_status = 'Expression of interest in progress'
        completed_sections = 'You have completed 3 of 4 sections.'
          break
        case '4':
        application_status = 'Expression of interest completed'
        completed_sections = 'You have completed 4 of 4 sections.'
          break
      }

    project_eligibility_status = req.session.data['project_eligibility_status']
    project_eligibility_status_class = req.session.data['project_eligibility_status_class']

    theme_eligibility_status = req.session.data['theme_eligibility_status']
    theme_eligibility_status_class = req.session.data['theme_eligibility_status_class']

    contact_details_status = req.session.data['contact_details_status']
    contact_details_status_class = req.session.data['contact_details_status_class']

    project_benefits_status = req.session.data['project_benefits_status']
    project_benefits_status_class = req.session.data['project_benefits_status_class']

    final_project_details_status = req.session.data['final_project_details_status']
    final_project_details_status_class = req.session.data['final_project_details_status_class']



  res.render( './' + req.originalUrl, {

    application_status: application_status,
    completed_sections: completed_sections,
    project_eligibility_status: project_eligibility_status,
    project_eligibility_status_class: project_eligibility_status_class,
    theme_eligibility_status: theme_eligibility_status,
    theme_eligibility_status_class: theme_eligibility_status_class,
    contact_details_status: contact_details_status,
    contact_details_status_class: contact_details_status_class,
    project_benefits_status: project_benefits_status,
    project_benefits_status_class: project_benefits_status_class,
    final_project_details_status: final_project_details_status,
    final_project_details_status_class: final_project_details_status_class

  })
})

// TASK LIST PAGE END //


module.exports = router
