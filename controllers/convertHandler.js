function ConvertHandler() {

  this.possibleUnits=['gal','l','km','mi','kg','lbs',]
  this.unitCounterpart = {gal:'l',l:'gal',km:'mi',mi:'km',kg:'lbs',lbs:'kg'}
  this.unitName = {gal:'gallon',l:'litre',km:'kilometer',mi:'mile',kg:'kilogram',lbs:'pound'}
  this.pluralize = (quantity)=>{return quantity>1?'s':''}
  this.getNum = function(input) {
    let result;
    const unit = this.getUnit(input)
    let allNum = input.split(unit)[0]
    //check for double fraction
    if(allNum.indexOf('/') != allNum.lastIndexOf('/')){
      throw new Error('bad input')
    }
    if(allNum.length ==0) return 1
    let allNumSplit = allNum.split('.')

    if(allNumSplit.length ==1){
      let fractional = allNumSplit[0]
if(fractional.includes('/')){
  let fractionalParts = fractional.split('/')
let decimal = fractionalParts[0]/fractionalParts[1]
return  + decimal
}

      return Number(allNumSplit[0])
    }  
    
    let wholeNumber = allNumSplit[0]
    let decimalPart = allNumSplit[1]
    let decimal
    if(!decimalPart.includes('/')){
    decimal = Number(decimalPart)
    result = Number(wholeNumber)+(decimal/(10**decimal.toString.length))
    return result;
    }else{
      let fractionalParts = decimalPart.split('/')
      decimal = fractionalParts[0]/fractionalParts[1]
      return Number(wholeNumber) + decimal
    }


  };
  
  this.getUnit = function(input) {
    let lowerInput = input.toLowerCase()
    let result = this.possibleUnits.find(unit =>{    
      let primaryIndex = lowerInput.indexOf(unit)
      if(!primaryIndex<0) return false
        let endsWithUnit = lowerInput.endsWith(unit)
      if(!endsWithUnit)return false
        let before = lowerInput[ primaryIndex- 1  ]

        if(before==undefined) return true
      if(!(Number(before)+1))return false
       
      return true
    })

    if(!result)throw new Error('bad unit')
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = this.unitCounterpart[initUnit];
    result=result=='l'?'L':result
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let converions = {gal:galToL,lbs:lbsToKg,mi:miToKm,li:1/galToL,kg:1/lbsToKg,km:1/miToKm}
    let result=initNum*converions[initUnit];
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = `${initNum} ${this.unitName[initUnit]+this.pluralize(initNum)} converts to ${returnNum} ${this.unitName[returnUnit]+this.pluralize(returnNum)}`
    return result;
  };
  
}

module.exports = ConvertHandler;
