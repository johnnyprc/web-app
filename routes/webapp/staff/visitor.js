/**
 * Created by sean on 2/26/2016.
 */


/**
 * Takes a req and res parameters and is inputted into function to get employee, notemployee, and business data.
 *
 * @param req and res The two parameters passed in to get the apprporiate employee,
 * @returns The appropriate data about the employee
 */
//exports.get = function(req, res) {
//    console.log('Get function');
//    res.render('staff/visitor',{
//    });
//};
var async = require('async');

//exports.get = function(req,res){
//    console.log('Get function displayVisitorQueue');
//    var database =  req.db;
//    var visitorDB = database.get('visitor');
//    var visitor;
//    var employeeDB = database.get('employees');
//
//    var businessID = req.user[0].business.toString();
//
//    async.parallel({
//            employee: function(cb){
//                employeeDB.find({registrationToken: {$exists: false}, business: (businessID)},function (err,results){
//
//                    if (err) { return next(err);  }
//                    if(!results) { return next(new Error('Error finding employee'));}
//
//                    employeee = results;
//                    console.log(employeee);
//                    cb();
//
//                });
//            },
//            nonemployee: function(cb){
//                employeeDB.find({registrationToken: {$exists: true}, business: (businessID)}, function (err,results){
//
//
//                    if (err) { return next(err); }
//                    if(!results) { return next(new Error('Error finding employee'));}
//
//                    notemployee = results;
//                    cb();
//                });
//            }
//        },
//        function(err,results){
//            if(err){
//                throw err;
//            }
//            res.render('staff/visitor',
//                {
//                    title: 'Visitor Queue',
//                    notsigned: notemployee,
//                    signed: employeee
//                }
//            )}
//    )};

exports.get = function (req, res) {
    console.log('Get function VisitorQueue');
    var database = req.db;
    var apptDB = database.get('appointment');

    var bid = req.user[0].business;

    apptDB.find( { business: bid }, {state: 'waiting'} )
        .on('success', function(appointments) {

            res.render('staff/visitor', {
                appts: appointments,
                message: req.flash("Fetched all appointments")
            });

        })
    };



exports.post = function (req, res) {

    var appointmentDB = req.db.get('appointment');
    var businessID = req.user[0].business.toString();

    var time = req.body.time;
    var provider = req.body.provider;
    var name = req.body.name;

    appointmentDB.insert({
        privider: provider,
        time: time,
        name: name,
        business: businessID
    });

    res.render('staff/visitor',
        {
            provider: 'Kurt'
        }
    )

};
