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
exports.get = function(req,res){
    console.log('Get function displayVisitorQueue');
    var database =  req.db;
    var visitorDB = database.get('visitor');
    var visitor;
    var notVisitor;
    var businessID = req.user[0].business.toString();
    console.log(businessID);
    async.parallel({
            employee: function(cb){
                employeeDB.find({registrationToken: {$exists: false}, business: ObjectId(businessID)},function (err,results){

                    if (err) { return next(err);  }
                    if(!results) { return next(new Error('Error finding employee'));}

                    employeee = results;
                    console.log(employeee);
                    cb();

                });
            },
            nonemployee: function(cb){
                employeeDB.find({registrationToken: {$exists: true}, business: ObjectId(businessID)}, function (err,results){


                    if (err) { return next(err); }
                    if(!results) { return next(new Error('Error finding employee'));}

                    notemployee = results;
                    cb();
                });
            }
        },
        function(err,results){
            if(err){
                throw err;
            }
            res.render('staff/visitor',
                {
                    title: 'Visitor Queue',
                    notsigned: notemployee,
                    signed: employeee
                }
            )}
    )};
