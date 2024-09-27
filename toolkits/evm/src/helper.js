const ethers = require('ethers');

function privateKeyToAddress(privateKey) {
    let wallet = new ethers.Wallet(privateKey);
    return wallet.address;
}

function randomPrivateKey() {
    const randomWallet = ethers.Wallet.createRandom();
    return randomWallet.privateKey;
}

function generatePrivateKey(c) {
    let result = '0x';
    for (let i = 0; i < 64; i++) {
        result = result + c;
    }
    return result;
}

async function signMessage(privateKey, msg) {
    const signer = new ethers.Wallet(privateKey);
    return signer.signMessage(msg);
}

function address(c) {
    let privateKey = generatePrivateKey(c);
    return privateKeyToAddress(privateKey);
}