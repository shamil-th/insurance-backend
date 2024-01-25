
const multer = require('multer');
const path = require('path');
const applicationDb = require('../model/application');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "avatars");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const upload = multer({ storage: storage }).single("avatars");

exports.create = async (req, res) => {

    upload(req, {}, async (error) => {
        if (error instanceof multer.MulterError) {
            return res.status(400).json({ error: "image error" + error });
        } else if (error) {
            return res.status(500).json({ error: "server error" + error })
        }
        const status = 'pending';
        const requireFields = [
            "salutation",
            "name",
            "email",
            "gender",
            "dob",
            "address",
            "qualification",
            "profession",
            "nominee",
            "relation",
            "insuranceId",
        ];
        for (const field of requireFields) {
            if (!req.body[field]) {
                return res
                    .status(400)
                    .send({ message: `Error: Missing ${field} field` });
            }
        }

        const avatars = req.file.path;

        const application = new applicationDb({
            ...req.body,
            status: status,
            avatars: avatars
        });

        application
            .save(application)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "some error occured during creating application"
                })
            })

    });

};

exports.find = async (req,res) => {
    applicationDb.find()
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cannot find applications` });
            } else {
                res.send(data)
            }
        }).catch(err => {
            res.status(500).json({ error: 'Internal server error' + err });
        })
}


