var auth = require('../../../lib/auth');

exports.get = function (req, res) {
    console.log('Get funciton Dashboard');
	var employeeId = req.user[0]._id;
	var employeename = req.user[0].fname;
    console.log('Get function getemployees');
    var database = req.db;
    var employeeDB = database.get('employees');
    var bid = req.user[0].business;
    var businesses = database.get('businesses');

    //Arrays
    var allEmps;
    var peple =   [
        "Yehuda Katz",
        "Alan Johnson",
        "Charles Jolley"
    ];


    employeeDB.find( { business: bid })
        .on('success', function(oneEmployee) {

            allEmps = (oneEmployee);
            console.log(allEmps);

            res.render('business/dashboard', {
                emps: allEmps,
                title: 'Express',
                eid: employeeId,
                employeeName: employeename,
                message: req.flash("permission")
            });


        });

    console.log("break!");

        //.forEach(function(oneEmployee) {
        //    console.log( "user: " + oneEmployee.fname );
        //})

    //var fudge = allEmps[0].fname;
    //console.log(fudge);
    //res.render('business/dashboard', {
    //    //emps: fudge,
    //    title: 'Express',
		//eid: employeeId,
		//employeeName: employeename,
		//message: req.flash("permission")
    //});
};
