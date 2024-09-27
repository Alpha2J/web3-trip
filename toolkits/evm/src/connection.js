const config = require('./config.js');
const {ethers} = require("ethers");

async function connectBlockchain(chain) {
    const url = config.getRpcUrl(chain);
    return new ethers.JsonRpcProvider(url);
}

module.exports = {
    connectBlockchain
}
