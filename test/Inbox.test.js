const assert = require('assert'); // included with node standard library
const ganache = require('ganache-cli');// local ethereum network
const Web3 = require('web3');// importing web3 constructor, so capital W
const web3 = new Web3(ganache.provider());//arg is network you are connecting to
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {

    accounts = await web3.eth.getAccounts(); // returns list of unlocked ganache accounts

    // use one of ^ accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);// assert this is this a defined value
    });
});
