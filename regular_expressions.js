'use strict'

// Determine whether a string contains a nomor KTP
const has_ktp = (string) => {
  // ...
  let ktpRegex = /\d+\-\d+\-\d+/;
  let result = ktpRegex.test(string);
  return result;
}

console.log('has_ktp if it has what looks like a nomor KTP')
console.log(has_ktp("please don't share this: 234-60-1422") === true) // true

console.log("has_ktp if it doesn't have a nomor KTP")
console.log(has_ktp('please confirm your identity: XXX-XX-1422') === false) // true

// -----------------------------------------------------------------------------

// Return the Social Security number from a string.
const grab_ktp = (string) => {
  // ...
  let ktpRegex = /\d+\-\d+\-\d+/;
  if(ktpRegex.test(string) === true) {
    return string.match(ktpRegex).toString();
  } else {
    return null;
  }

}

console.log('grab_ktp returns nomor KTP if the string has an nomor KTP')
console.log(grab_ktp("please don't share this: 234-60-1422") === '234-60-1422') // true

console.log("grab_ktp if it doesn't have a nomor KTP")
console.log(grab_ktp('please confirm your identity: XXX-XX-1422') === null) // true

// -----------------------------------------------------------------------------

// Return all of the Social Security numbers from a string.
const grab_all_nomor_ktp = (string) => {
  // ...
  let ktpRegexGlobal = /\d+\-\d+\-\d+/g;
  let ktpNumContainer;
  if(ktpRegexGlobal.test(string) === true) {
    let ktpNums = string.match(ktpRegexGlobal);
    ktpNumContainer = ktpNums;
  } else {
    return [];
  }
  return ktpNumContainer;
}

console.log('grab_all_nomor_ktp returns all nomor KTP if the string has any nomor KTP')
console.log(grab_all_nomor_ktp('234-60-1422, 350-80-0744, 013-60-8762')) // return ["234-60-1422", "350-80-0744", "013-60-8762"])

console.log("grab_all_nomor_ktp returns an empty Array if it doesn't have any nomor KTP")
console.log(grab_all_nomor_ktp('please confirm your identity: XXX-XX-1422')) // return []

// -----------------------------------------------------------------------------

// Obfuscate all of the nomor KTP in a string. Example: XXX-XX-4430.
const hide_all_nomor_ktp = (string) => {
  // ...
  let ktpRegex = /(\d+)(\-)(\d+)/g;
  if (ktpRegex.test(string) === true) {
    return string.replace(ktpRegex, 'XXX-XX');
  } else {
    return string;
  }
  
}

console.log('hide_all_nomor_ktp obfuscates any nomor KTP in the string')
console.log(hide_all_nomor_ktp('234-60-1422, 350-80-0744, 013-60-8762')) // "XXX-XX-1422, XXX-XX-0744, XXX-XX-8762"

console.log('hide_all_nomor_ktp does not alter a string without nomor KTP in it')

let hideString = 'please confirm your identity: XXX-XX-1422'
console.log(hide_all_nomor_ktp(hideString) === hideString) // true

// -----------------------------------------------------------------------------

// Ensure all of the Social Security numbers use dashes for delimiters.
// Example: 480.01.4430 and 480014430 would both be 480-01-4430.
const format_nomor = (string) => {
  // ...
  let ktpPattern = /(\d{3})(\d{2})(\d{4})/;
  let nonCharRegex = /\W/g;
  let whiteSpaceCommaRegex = /[^\ \,]+/g;
  let onlyDigitRegex = /(\d+)/
  let containerOfKtp = [];
  
  let arrOfKtpNums = string.match(whiteSpaceCommaRegex);
  
  for(var i = 0; i < arrOfKtpNums.length; i++) {
    var insertDash = arrOfKtpNums[i].replace(nonCharRegex, '-');
    if(nonCharRegex.test(arrOfKtpNums[i]) === true) {
      containerOfKtp.push(insertDash);
    } else if(onlyDigitRegex.test(arrOfKtpNums[i]) === true) {
      let tempDigit = [];
      tempDigit.push(arrOfKtpNums[i]);
      if(tempDigit[0].length < 9) {
        return string;
      }
    }
    
   if(nonCharRegex.test(arrOfKtpNums[i]) === false) {
      var newKtpNumWithDash = arrOfKtpNums[i].replace(ktpPattern, '$1-$2-$3');
      containerOfKtp.push(newKtpNumWithDash);
   }
  }
  
  return containerOfKtp.join(', ');
  
}

console.log('format_nomor finds and reformat any nomor KTP in the string')
console.log(format_nomor('234601422, 350.80.0744, 013-60-8762') === '234-60-1422, 350-80-0744, 013-60-8762') // true

console.log('format_nomor does not alter a string without nomor KTP in it')

let formatString = 'please confirm your identity: 44211422'
console.log(format_nomor(formatString) === formatString) // true

module.exports = {
  has_ktp,
  grab_ktp,
  grab_all_nomor_ktp,
  hide_all_nomor_ktp
}
