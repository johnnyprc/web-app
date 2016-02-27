exports.get = function(req, res) {
    console.log('Get function admin');
    //req.logout();
    res.render('business/admin',{
        message: req.flash("admin")
    });
};


