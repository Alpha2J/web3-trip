const erc20Client = require('./erc20_client');
const {connectBlockchain} = require('./connection');

(async function () {
    const usdtAddr = '0x7CcD96eb0C8D8ACc3e4Db4c84a4f5B8649bd2677';
    const provider = await connectBlockchain();
    const erc20Cli = erc20Client.createClient(usdtAddr, provider);
    const name = await erc20Cli.name();
    const symbol = await erc20Cli.symbol();
    const decimals = await erc20Cli.decimals();
    console.log(name);
    console.log(symbol);
    console.log(decimals);

})();

