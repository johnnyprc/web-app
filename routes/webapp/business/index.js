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

    router.get('/theming', isLoggedInBusiness, theming.get);

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

    router.get('/formbuilder',isLoggedIn, formbuilder.get);


    router.get('/accountSettings', isLoggedIn, accountSettings.get);
    router.post('/accountSettings', isLoggedIn, accountSettings.post);

    router.get('/businesssetting', isLoggedInBusiness, businesssetting.get);
    router.post('/businesssetting', isLoggedInBusiness,businesssetting.post);


    router.get('/uploadlogo', isLoggedInBusiness, uploadLogo.get);
    router.post('/uploadlogo', isLoggedInBusiness, uploadLogo.post);

    router.get('/register', register.get);
    router.post('/register',passport.authenticate('local-signup',{
        session: false,
        successRedirect : '/registerprocess', // redirect to the secure profile section
        failureRedirect : '/register' // redirect back to the signup page if there is an error
    }));

    router.get('/dashboard', isLoggedIn, dashboard.get);

    router.get('/registerdevice', isLoggedIn, registerDevice.get);

    router.get('/addemployees',isLoggedInBusiness, addEmployees.get);
    //router.post('/addemployees',isLoggedInBusiness, addEmployees.post);

    router.get('/customizetheme', isLoggedIn, customizeTheme.get);

    router.get('/manageforms', isLoggedInBusiness, manageForms.get);

    router.get('/employeeregister', employeeRegister.get);
    router.post('/employeeregister', passport.authenticate('local-signup-employee',{
        session: false,
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/register' // redirect back to the signup page if there is an error
    }));

    router.get('/viewform/:id', viewForm.get);

    router.get('/setdisclosure', isLoggedInBusiness, setdisclosure.get);
    router.post('/setdisclosure', isLoggedInBusiness, setdisclosure.post);

    function isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }

        res.redirect('/');
    }

// route middleware to make sure a user is logged in
    function isLoggedInBusiness(req, res, next) {
        //if user is authenticated in the session, carry on
        if (req.isAuthenticated()&& (req.user[0].role === 'busAdmin')){
            console.log("Something actualy differev");
            return next();
        }
        console.log("Fail");
        req.flash("permission", "You do not have permission to access that page");
        // if they aren't redirect them to the home page
        res.redirect('back');
    }

    function businessLogin(req, res, next) {

        return passport.authenticate('local-login',{
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/register' // redirect back to the signup page if there is an error
        })
    }


    function test(req, res, next) {

        console.log("hi");
    }



    return router;
};

