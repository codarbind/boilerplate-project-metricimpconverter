'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req,res)=>{
      try{
          let input = req.query.input
          let initNum = convertHandler.getNum(input)
          let initUnit = convertHandler.getUnit(input)
          let returnNum = convertHandler.convert(initNum,initUnit)
          let returnUnit = convertHandler.getReturnUnit(initUnit)
          let string = convertHandler.getString(initNum,initUnit,returnNum,returnUnit)
          return res.send({ initNum, initUnit, returnNum, returnUnit, string })
      }catch(err){
        console.log(err)
        return res.status(400).send(err)
      }
  })

};
