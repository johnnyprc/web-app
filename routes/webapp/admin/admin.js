exports.get = function(req, res) {
    console.log('Get function admin');
    //req.logout();
    res.render('admin/admin',{
        message: req.flash("admin")
    });
};


