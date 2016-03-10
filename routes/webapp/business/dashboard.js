var auth = require('../../../lib/auth');

exports.get = function (req, res) {
    console.log('Get function getemployees');
    var database = req.db;
    var employeeDB = database.get('employees');
    var bid = req.user[0].business;

    employeeDB.find( { business: bid })
        .on('success', function(employees) {

            res.render('business/dashboard', {
                emps: employees,
                message: req.flash("permission")
            });

        });
};
