const ethers = require('ethers');

function privateKeyToAddress(privateKey) {
    let wallet = new ethers.Wallet(privateKey);
    return wallet.address;
}

function randomPrivateKey() {
    const randomWallet = ethers.Wallet.createRandom();
    return randomWallet.privateKey;
}

async function signMessage(privateKey, msg) {
    const signer = new ethers.Wallet(privateKey);
    return signer.signMessage(msg);
}
