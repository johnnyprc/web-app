var auth = require('../../../lib/auth');

exports.get = function (req, res) {
    console.log('Get funciton Dashboard');
	var employeeId = req.user[0]._id;
	var employeename = req.user[0].fname;
    console.log('Get function getemployees');
    var database = req.db;
    var employeeDB = database.get('employees');
    var bid = req.user[0].business;
    var businesses = db.get('businesses');
    employeeDB.find( { business: bid })
        .forEach(function(oneEmployee) {
            console.log( "user: " + oneEmployee.fname );
        });

    res.render('business/dashboard', {
        title: 'Express',
		eid: employeeId,
		employeeName: employeename,
		message: req.flash("permission")
	});
};
