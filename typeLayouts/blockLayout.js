let sequelize = require("../db/mysqldb")
let Sequelize = require('sequelize');

let blockLayout = sequelize.define('blocks', {
    number: { type: Sequelize.STRING },
    hash: { type: Sequelize.STRING },
    parentHash: { type: Sequelize.STRING, field: 'parent_hash' },
    nonce: { type: Sequelize.STRING },
    logsBloom: { type: Sequelize.STRING, field: 'logs_bloom' },
    transactionsRoot: { type: Sequelize.STRING, field: 'transactions_root' },
    stateRoot: { type: Sequelize.STRING, field: 'state_root' },
    miner: { type: Sequelize.STRING },
    difficulty: { type: Sequelize.STRING },
    totalDifficulty: { type: Sequelize.STRING, field: 'total_difficulty' },
    extraData: { type: Sequelize.STRING, field: 'extra_data' },
    size: { type: Sequelize.STRING },
    gasLimit: { type: Sequelize.STRING, field: 'gas_limit' },
    gasUsed: { type: Sequelize.STRING, field: 'gas_used' },
    timestamp: { type: Sequelize.STRING },
    transactionHashes: { type: Sequelize.STRING, field: 'transaction_hashes' },

},
    {
      createdAt: false,                   // 禁止添加 createdAt 字段
      updatedAt: false,                  // 禁止添加 updatedAt 字段
    })

blockLayout.sync({force: false})

module.exports = blockLayout