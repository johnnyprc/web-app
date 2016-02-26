
exports.get = function (req, res) {
    console.log('Get function REGISTER');
	if (!req.session.companyName) {
        console.log('Get function company name not found');
        res.render('business/register');
    } else {
        console.log('Get function company found');
        res.render('business/register', {
            title: 'Express',
            companyName: req.session.companyName
        });
    }
};
