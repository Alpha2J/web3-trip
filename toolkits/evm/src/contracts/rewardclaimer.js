const {Contract, ethers} = require('ethers');

const ABI = [
    'function claim(address contractAddress, uint256 amount) external'
];

function claim(contractAddress, amount) {
    return this.contract.claim(contractAddress, amount);
}

function RewardClaimer(contractAddress, provider, privateKey) {
    this.contractAddress = contractAddress;
    this.provider = provider;
    if (privateKey) {
        this.signer = new ethers.Wallet(privateKey, this.provider);
    }

    this.contract = new Contract(contractAddress, ABI, this.signer ? this.signer : this.provider);
}

RewardClaimer.prototype.claim = claim;

function createRewardClaimer(contractAddress, provider, privateKey) {
    return new RewardClaimer(contractAddress, provider, privateKey);
}

module.exports = {
    createRewardClaimer
}
