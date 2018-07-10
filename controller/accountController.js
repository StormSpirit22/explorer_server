var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
let Sequelize = require('sequelize');
const redis = require('../db/redisdb')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const accountLayout = require('../typeLayouts/accountLayout')

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/getAccount', async function (req, res) {
    let address = req.query.address;
    console.log("address", address);
    if(address != undefined) {
        let result = await redis.get(address);
        console.log("result", result);
        if(result != null) res.status(200).send(JSON.parse(result));
        else {
            accountLayout.findAll({
                where: {
                    address: address
                }
            }).then((result => {
                res.status(200).send(result[0].dataValues);
            })).catch((error => {
                res.status(500).send("Can't find the account");
            }))
        }
    }
    else res.status(500).send("No parameters, please set address parameter");
});

module.exports = router;