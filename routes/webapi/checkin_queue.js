//TODO Open connection to the db
//TODO Figure out what file to create collection
//TODO test this
/**
 * Obtains all visitors from the list of those checked in.
 */
exports.get = function (req, res) {
    var db = req.db;
    var queue = db.get('checkin_queue');

    queue.find( {},
        {sort : {date: 1}}, function (err, results) {
        if (err) {
            console.error('MongoDB Error in /api/checkin_queue: ' + err);
            return res.send(500);
        }
        res.json(results);
    });
};
