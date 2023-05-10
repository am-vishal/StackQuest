module.exports.isNaN = (value) => Object.is(value, NaN);

module.exports.isObject = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value); // isObject = (value) => Object.prototype.toString.call(value) === "[object Array]";

module.exports.isArray = (value) => Array.isArray(value);

module.exports.isUndefinedOrNull = (value) =>
  value === undefined || value === null;

module.exports.isNullOrEmpty = (value) =>
  this.isUndefinedOrNull(value) || value.toString() === "";

module.exports.isNullorWhiteSpace = (value) =>
  this.isNullOrEmpty(value) || value.toString().trim().length === 0;

module.exports.isArrayOrObjectEmpty = (value) => {
  if (this.isNullorWhiteSpace(value) || this.isNaN(value)) {
    return true;
  }
  if (!this.isNullorWhiteSpace(value)) {
    if (this.isArray(value)) {
      if (value.length === 0) {
        return true;
      }
    }
    if (this.isObject(value)) {
      if (Object.keys(value).length === 0) {
        return true;
      }
    }
  } else {
    return true;
  }
  return false;
};

// module.exports.isArrayOrObjectEmpty = (value) => {
//   if (this.isNullorWhiteSpace(value) || this.isNaN(value)) return true;
//   if (this.isArray(value) || this.isObject(value)) return _.isEmpty(value);
//   return false;
// };

// *use it on onKeyDown event | Example:- onKeyDown={ERPUtils.preventExpoAndArithmetic}
module.exports.preventExpoAndArithmetic = (e) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

// *use these 4 methods while setting state on "onInputHandler"
// *Example:- newState.data.[name] = ERPUtils.replaceNonNumeric(value);
module.exports.replaceNonNumeric = (input) => input.replace(/[^0-9.]/g, "");

module.exports.replaceNonAlphabet = (input) =>
  this.replaceMultipleSpaceToSingle(input.replace(/[^A-Z a-z]/g, ""));

module.exports.replaceNonAlphanumeric = (input) =>
  this.replaceMultipleSpaceToSingle(input.replace(/[^A-Za-z 0-9]/g, ""));

module.exports.replaceNonSentenceKey = (input) =>
  this.replaceMultipleSpaceToSingle(input.replace(/[^A-Za-z 0-9 .,-?'"]/g, ""));

module.exports.replaceMultipleSpaceToSingle = (input) =>
  input.trimStart().replace(/ +/g, " ");
