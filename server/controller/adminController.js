const policyDb = require('../model/policy');

exports.find = async(req,res) => {
    policyDb.find()
    .then(policy => {
        res.send(policy)
    })
    .catch(err => {
        res.status(500).send({
            message:err.message || "error occured while retriving data"
        });
    });
}
