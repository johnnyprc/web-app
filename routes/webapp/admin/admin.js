exports.get = function (req, res) {
    console.log('Get function get businesses');
    var database = req.db;
    var businessDB = database.get('businesses');
    var bid = req.user[0].business;

    businessDB.find()
        .on('success', function(businesses) {

            res.render('admin/admin', {
                bizz: businesses,
                message: req.flash("permission")
            });

        });
};
