var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
let Sequelize = require('sequelize');
const redis = require('../db/redisdb')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const blockLayout = require('../typeLayouts/blockLayout')

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/getBlock', async function (req, res) {

    let number = req.query.number;
    let hash = req.query.hash;
    console.log("number", number);
    console.log("hash", hash);
    if(hash != undefined) {
        let result = await redis.get(hash);
        if(result != null) res.status(200).send(JSON.parse(result));
        else {
            blockLayout.findAll({
                where: {
                    hash: hash
                }
            }).then((result => {
                res.status(200).send(result[0].dataValues);
            })).catch((error => {
                res.status(500).send("Can't find the block");
            }))
        }
        
    }
    else if(number != undefined) {
        let result = await redis.get(hash);
        if(result != null) res.status(200).send(JSON.parse(result));
        else {
            blockLayout.findAll({
                where: {
                    number: number
                }
            }).then((result => {
                res.status(200).send(result[0].dataValues);
            })).catch((error => {
                res.status(500).send("Can't find the block");
            }))
        }
    }
    else res.status(500).send("No parameters, please set hash or number parameter");
});

router.get('/getBlockNumber', function (req, res) {
    blockLayout.findAll({
        attributes: ['number'],
        order:[
            [Sequelize.cast(Sequelize.col('number'), 'integer'), 'DESC']
        ],
        limit: 1
        
    }).then((result => {
        let blocks = [];
        console.log("result", result)
        res.status(200).send(result[0].dataValues);
        
    })).catch((error => {
        res.status(500).send("There was a problem finding the blocks number.");
    }))
});

router.get('/getBlockTransactionCount', function (req, res) {
    let number = req.query.number;
    let hash = req.query.hash;
    console.log("number", number);
    console.log("hash", hash);
    if(hash != undefined) {
        blockLayout.findAll({
            attributes: ['transaction_hashes'],
            where: {
                hash: hash
            }
        }).then((result => {
            let txHashes = result[0].dataValues.transaction_hashes;
              let count = txHashes.length / 67;
              res.status(200).send({"count": count});
        })).catch((error => {
            res.status(500).send("There was a problem finding the blocks.");
        }))
    }
    else if(number != undefined) {
        blockLayout.findAll({
            attributes: ['transaction_hashes'],
            where: {
                number: number
            }
        }).then((result => {
              let txHashes = result[0].dataValues.transaction_hashes;
              let count = txHashes.length / 67;
              res.status(200).send({"count": count});
        }))
    }
    else res.status(500).send("No parameters, please set hash or number parameter");
});


module.exports = router;