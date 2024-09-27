const {ethers} = require("ethers");

async function getBalance() {
    return await this.provider.getBalance(this.address);
}

async function sendValue(to, ethAmount) {
    if (!this.signer) {
        throw new Error('No signer');
    }
    const tx = {
        to: to,
        value: ethers.parseEther(ethAmount)
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
Account.prototype.sendValue = sendValue;

function createAccount(address, provider, privateKey) {
    return new Account(address, provider, privateKey);
}

module.exports = {
    createAccount
}


