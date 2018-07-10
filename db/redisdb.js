const Redis = require('ioredis');

const redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
    db: 0,
    password: ''
})

redis.putMultiple = function(keysValue) {
    let pipeline = redis.pipeline();

    keysValue.forEach((value, key) => {
        console.log("key", key);
        console.log("value", value);
        pipeline.set(key, value);
    })

    pipeline.exec((err, res) => {
        if(!err && res) {
            console.log("put success", res);
            return res;
        }
    })
}

redis.getMultiple = function(keys) {
    let pipeline = redis.pipeline();

    for( key of keys ) {
        pipeline.get(key);
    } 

    pipeline.exec((err, res) => {
        if(!err && res) {
            console.log("get success", res);
            return res;
        }
    })
}

module.exports = redis
