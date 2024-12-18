const {ethers} = require("ethers");
const {connectBlockchain} = require("./connection");
const config = require("./config");

async function getBalance() {
    return await this.provider.getBalance(this.address);
}

async function sendAllValue(to) {
    const balance = await this.getBalance();

    const gasPrice = (await this.provider.getFeeData()).gasPrice;
    const gasEstimate = 21000n;
    const gasFee = gasPrice * gasEstimate;

    const sendingBalance = balance - gasFee;
    console.log(`balance: ${balance}, gasPrice: ${gasPrice}, gasFee: ${gasFee}, sendingBalance: ${sendingBalance}`);
    await this.sendValue(to, sendingBalance);
}

// amount 是bigint
async function sendValue(to, amount) {
    if (!this.signer) {
        throw new Error('No signer');
    }
    const tx = {
        to: to,
        value: amount
    };
    const txResponse = await this.signer.sendTransaction(tx);
    return await txResponse.wait();
}

function Account(address, provider, privateKey) {
    this.address = address;
    this.provider = provider;
    if (privateKey) {
        this.signer = new ethers.Wallet(privateKey, this.provider);
    }
}

Account.prototype.getBalance = getBalance;
Account.prototype.sendAllValue = sendAllValue;
Account.prototype.sendValue = sendValue;

function createAccount(address, provider, privateKey) {
    return new Account(address, provider, privateKey);
}

module.exports = {
    createAccount
}


