const path = require('path');// standard module, no need to npm install
const fs = require('fs');// standard module, no need to npm install
const solc = require('solc');// solidity compiler

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];//1 is number of contracts to compile
