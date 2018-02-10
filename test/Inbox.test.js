const assert = require('assert'); // included with node standard library
const ganache = require('ganache-cli');// local ethereum network
const Web3 = require('web3');// importing web3 constructor, so capital W
const provider = ganache.provider();
const web3 = new Web3(provider);//arg is network you are connecting to
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {

    accounts = await web3.eth.getAccounts(); // returns list of unlocked ganache accounts

    // use one of these^ accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000' });

    inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);// assert this is this a defined value
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    });

    it('sets the message when setMessage is called', async () => {
        await inbox.methods.setMessage('New Message!').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'New Message!');
    });
});
