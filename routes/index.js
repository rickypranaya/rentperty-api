const express = require("express");
const exphbs = require("express-handlebars");
const db = require("../db")
const router = express.Router();
var moment = require('moment');

//Stripe
const stripe = require('stripe')('sk_test_51JKRCrH2sQlhwz6CXS6tcWQOr2Ojeqf64zffjLqcGtBG81JKpDBxtRD8OZb5MJUiwuxHsMcKnkpqf4apF2XNs8vH00E2siZUOD')

//twillio
const accountSid = 'AC28b6a086a95aa3d81f7b0d2f45cef8d9';
const authToken = '4235ecb8db4c2bfaf50d1453cc27e84c';
const client = require('twilio')(accountSid, authToken);


router.post("/send_otp", async (req,res, next)=>{
    const params = req.body;

    var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    client.messages
    .create({
        body: 'Your Rentperty OTP is '+otp,
        from: '+15053226608',
        to: params.phone
    })
    .then(message => res.status(200).send(otp)).catch(e => res.status(500).send(e));
});

router.post("/payment_checkout", async (req,res, next)=>{
    const total = req.body.total;
    const token = req.body.token;
    const params = req.body;
    
    stripe.charges.create({
        amount: total,
        currency: 'sgd',
        source: token
    }).then(charge => {
        // res.status(200).send(charge);
        try{
            getTransaction(params)
            res.status(200).send(charge)
        } catch (e){
            res.status(500).send(charge)
        }
    }).catch(e => console.log(e));
});

const getTransaction = async (params)=>{
    try{
        let results = await db.transaction_add(params);       
        console.log(results)
    }catch(e){
        console.log(e)
    }
}

router.post("/users_add", async (req,res, next)=>{
    const params = req.body;

    try{
        let results = await db.users_add(params);
        res.json({
            data : results
        });

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});


router.post("/agent_add", async (req,res, next)=>{
    const params = req.body;

    try{
        let results1 = await db.users_add(params);
        let results2 = await db.agent_add(params, results1.insertId);
        res.json({
            data : results1
        });

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});

router.post("/login", async (req,res, next)=>{
    const params = req.body;
    let results;

    try{
        if ( !isNaN(params.username)){
            results = await db.login_phone(params);
        } else {
            results = await db.login_email(params);
        }

        if (!results.length){
            res.json({
                status : 400,
                message : 'user is not found',
            });
        } else {

            res.json({
                status : 200,
                data : results[0],
                message : 'login success'
            });
        }
        
    }catch(e){
        console.log(e)
        res.status(500).send(e);
    }
});


router.get("/",(req,res, next)=>{

    try{
        // res.json({
        //     data : 'hi'
        // });
        res.send('rentperty is up');

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});

router.post("/test", async (req,res, next)=>{

    try{
        // res.json({
        //     data : 'hi'
        // });
        res.json({
            status : 200,
            message : 'connection success'
        });

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});




module.exports = router;