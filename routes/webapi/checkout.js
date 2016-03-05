//TODO test this
/**
 * Finds specific checkin in database and removes it:
 * if checked in, state is set to roomed; if roomed, state is set to done.
 */
exports.put = function (req, res, next) {

    // grab our db object from the request
    var db = req.db;
    var queue = db.get('checkin_queue');
    // query the collection
    queue.find({_id:req.params.id},function(err,data){
        queue.remove({_id:req.params.id }, function(err, data) {
            if (err) { return res.sendStatus(500, err); }
            return res.json(200, data);
        });
    });

};
