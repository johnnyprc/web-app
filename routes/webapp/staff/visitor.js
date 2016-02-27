/**
 * Created by sean on 2/26/2016.
 */
exports.get = function(req, res) {
    console.log('Get function visitor');
    res.render('staff/visitor',{
    });
};
