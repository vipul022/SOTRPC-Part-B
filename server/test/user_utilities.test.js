const mongoose = require("mongoose");
const expect = require("expect");
const user_utilities = require("../utils/user_utilities");
// const controller = require("../controllers/user_controller");
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
    // Load a test records in setupData
    // Use await so we can access the postId, which is used by some tests
    let users = await setupUsers();
    userId = users[0]._id;
});

// Delete test data after each test
afterEach((done) => {
    // Execute the deleteMany query
    tearDownUsers().exec(() => done());
});



// TESTS

describe('getUsersFromDB with two users', () => {
    it('should get 2 users', async function () {
        let req = {
            query: {}
        };
        await user_utilities.getUsersFromDB(req).exec((err, users) => {
            expect(Object.keys(users).length).toBe(2);
        });
    });
    it('name of first user should be Zeb', async function () {
        let req = {
            query: {}
        };
        await user_utilities.getUsersFromDB(req).exec((err, users) => {
            expect(users[0].name).toBe('Zeb');
        });

    });
});

describe('addUser', (done) => {
    it('should add a new User', function (done) {
        // define a req object with new user data
        const req = {
            body: {
                name: "Vipul",
                email: "vipul@vipul.com",
                phone: "032443382",
                password: "123123",
                address: "123 Fake st Spotswood 3015",
            }
        }
        user_utilities.addUserToDB(req).save((err, user) => {
            expect(user.name).toBe(req.body.name);
            done();
        })

    });
    it('should fail if a required field is missing', function (done) {
        // define a req object with missing required field (phone)
        const req = {
            body: {
                name: "Jason",
                email: "jason@jason.com",
                // phone: "032443382",
                password: "123123",
                address: "43 Benbow St Yarraville 3013",
                paid: "paid",
                role: "admin"
            }
        }
        user_utilities.addUserToDB(req).save((err, user) => {
            if (err) {
                expect(err.message).toMatch(/validation/);
                done();
            } else {
                expect(true).toBe(false);
                done();
            }
        });
    });   
});

describe('deleteUser', (done) => {
    it('should delete the first User', function (done) {
        //id from setup user[0]
        const id = userId
        user_utilities.deleteUserFromDB(id).exec(() => {
            User.findById(id).exec(( err, user ) => {
                expect(user).toBe(null);
            })
            done();
        })
    });  
});

describe('get one User FromDB', (done) => {
    it('get one User FromDB', function (done) {
        //id from setup user
        const id = userId
        user_utilities.getUserFromDB(id).exec((err, user) => {
                expect(user.email).toBe('zeb@zeb.com');
            done();
        })
    });  
});

describe('editUserFromDB', (done) => {
    it('should update a Users field', function (done) {
        // define a req object with new user data
        const req = {
            body: {
                name: "Zeb",
                email: "zeb@zeb.com",
                phone: "666666666",
                password: "123123",
                address: "52 Smith st Coburg 3423",
            },
            params: {
                id: userId
            }
        }
        user_utilities.editUserFromDB(req).exec((err, user) => {
            expect(user.phone).toBe("666666666");
            done();
        })

    });
});


// testdata
function setupUsers() {
    let testUser = {};
    testUser.name = 'Zeb';
    testUser.email = 'zeb@zeb.com';
    testUser.password = '123123'
    testUser.address = '52 Smith st Coburg 3423';
    testUser.phone = '0403023423';
    testUser.role = 'user';
    testUser.paid = 'not paid'
    let testUser2 = {};
    testUser2.name = 'Harry';
    testUser2.email = 'harry0harry.com';
    testUser2.password = '123123'
    testUser2.address = '52 Smith st Coburg 3423';
    testUser2.phone = '0403023423';
    testUser2.role = 'user';
    testUser2.paid = 'not paid'
    return User.create([testUser, testUser2]);
}



function tearDownUsers() {
    return User.deleteMany();
}