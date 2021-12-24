const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;

// declare axios for making http requests
const axios = require('axios');

var db;

MongoClient.connect('mongodb+srv://test1:testone1@cluster0-ieeys.mongodb.net/timputer?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, database) => {
    if (err) return console.log(err);
    db = database.db('timputer');
});

router.route('/authuser').post(function(req, res2) {
    var username = req.body.username;
    var password = req.body.password;
    db.collection('users').findOne({ "name": username }, {
        password: 1,
        role: 1,
        _id: 0
    }, function(err, result) {
        if (result == null) res2.send([{ "auth": false }]);
        else {
            bcrypt.compare(password, result.password, function(err, res) {
                if (err || res == false) {
                    res2.send([{ "auth": false }]);
                } else {
                    res2.send([{
                        "auth": true,
                        "role": result.role,
                        "uid": result._id
                    }]);
                }
            });
        }
    });
});

router.route('/reguser').post(function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var contact = req.body.contact;
    var houseAddress = req.body.houseAddress;
    var role = req.body.role;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash) {
        db.collection('users').insertOne({
            "name": username,
            "password": hash,
            "email": email,
            "contact": contact,
            "houseAddress": houseAddress,
            "role": role
        }, (err, result) => {
            if (err) return console.log(err)
            console.log('user registered')
            res.send(result);
        });
    });
})

//----------------------------------------------------------------------------------------------------

// get all products
router.route('/products').get(function(req, res) {
    db.collection('products').find().toArray((err, results) => { res.send(results) });
});

// insert new product
router.route('/products').post(function(req, res) {
    db.collection('products').insertOne(req.body, (err, results) => {
        if (err) return console.log(err);
        console.log('added to product collection');
        res.send(results);
    });
});

// delete product based on id
router.route('/products/:_id').delete(function(req, res) {
    db.collection('products').deleteOne({ "_id": ObjectId(req.params._id) }, (err,
        results) => {
        res.send(results);
    });
});

// update product based on id
router.route('/products/:_id').put(function(req, res) {
    db.collection('products').updateOne({ "_id": ObjectId(req.params._id) }, {
        $set: req.body
    }, (err, results) => {
        res.send(results);
    });
});

//Search products
router.route('/products').get(function(req, res) {
    db.collection('products').find("productName", "productType", "productPrice", "productBrand").toArray((err, results) => { res.send(results) });
});

//----------------------------------------------------------------------------------------------

// get all comments
router.route('/comments').get(function(req, res) {
    db.collection('comments').find().toArray((err, results) => { res.send(results) });
});

// insert new comments
router.route('/comments').post(function(req, res) {
    db.collection('comments').insertOne(req.body, (err, results) => {
        if (err) return console.log(err);
        console.log('comment added');
        res.send(results);
    });
});

// delete comment based on id
router.route('/comments/:_id').delete(function(req, res) {
    db.collection('comments').deleteOne({ "_id": ObjectId(req.params._id) }, (err,
        results) => {
        res.send(results);
    });
});

// update comment based on id
router.route('/comments/:_id').put(function(req, res) {
    db.collection('comments').updateOne({ "_id": ObjectId(req.params._id) }, {
        $set: req.body
    }, (err, results) => {
        res.send(results);
    });
});

//---------------------------------------------------------------------------------------------------

// get all custom pc
router.route('/custompcs').get(function(req, res) {
    db.collection('custompcs').find().toArray((err, results) => { res.send(results) });
});

// insert new custom pc
router.route('/custompcs').post(function(req, res) {
    db.collection('custompcs').insertOne(req.body, (err, results) => {
        if (err) return console.log(err);
        console.log('added to custom pc collection');
        res.send(results);
    });
});

// delete custom pc based on id
router.route('/custompcs/:_id').delete(function(req, res) {
    db.collection('custompcs').deleteOne({ "_id": ObjectId(req.params._id) }, (err,
        results) => {
        res.send(results);
    });
});

// update comment based on id
router.route('/custompcs/:_id').put(function(req, res) {
    db.collection('custompcs').updateOne({ "_id": ObjectId(req.params._id) }, {
        $set: req.body
    }, (err, results) => {
        res.send(results);
    });
});



//--------------------------------------------------------------------------------------------------------

// get cart items
router.route('/carts/:userId').get(function(req, res) {
    db.collection('carts').find({ 'userId': req.params.userId }).toArray((err, results) => {
        console.log(results);
        res.send(results);
    });
});

// insert new product into cart
router.route('/carts').post(function(req, res) {
    var userId = req.body.userId;
    var productId = req.body.productId;
    var productName = req.body.productName;
    var productPrice = req.body.productPrice;
    db.collection('carts').insertOne({
        "userId": userId,
        "productId": productId,
        "productName": productName,
        "productPrice": productPrice
    }, (err, results) => {
        console.log(results)
        console.log("Added to cart!")
        res.send(results);
    });
});

//delete item from cart
router.route('/carts/:_id').delete(function(req, res) {
    db.collection('carts').deleteOne({
            "_id": ObjectId(req.params._id)
        },
        (err, results) => {
            console.log(results)
            res.send(results);
        });
});

//-----------------------------------------------------------------------------------------------------------

//Get computer pc details to transfer
router.route('/custompcdetails').post(function(req, res) {

    var id = req.body.id;
    console.log(req.body.id)
    db.collection('custompcs').find({ "_id": ObjectId(id) }).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//-------------------------------------------------------------------------------------------------------------------------

//Get user profile information
router.route('/users/:_id').get(function(req, res) {
    console.log(req);
    db.collection('users').find({ "_id": ObjectId(req.params._id) }).toArray((err, results) => {
        console.log(results)
        res.send(results)
    });
});

//update user information
router.route('/users/:_id').put(function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var contact = req.body.contact;
    var houseAddress = req.body.houseAddress;

    console.log(req.body.name);
    db.collection('users').updateOne({ "_id": ObjectId(req.params._id) }, {
            $set: {
                'name': name,
                'email': email,
                'contact': contact,
                'houseAddress': houseAddress
            }
        },
        (err, results) => {
            console.log(results)
            res.send(results)
            console.log('Updated User information');
        });
});

//delete user account
router.route('/users/:_id').delete(function(req, res) {
    console.log(req);
    db.collection('users').deleteOne({ "_id": ObjectId(req.params._id) }), ((err, results) => {
        res.send(results)
        console.log('user account deleted');
    });
});


module.exports = router;