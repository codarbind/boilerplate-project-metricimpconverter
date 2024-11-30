const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('correctly read a whole number input',function (){
        assert.equal(convertHandler.getNum('4gal'),4)
    })
    test('correctly read a decimal input',function (){
        assert.equal(convertHandler.getNum('5.1gal'),5.1)
    })

    test('correctly read a fractonal input',function (){
        assert.equal(convertHandler.getNum('1/2gal'),0.5)
    })

    test('correctly read a fractional input with decimal',function (){
        assert.equal(convertHandler.getNum('5.1/2gal'),2.55)
    })

    test('correctly return an error on a double-fraction', function () {
        assert.throws(() => convertHandler.getNum('5/1/2gal'), Error, 'invalid number');
      });

    test('correctly default to a numerical input of 1 when no numerical input is provided',function (){
        assert.equal(convertHandler.getNum('gal'),1)
    })
    
    test('correctly read each valid input unit - gal',function (){
        assert.equal(convertHandler.getUnit('3gal'),'gal')
    })

    test('correctly read each valid input unit - lbs',function (){
        assert.equal(convertHandler.getUnit('3.1/2lbs'),'lbs')
    })

    test('correctly read each valid input unit - kg',function (){
        assert.equal(convertHandler.getUnit('1/2kg'),'kg')
    })

    test('correctly return an error for an invalid input unit', function () {
        assert.throws(() => convertHandler.getUnit('5/1/2agala'), Error, 'invalid unit');
      });

      test('return the correct return unit for each valid input unit', function () {
        assert.equal(convertHandler.getReturnUnit('gal'),  'L');
      });
          test('correctly return the spelled-out string unit for each valid input unit', function () {
        assert.equal(convertHandler.getString(3.1,'mi',4.98895,'km'),  '3.1 miles converts to 4.98895 kilometers');
      });
             test('correctly convert mi to km', function () {
        assert.approximately(convertHandler.convert(3.1,'mi'), 4.98895,0.0000000000007);
      });

      test('correctly convert km to mi', function () {
        assert.approximately(convertHandler.convert(10,'km'),6.21373 ,0.0000000000007);
      });

      
      test('correctly convert lbs to kg', function () {
        assert.approximately(convertHandler.convert(10,'lbs'), 4.53592,0.0000000000007);
      });

      test('correctly convert kg to lbs', function () {
        assert.approximately(convertHandler.convert(1,'kg'), 2.20462,0.0000000000007);
      });

    });