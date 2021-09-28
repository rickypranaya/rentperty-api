const mysql = require('mysql');

var today = new Date();
var now = today.toISOString().slice(0, 19).replace('T', ' ');
var date = '2021-08-02 12:12:12';

// const pool = mysql.createPool({
//     connectionLimit : 10,
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database:'rentperty',
//     port: '3306'
// })

const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b5eee8daf2670d',
    password: '45d6b9ad',
    database:'heroku_dfcfd85eed3cac5',
    port: '3306'
})

let rentpertydb ={};

rentpertydb.users = ()=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM users', (err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

rentpertydb.users_add = (params)=>{
    return new Promise((resolve,reject)=>{
        let sql = "INSERT INTO `users` (`type`, `first_name`, `last_name`, `email`, `calling_code`, `phone`, `password`, `created_at`) VALUES (?)"
        pool.query(sql,[[params.type, params.first_name, params.last_name, params.email, params.calling_code, params.phone, params.password, params.created_at]], (err,results)=>{
            if (err){
                return reject (err);
                console.log('error')

            } 
            console.log(results)
            return resolve (results);
        })
    })
};

rentpertydb.agent_add = (params, user_id)=>{
    return new Promise((resolve,reject)=>{
        let sql = "INSERT INTO `agency` (`user_id`, `name`, `license`, `salesperson`) VALUES (?)"
        pool.query(sql,[[user_id, params.agency, params.license, params.salesperson]], (err,results)=>{
            if (err){
                return reject (err);
                console.log('error')

            } 
            console.log('user inserted')
            return resolve (results);
        })
    })
};

rentpertydb.users_one = (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM users where id = ?',[id], (err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results[0]);
        })
    })
};

rentpertydb.login_phone = (params)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM users where phone = ? and password = ?', [params.username, params.password],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

rentpertydb.login_email = (params)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM users where email = ? and password = ?', [params.username, params.password],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

module.exports = rentpertydb;