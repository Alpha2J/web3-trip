const config = require('./config');
const {connectBlockchain} = require('./connection');
const {createAccount} = require("./account");

(async function () {
    const provider = await connectBlockchain(config.chainNames.ETH_SEPOLIA);
    const account = createAccount('0xB9FF0616ce8ACAB98F71de2136A6aA3E01878DCe', provider);
    const balance = await account.getBalance();
    console.log('balance: ', balance);
})();

