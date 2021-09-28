const moment = require('moment');
var min10 = moment().subtract(10, 'minutes');
var database = moment(('2021-08-13T16:02:42.000Z').replace('Z', ' ').replace('T', ' '))
console.log(min10.format('YYYY-MM-DD HH:mm:ss'))
console.log(database.format('YYYY-MM-DD HH:mm:ss'))
// console.log(datab.format('YYYY-MM-DD HH:mm:ss'))
console.log(min10 <= database)