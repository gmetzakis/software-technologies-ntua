var checkDate = function (mystring) {
    var re = /\d\d\d\d(0[1-9]|1[0-2])([12]\d|0[1-9]|3[01])/; // regular expression to match required date format
    return re.test(mystring)&&(mystring.length==8);
};

module.exports = {checkDate};