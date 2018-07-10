var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
let Sequelize = require('sequelize');
const redis = require('../db/redisdb')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const transactionLayout = require('../typeLayouts/transactionLayout')

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/getTransaction', async function (req, res) {

    let hash = req.query.hash;
    console.log("hash", hash);
    if(hash != undefined) {
        let result = await redis.get(hash);
        if(result != null) res.status(200).send(JSON.parse(result));
        else {
            transactionLayout.findAll({
                where: {
                    hash: hash
                }
            }).then((result => {
                res.status(200).send(result[0].dataValues);
            })).catch((error => {
                res.status(500).send("Can't find the transaction");
            }))
        }
        
    }
    else res.status(500).send("No parameters, please set hash parameter");
});

module.exports = router;