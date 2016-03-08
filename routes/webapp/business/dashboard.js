var auth = require('../../../lib/auth');

exports.get = function (req, res, next) {
    console.log('Get funciton Dashboard');
    //var employeeId = req.user[0]._id;
    //var employeename = req.user[0].fname;
    //console.log('Get function getemployees');
    //var database = req.db;
    //var employeeDB = database.get('employees');
    //var bid = req.user[0].business;
    //var businesses = database.get('businesses');
    //req.db.getemployeeDB.find( { business: bid })
    //    .forEach(function(oneEmployee) {
    //        //console.log( "user: " + oneEmployee.fname );
    //    });

    req.db.get('employees').findById(req.user[0].business, function (err, business) {
        if (err) {
            return next(err);
        }
        if (!business) {
            return next(new Error('Business not found for user: ' + req.user));
        }
        console.log('AM I INSIDE HERE');
        res.render('business/dashboard', {
            message: req.flash('permission')

            //logo: business.logo,
            //bg: '/images/bg/thumb/' + business.style.bg
        });
    });



    res.render('business/dashboard', {
        title: 'Express',
		///eid: employeeId,
		//employeeName: employeename,
		message: req.flash("permission")
	});
};
