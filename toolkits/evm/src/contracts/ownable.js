const {Contract, ethers} = require('ethers');

const ABI = [
    'function transferOwnership(address newOwner)'
];

async function transferOwnership(newOwner) {
    return this.contract.transferOwnership(newOwner);
}

function Ownable(contractAddress, provider, privateKey) {
    this.contractAddress = contractAddress;
    this.provider = provider;
    if (privateKey) {
        this.signer = new ethers.Wallet(privateKey, this.provider);
    }

    this.contract = new Contract(contractAddress, ABI, this.signer ? this.signer : this.provider);
}

Ownable.prototype.transferOwnership = transferOwnership;

function createOwnable(contractAddress, provider, privateKey) {
    return new Ownable(contractAddress, provider, privateKey);
}

module.exports = {
    createOwnable
}
