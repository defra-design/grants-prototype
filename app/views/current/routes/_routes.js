const express = require('express')
const router = express.Router()

const serviceName = 'Apply for a large countryside productivity grant for water'

console.log( 'This is the _routes file' );
console.log( serviceName );

// Add your routes here - above the module.exports line

//*****************************************************
// TASK LIST PAGE START //
router.get('*/XXXtask-list', function (req, res) {

  console.log( 'This is the task list' );

  // Cannot start yet = 'govuk-tag--grey'
  // Not started = 'govuk-tag--grey'
  // In progress = 'govuk-tag--blue'
  // Completed = ''

    //part0101status = req.session.data['part0101status']
    part0101status = 'Completed'
    part0101statusClass = ''

    part0102status = 'In progress'
    part0102statusClass = 'govuk-tag--blue'

    part0201status = 'Not started'
    part0201statusClass = 'govuk-tag--grey'

    part0202status = 'Cannot start yet'
    part0202statusClass = 'govuk-tag--grey'


  res.render( './' + req.originalUrl, {
    serviceName: serviceName,
    part0101status: part0101status,
    part0101statusClass: part0101statusClass,
    part0102status: part0102status,
    part0102statusClass: part0102statusClass,
    part0201status: part0201status,
    part0201statusClass: part0201statusClass,
    part0202status: part0202status,
    part0202statusClass: part0202statusClass
  })
})

// TASK LIST PAGE END //

module.exports = router
