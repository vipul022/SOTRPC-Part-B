const mongoose = require("mongoose");
const expect = require("expect");
// const utilities = require("../utils/user_utilities");
// const controller = require("../controllers/user_controller");
// const User = require("../models/user");
const utilities = require("../utils/pottery_classes_utilities");
const PotteryClass = require("../models/pottery_classes")
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
    let potClass = await setupData();
    classId = potClass._id;
});

// Delete test data after each test
afterEach((done) => {
    // Execute the deleteMany query
    tearDownData().exec(() => done());
});



// TESTS

describe('addClassToDB', (done) => {
    it('should add a new class', function () {
        // define a req object with expected structure
        const req = {
            body: {
                title: "pottery101",
                description: "This is a class that will teach you pottery yay",
                time: "every wed at 7pm",
                teacher: "Harold Plumpkin",
                maxNumber: 5
            }
        }
        let potteryClass = utilities.addClassToDB(req)
        expect(potteryClass.title).toBe(req.body.title)
    });
});

describe('getClassesFromDB with one class', () => {
    it('should get a class if one exists', async function () {
        let req = {
            query: {}
        };
        await utilities.getClassesFromDB(req).exec((err, potteryClasses) => {
            expect(Object.keys(potteryClasses).length).toBe(1);
        });
    });
    it('name of first teacher should be Mr Smith', function () {
        let req = {
            query: {}
        };
        utilities.getClassesFromDB(req).exec((err, potteryClasses) => {
            expect(potteryClasses[0].teacher).toBe('Mr Smith');
        });

    });
});

describe('editClassFromDB', () => {
    it('should change the teacher to Peggy Stacy', async function () {
        let req = {
            params: {
                id: classId
            },
            body: {
                teacher: "Peggy Stacy"
            }
        };
            const potteryClass = await utilities.editClassFromDB(req)
            expect(potteryClass.teacher).toBe("Peggy Stacy");
            
    });
});

describe('deleteClassFromDB', (done) => {
    it('should delete the specified class', function (done) {
        utilities.deleteClassFromDB(classId).exec(() => {
            PotteryClass.findById(classId).exec((err, potteryClass) => {
                expect(potteryClass).toBe(null);
                done();
            });
        });
    });
});


// testdata
function setupData() {
    let testClass = {};
    testClass.title = 'test class';
    testClass.description = 'test class description';
    testClass.maxNumber = 12;
    testClass.teacher = 'Mr Smith';
    testClass.time = '4:30pm on a friday';
    return PotteryClass.create(testClass);
}

function tearDownData() {
    return PotteryClass.deleteMany();
}

