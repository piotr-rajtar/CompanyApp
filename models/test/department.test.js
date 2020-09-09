const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {

    it('should throw an error if no "name" arg', () => {
        const singleDepartment = new Department({});

        singleDepartment.validate(err => {
            expect(err.errors.name).to.exist;
        });
    });

    it('should throw an error if "name" is not a string', () => {
        const cases = [{}, []];

        for(let name of cases) {
          const singleDepartment = new Department({ name });
      
          singleDepartment.validate(err => {
            expect(err.errors.name).to.exist;
          });
        }
    });
    it('should throw an error if "name" length is to short/long', () => {
        const cases = ['a', 'ab', 'abc', 'abcd', 'Department of highest intelligence'];

        for(let name of cases) {
          const singleDepartment = new Department({ name });
      
          singleDepartment.validate(err => {
            expect(err.errors.name).to.exist;
          });
        }
    });
    it('should not throw any error if "name" is valid', () => {
        const cases = ['abcde', 'Marketing', 'Testing', 'Management'];

        for(let name of cases) {
          const singleDepartment = new Department({ name });
      
          singleDepartment.validate(err => {
            expect(err).not.exist;
          });
        }
    });
});


