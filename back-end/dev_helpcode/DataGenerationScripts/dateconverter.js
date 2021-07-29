function datetimecovert(s){
  let something  = s;
  let day = something.slice(5,8);
  let month = something.slice(8,12);
  let year = something.slice(12,17);
  let time = something.slice(17,26);
  let total = year + '-' + month + '-' + day + ' ' + time
  return total
}
