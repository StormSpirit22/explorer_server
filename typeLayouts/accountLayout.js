let sequelize = require("../db/mysqldb")
let Sequelize = require('sequelize');

let blockLayout = sequelize.define('accounts', {
    address: { type: Sequelize.STRING },
    balance: { type: Sequelize.STRING },
    transactionHashes: { type: Sequelize.STRING, field: 'transaction_hashes' },
    updateTime: { type: Sequelize.STRING, field: 'update_time' }

},
    {
      createdAt: false,                   // 禁止添加 createdAt 字段
      updatedAt: false,                  // 禁止添加 updatedAt 字段
    })

blockLayout.sync({force: false})

module.exports = blockLayout