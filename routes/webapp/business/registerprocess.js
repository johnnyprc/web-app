/**
 * Created by sean on 2/18/2016.
 */
exports.get = function (req, res) {
    //if (!req.session.companyName) {
        res.render('business/registerprocess');
    //} else {
    //    res.render('business/registerprocess', {title: 'Express', companyName: req.session.companyName});
    //}
};
