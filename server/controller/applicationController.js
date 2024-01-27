
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
            "age",
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

exports.find = async (req, res) => {
    try {
        let status = req.query.status;
        let search = req.query.search;
        const pipeline = [];

        if (status) {
            pipeline.push({
                $match: {
                    status: status
                }
            });
        }

        if (search) {
            pipeline.push({
                $match: {
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                    ],
                },
            });
        }

        // If no status is provided, include a $match stage with an empty object to get all data
        pipeline.push({
            $match: {}
        });

        const result = await applicationDb.aggregate(pipeline).exec();
        res.send(result);

    } catch (err) {
        res.status(500).json({ error: 'Internal server error ' + err.message });
    }
};



// exports.update = async (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;

//     try {
//         const updatedApplication = await applicationDb.findByIdAndUpdate(
//             id,
//             { status },

//         );

//         if (!updatedApplication) {
//             return res.status(404).send({ message: 'Application not found' });
//         }

//         res.send(updatedApplication);
//     } catch (error) {
//         res.status(500).send({ message: 'Internal server error' });
//     }
// };


exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const application = await applicationDb.findById(id);
        if (!application) {
            return res.status(400).send({ message: `Error while updating status` });
        }
        // let avatarPath = application.avatars;
        const updatedStatus = {
            ...req.body,
            // avatars: avatarPath
        }
        const updated = await applicationDb.findByIdAndUpdate(id, updatedStatus, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

