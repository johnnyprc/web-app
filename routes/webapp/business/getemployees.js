/**
 * Created by sean on 3/7/2016.
 */
exports.get = function(req,res) {
    console.log('Get function getemployees');
    var database = req.db;
    var employeeDB = database.get('employees');
    var bid = req.user[0].business;
    var businesses = db.get('businesses');
    employeeDB.find( { business: bid })
        .forEach(function(oneEmployee) {
            console.log( "user: " + oneEmployee.fname );
        });

};
