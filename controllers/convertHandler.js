function ConvertHandler() {

  this.possibleUnits=['gal','l','km','mi','kg','lbs',]
  this.unitCounterpart = {gal:'l',l:'gal',km:'mi',mi:'km',kg:'lbs',lbs:'kg'}
  this.unitName = {gal:'gallon',l:'liter',km:'kilometer',mi:'mile',kg:'kilogram',lbs:'pound'}
  this.pluralize = (quantity)=>{return quantity>1?'s':''}


  this.getNum = function(input) {
    let unit,error=0;
    try{ 
      
      unit = this.getUnit(input)

    }catch(err){
      if (err.message = 'invalid unit' ) error++
    }
    const lowerInput= input.toLowerCase()

    // Match the numbers and letters separately
    let match = lowerInput.match(/([a-zA-Z]+)$/);
    let letters , numbers
    console.log(match);
    if (match) {

       letters = match[1]; 
       numbers =  lowerInput.split(letters)[0]     

    } else {
      console.log('Input format is incorrect.');
    }

    // if(!Number(numbers) ){
    //   if(error>0) throw new Error('invalid number andd unit') 
    //     throw new Error('invalid number')
    // }
    let allNum = numbers
    //check for double fraction
    if(allNum.indexOf('/') != allNum.lastIndexOf('/')){
      if(error>0) throw new Error('invalid number and unit') 
      throw new Error('invalid number')
    }

    if(allNum.length ==0){
      if(error>0) throw new Error('invalid unit') 
      return 1
    }
    let allNumSplit = allNum.split('/')

    if(allNumSplit.length ==1){
      let numerator = allNumSplit[0]
      if(!Number(numerator)){
        if(error>0) throw new Error('invalid number and unit') 
         throw new Error('invalid number')
        }
        if(error>0) throw new Error('invalid unit') 
      return Number(numerator)
    }else{
          let wholePart = allNumSplit[0]
    let denominator = allNumSplit[1]
    if(error>0) throw new Error('invalid unit') 
return Number(wholePart)/Number(denominator)


    }
    

    // let decimal
    // if(!decimalPart.includes('/')){
    // decimal = Number(decimalPart)
    // result = Number(wholeNumber)+(decimal/(10**decimal.toString.length))
    // return result;
    // }else{
    //   let fractionalParts = decimalPart.split('/')
    //   decimal = fractionalParts[0]/fractionalParts[1]
    //   return Number(wholeNumber) + decimal
    // }


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

    if(!result)throw new Error('invalid unit')
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
    let converions = {gal:galToL,lbs:lbsToKg,mi:miToKm,l:1/galToL,kg:1/lbsToKg,km:1/miToKm}
    let result=initNum*converions[initUnit];
    
    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = `${Number(initNum.toFixed(5))} ${this.unitName[initUnit]+this.pluralize(initNum)} converts to ${returnNum} ${this.unitName[returnUnit.toLowerCase()]+this.pluralize(returnNum)}`
    return result;
  };
  
}

module.exports = ConvertHandler;
