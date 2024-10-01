const config = require('./config');
const {connectBlockchain} = require('./connection');
const {createAccount} = require("./account");

(async function () {
    const provider = await connectBlockchain(config.chainNames.ETH_SEPOLIA);
    const account = createAccount('0xa81e3856aA3a26a7CA1d078Dc6402Cab17211fc9', provider);
    const balance = await account.getBalance();
    console.log('balance: ', balance);
})();

