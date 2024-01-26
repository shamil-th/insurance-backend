const mongoose = require('mongoose');
const policyDb = require('./server/model/policy');

mongoose.connect('mongodb+srv://admin:1234@cluster0.xoy8sbf.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!!');
    })
    .catch((err) => {
        console.log(err);
    });

const seedDb = async () => {
    const policy = [
        {
            insurance: "Health",
            amount: 1200,
            details: "health insurance",
        },
        {
            insurance: "Vehicle",
            amount: 1000,
            details: "Vehicle insurance",
        },
        {
            insurance: "Life",
            amount: 2000,
            details: "Life insurance",
        }
    ];

    await policyDb.deleteMany({});
    await policyDb.insertMany(policy);
};

seedDb().then(() => {
    mongoose.connection.close();
});
