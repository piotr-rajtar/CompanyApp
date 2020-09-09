const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const e = require('express');

describe('Employee', () => {

    const employee = {
        firstName: 'John',
        lastName: 'Doe',
        department: 'Marketing',
    };

    it('should throw an error if no arg given', () => {
        const singleEmployee = new Employee({});

        singleEmployee.validate(err => {
            expect(err.errors).to.exist;
        });
    });
    it('should throw an error if no "firstName" is given', () => {
        const singleEmployee = new Employee({ lastName: employee.lastName, department: employee.department});

        singleEmployee.validate(err => {
            expect(err.errors.firstName).to.exist;
        });
    });
    it('should throw an error if no "lastName" is given', () => {
        const singleEmployee = new Employee({ firstName: employee.firstName, department: employee.department});

        singleEmployee.validate(err => {
            expect(err.errors.lastName).to.exist;
        });
    });
    it('should throw an error if no "department" is given', () => {
        const singleEmployee = new Employee({ firstName: employee.firstName, lastName: employee.lastName});

        singleEmployee.validate(err => {
            expect(err.errors.department).to.exist;
        });
    });
    it('should throw an error if "firstName" is not a string', () => {
        const cases = [{}, []];

        for(let firstName of cases) {
            const singleEmployee = new Employee({ firstName: firstName, lastName: employee.lastName, department: employee.department });

            singleEmployee.validate(err => {
                expect(err.errors.firstName).to.exist;
            });
        }
    });
    it('should throw an error if "lastName" is not a string', () => {
        const cases = [{}, []];

        for(let lastName of cases) {
            const singleEmployee = new Employee({ firstName: employee.firstName, lastName: lastName, department: employee.department });

            singleEmployee.validate(err => {
                expect(err.errors.lastName).to.exist;
            });
        }
    });
    it('should throw an error if "department" is not a string', () => {
        const cases = [{}, []];

        for(let department of cases) {
            const singleEmployee = new Employee({ firstName: employee.firstName, lastName: employee.lastName, department: department });

            singleEmployee.validate(err => {
                expect(err.errors.department).to.exist;
            });
        }
    });
    it('should not throw any error if args are valid', () => {
        const singleEmployee = new Employee({ firstName: employee.firstName, lastName: employee.lastName, department: employee.department });

        singleEmployee.validate(err => {
            expect(err).not.exist;
        });
    });
});