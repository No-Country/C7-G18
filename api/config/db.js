const Mysqli = require('mysqli');

// DATABASE CONNECTION
let conn = new Mysqli( {
    host:'85.10.205.173',
    post:3306,
    user:'petshopc7g18',
    passwd:'tk.9Zy9K7dGY935',
    db:'petshopc7g18'
    // host:'localhost',
    // post:3306,
    // user:'root',
    // passwd:'',
    // db:'petshoofhorror'
})

let db = conn.emit(false,'');

module.exports = {
    database: db
};