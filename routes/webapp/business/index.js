var express = require('express');
var router = express.Router();

//Define the controllers for checkin process
var landing = require('./landing');
var registerprocess = require('./registerprocess');
var theming = require('./theming');
var login = require('./login');
var formbuilder = require('./formbuilder');
var accountSettings = require('./accountsettings');
var uploadLogo = require('./uploadlogo');
var register = require('./register');
var dashboard = require('./dashboard');
var registerDevice = require('./registerdevice');
var addEmployees = require('./addemployees');
var employeeRegister = require('./employeeregister');
var viewForm = require('./viewform');
var customizeTheme = require('./customize_theme');
var manageForms = require('./manage_forms');
var businesssetting = require('./businesssetting');
var setdisclosure = require('./setdisclosure');

module.exports = function (passport) {



    //Pass in passport

    //Setup the routes
    router.get('/', landing.get);
    router.post('/', landing.post);

    router.get('/registerprocess', registerprocess.get);
    router.post('/registerprocess', registerprocess.post);

    router.get('/theming', isLoggedInBusAdmin, theming.get);

    router.get('/login', login.get);
    router.post('/login', passport.authenticate('local-login'),
        function(req, res) {
            if (req.user.role === 'busAdmin') {
                console.log("Loggin in as Business Admin");
                res.redirect('/dashboard');
            }
            if (req.user.role === 'saasAdmin') {
                console.log("Loggin in as SAAS Admin");
                res.redirect('/dashboard');
            }
            if (req.user.role === 'provider') {
                console.log("Loggin in as Provider");
                res.redirect('/addemployees');
            }
            if (req.user.role === 'staff') {
                console.log("Loggin in as staff");
                res.redirect('/dashboard');
            }
            if (req.user.role === 'visitor') {
                console.log("Loggin in as visitor");
                res.redirect('/addemployees');
            }

        });

    router.get('/formbuilder',isLoggedInBusAdmin, formbuilder.get);


    router.get('/accountSettings', isLoggedInBusAdmin, accountSettings.get);
    router.post('/accountSettings', isLoggedInBusAdmin, accountSettings.post);

    router.get('/businesssetting', isLoggedInBusAdmin, businesssetting.get);
    router.post('/businesssetting', isLoggedInBusAdmin,businesssetting.post);


    router.get('/uploadlogo', isLoggedInBusAdmin, uploadLogo.get);
    router.post('/uploadlogo', isLoggedInBusAdmin, uploadLogo.post);

    router.get('/register', register.get);
    router.post('/register',passport.authenticate('local-signup',{
        //session: false,
        successRedirect : '/registerprocess', // redirect to the secure profile section
        failureRedirect : '/register' // redirect back to the signup page if there is an error
    }));

    router.get('/dashboard', isLoggedInBusAdmin, dashboard.get);

    router.get('/registerdevice', isLoggedInBusAdmin, registerDevice.get);

    router.get('/addemployees',isLoggedInVisitor, addEmployees.get);
    //router.post('/addemployees',isLoggedInBusAdmin, addEmployees.post);

    router.get('/customizetheme', isLoggedInBusAdmin, customizeTheme.get);

    router.get('/manageforms', isLoggedInBusAdmin, manageForms.get);

    router.get('/employeeregister', employeeRegister.get);
    router.post('/employeeregister', passport.authenticate('local-signup-employee',{
        //session: false,
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/register' // redirect back to the signup page if there is an error
    }));

    router.get('/viewform/:id', viewForm.get);

    router.get('/setdisclosure', isLoggedInBusAdmin, setdisclosure.get);
    router.post('/setdisclosure', isLoggedInBusAdmin, setdisclosure.post);

function isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }

        res.redirect('/');
}

// route middleware to make sure a user is logged in
function isLoggedInSaaSAdmin(req, res, next) {
        //if user is authenticated in the session, carry on
        if (req.isAuthenticated() && (req.user[0].role === 'saasAdmin')){
            return next();
        }
        req.flash("permission", "You do not have permission to access that page");
        // if they aren't redirect them to the home page
        res.redirect('back');
    }
function isLoggedInBusAdmin(req, res, next) {
    //if user is authenticated in the session, carry on
    console.log('In isloggedinbusadmin');
    if (req.isAuthenticated() && ((req.user[0].role === 'busAdmin') || (req.user[0].role === 'saasAdmin'))){
        console.log('HOLY FUCK AM I HERE');

        console.log('HOLY FUCK I AM');

        return next();
    }
    //console.log(user[0]);
    //console.log(user[1]);
    console.log(req.isAuthenticated());
    console.log('HOLY FUCK its not working');
    req.flash("permission", "You do not have permission to access that page");
    // if they aren't redirect them to the home page
    res.redirect('back');
}

function isLoggedInProvider(req, res, next) {
        //if user is authenticated in the session, carry on
        if (req.isAuthenticated() && ((req.user[0].role === 'provider') || (req.user[0].role === 'saasAdmin'))){
            return next();
        }
        req.flash("permission", "You do not have permission to access that page");
        // if they aren't redirect them to the home page
        res.redirect('back');
}
function isLoggedInStaff(req, res, next) {
        //if user is authenticated in the session, carry on
        if (req.isAuthenticated() && ((req.user[0].role === 'staff') || (req.user[0].role === 'saasAdmin'))){
            return next();
        }
        req.flash("permission", "You do not have permission to access that page");
        // if they aren't redirect them to the home page
        res.redirect('back');
}
function isLoggedInVisitor(req, res, next) {
        //if user is authenticated in the session, carry on
        if (req.isAuthenticated() && ((req.user[0].role === 'visitor') || (req.user[0].role === 'saasAdmin'))){
            return next();
        }
        req.flash("permission", "You do not have permission to access that page");
        // if they aren't redirect them to the home page
        res.redirect('back');
}
    return router;
};
