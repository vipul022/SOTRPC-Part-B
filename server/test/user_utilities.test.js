const mongoose = require("mongoose");
const expect = require("expect");
const utilities = require("../utils/user_utilities");
const controller = require("../controllers/user_controller");
const User = require("../models/user");
const {
    connectToDb,
    disconnectFromDb
} = require('./config');

let userId = null;

// Use done to deal with asynchronous code - done is called when the hooks completes
before((done) => {
    // Connect to the database (same as we do in app.js)
    connectToDb(done);
});

after((done) => {
    disconnectFromDb(done);
})

// Set up test data before each test
beforeEach(async function () {
    // Load a test record in setupData
    // Use await so we can access the postId, which is used by some tests
    let user = await setupData();
    userId = user._id;
});

// Delete test data after each test
afterEach((done) => {
    // Execute the deleteMany query
    tearDownData().exec(() => done());
});



// TESTS

describe('getUsersFromDB with one user', () => {
    it('should get a user if one exists', async function () {
        let req = {
            query: {}
        };
        await utilities.getUsersFromDB(req).exec((err, users) => {
            expect(Object.keys(users).length).toBe(1);
        });
    });
    it('name of first user should be Zeb', async function () {
        let req = {
            query: {}
        };
        await utilities.getUsersFromDB(req).exec((err, users) => {
            expect(users[0].name).toBe('Zeb');
        });

    });
});

describe('addUser', (done) => {
    it('should add a new User', function (done) {
        // define a req object with expected structure
        const req = {
            body: {
                name: "Vipul",
                email: "vipul@vipul.com",
                phone: "032443382",
                password: "123123",
                address: "123 Fake st Spotswood 3015",
                paid: "awaiting",
                role: "admin"
            }
        }
        controller.addUser(req, res)
        expect(res.user.name).toBe(req.body.name);
        done();
    });

    // it('should fail if a required field is missing', function (done) {
    //     // define a req object with missing required field (phone)
    //     const req = {
    //         body: {
    //             name: "Jason",
    //             email: "jason@jason.com",
    //             // phone: "032443382",
    //             password: "123123",
    //             address: "43 Benbow St Yarraville 3013",
    //             paid: "paid",
    //             role: "admin"
    //         }
    //     }
    //     controller.addUser(req)
    //     if (err) {
    //         expect(err.message).toMatch(/validation/);
    //         done();
    //     } else {
    //         expect(true).toBe(false);
    //         done();
    //     }

    // });
});



// testdata
function setupData() {
    let testUser = {};
    testUser.name = 'Zeb';
    testUser.username = 'zeb@zeb.com';
    testUser.password = '123123'
    testUser.address = '52 Smith st Coburg 3423';
    testUser.phone = '0403023423';
    testUser.role = 'user';
    testUser.paid = 'not paid'
    return User.create(testUser);
}

function tearDownData() {
    return User.deleteMany();
}