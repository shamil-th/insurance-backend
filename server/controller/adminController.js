const policyDb = require('../model/policy');

// exports.create = (req, res) => {

//     const requiredFields = [
//         "insurance",
//         "amount",
//         "details"
//     ]
//     for (const field of requiredFields) {
//         if (!req.body[field]) {
//             return res.status(400)
//                 .send({ message: `missing ${field} field` })
//         }
//     }
//     const policy = new policyDb({
//         ...req.body,
//     })

//     policy.save(policy)
//         .then(data => {
//             res.send(data)
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "some error occured during creating policy"
//             })
//         });

// };

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
