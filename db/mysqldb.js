const Sequelize = require("sequelize");
const configs = require("../configs")
/**
 * 连接指定类型的数据库
 * host：数据库地址
 * max：连接池最大连接数量
 * min：连接池最小连接数量
 * idle：每个线程最长等待时间
 * @type {Sequelize}
 */
// console.log(configs.global)
module.exports = new Sequelize(configs.global.MYSQL_DB.database, configs.global.MYSQL_DB.user, configs.global.MYSQL_DB.password, {
    host: configs.global.MYSQL_DB.host,
    port: configs.global.MYSQL_DB.port,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 20,
        min: 0,
        idle: 10000
    }
});
