let sequelize = require("../db/mysqldb")
let Sequelize = require('sequelize');

let transactionLayout = sequelize.define('transactions', {
    hash: { type: Sequelize.STRING },
    blockHash: { type: Sequelize.STRING, field: 'block_hash' },
    blockNumber: { type: Sequelize.STRING, field: 'block_number' },
    transactionIndex: { type: Sequelize.STRING, field: 'transaction_index' },
    from: { type: Sequelize.STRING },
    to: { type: Sequelize.STRING },
    value: { type: Sequelize.STRING },
    gasPrice: { type: Sequelize.STRING, field: 'gas_price' },
    gas: { type: Sequelize.STRING },
    input: { type: Sequelize.TEXT },
    status: { type: Sequelize.STRING },
    contractAddress: { type: Sequelize.STRING, field: 'contract_address' },
    cumulativeGasUsed: { type: Sequelize.STRING, field: 'cumulative_gas_used' },
    gasUsed: { type: Sequelize.STRING, field: 'gas_used' },
    logsBloom: { type: Sequelize.TEXT, field: 'logs_bloom' },
    timestamp: { type: Sequelize.STRING },
    fromBalance: { type: Sequelize.STRING, field: 'from_balance' },
    toBalance: { type: Sequelize.STRING, field: 'to_balance' },
    root: { type: Sequelize.STRING },
    nonce: { type: Sequelize.STRING }
},
    {
      createdAt: false,                   // 禁止添加 createdAt 字段
      updatedAt: false,                  // 禁止添加 updatedAt 字段
    })

transactionLayout.sync({force: false})

module.exports = transactionLayout