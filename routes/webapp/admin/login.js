
// exports.get = function(req, res) {
//     console.log('Get function login');
// 	//req.logout();
//     res.render('business/dashboard',{
//         message: req.flash("login")
//     });
// };
exports.post =  function(req, res) {
            if (req.user.role === 'busAdmin') {
                console.log("Loggin in as Business Admin");
                res.redirect('/registerprocess');
            }
            else if (req.user.role === 'saasAdmin') {
                console.log("Loggin in as SAAS Admin");
                res.redirect('/registerprocess');
            }
            else if (req.user.role === 'provider') {
                console.log("Loggin in as Provider");
                res.redirect('/registerprocess');
            }
            else if (req.user.role === 'staff') {
                console.log("Loggin in as staff");
                res.redirect('/registerprocess');
            }
            else if (req.user.role === 'visitor') {
                console.log("Loggin in as visitor");
                res.redirect('/registerprocess');
            }
            else {
                res.redirect('/register');
                req.flash("Invalid", "Invalid email and/or password");
            }
        };

