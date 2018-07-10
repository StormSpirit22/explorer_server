var express = require('express');
var app = express();

var blockController = require('./controller/blockController');
var transactionController = require('./controller/transactionController');
var accountController = require('./controller/accountController');

app.use('/blocks', blockController);
app.use('/transactions', transactionController);
app.use('/accounts', accountController);

module.exports = app;