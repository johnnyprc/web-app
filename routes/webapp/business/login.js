
exports.get = function(req, res) {
	req.logout();
    res.render('business/dashboard',{ message: req.flash("login")});
};


