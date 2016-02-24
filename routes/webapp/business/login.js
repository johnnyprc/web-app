
exports.get = function(req, res) {
	req.logout();
    res.render('business/register',{ message: req.flash("login")});
};


