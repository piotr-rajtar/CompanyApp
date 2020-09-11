const Employee = require('../employee.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {

    before(async () => {
        try {
            const fakeDB = new MongoMemoryServer();
            const uri = await fakeDB.getUri();

            await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        }
        catch(err) {
            console.log(err);
        }
    });

    describe('Reading data', () => {

        before(async () => {
            const testEmpOne = new Employee({ firstName: 'name #1', lastName: 'lastname #1', department: 'department #1'});
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'name #2', lastName: 'lastname #2', department: 'department #2'});
            await testEmpTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });

        it('should return proper document by various params with "findOne" method', async () => {
            const firstEmployeeCheck = await Employee.findOne({ firstName: 'name #1' });
            const secondEmployeeCheck = await Employee.findOne({ lastName: 'lastname #1' });
            const thirdEmployeeCheck = await Employee.findOne({ department: 'department #1' });

            const firstExpectedCheck = 'name #1';
            const secondExpectedCheck = 'lastname #1';
            const thirdExpectedCheck = 'department #1';

            expect(firstEmployeeCheck.firstName).to.be.equal(firstExpectedCheck);
            expect(secondEmployeeCheck.lastName).to.be.equal(secondExpectedCheck);
            expect(thirdEmployeeCheck.department).to.be.equal(thirdExpectedCheck);
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Creating data', () => {
        
        it('should insert new document with "insertOne" method', async () => {
            const employee = new Employee({ firstName: 'name #1', lastName: 'lastname #1', department: 'department #1'});
            await employee.save();
            expect(employee.isNew).to.be.false;
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Updating data', () => {

        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'name #1', lastName: 'lastname #1', department: 'department #1'});
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'name #2', lastName: 'lastname #2', department: 'department #2'});
            await testEmpTwo.save();
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'name #1' }, { $set: { firstName: '=name 1=' }});
            const updatedEmployee = await Employee.findOne({ firstName: '=name 1=' });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update one document with "save" method', async () => {
            const employee = new Employee({ firstName: 'name #1', lastName: 'lastname #1', department: 'department #1'});
            employee.firstName = '=name 1=';
            await employee.save();

            const updatedEmployee = await Employee.findOne({ firstName: '=name 1=' });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
            const employees = await Employee.find({ firstName: 'Updated!' });
            const expectedLength = 2;

            expect(employees.length).to.be.equal(expectedLength);
        });
    });

    describe('Removing data', () => {

        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'name #1', lastName: 'lastname #1', department: 'department #1'});
            await testEmpOne.save();

            const testEmpTwo = new Employee({ firstName: 'name #2', lastName: 'lastname #2', department: 'department #2'});
            await testEmpTwo.save();
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ firstName: 'name #1' });
            const removedEmployee = await Employee.findOne({ firstName: 'name #1' });
            expect(removedEmployee).to.be.null;
        });

        it('should properly remove one document with "remove" method', async () => {
            const employee = await Employee.findOne({ firstName: 'name #1' });
            await employee.remove();

            const removedEmployee = await Employee.findOne({ firstName: 'name #1' });
            expect(removedEmployee).to.be.null;
        });

        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const employess = await Employee.find();
            const expectedLength = 0;
            expect(employess.length).to.be.equal(expectedLength);
        });

    });
});