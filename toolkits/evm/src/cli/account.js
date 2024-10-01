const {chainNames} = require('../config');
const {createAccount} = require('../account');
const {DEFAULT_NET} = require('./default');
const {connectBlockchain} = require("../connection");
const command = 'account <address> <method> [params] [pk]'
const describe = '账号信息';

const builder = yargs => {
    yargs
        .option('chain', {
            describe: 'chain name',
            type: 'string',
            default: 'BSC_MAINNET'
        })
        .positional('address', {
            describe: 'account address',
            type: 'string'
        })
        .positional('method', {
            describe: 'method name',
            type: 'string'
        })
        .positional('pk', {
            describe: 'private key',
            type: 'string'
        })
        .positional('params', {
            describe: 'method params',
            type: 'string'
        });
}

const handler = async argv => {
    // const chain = argv.chain || DEFAULT_NET;
    // const chainName = chainNames[chain];
    let chain = DEFAULT_NET;
    if (chainNames.hasOwnProperty(argv.chain)) {
        chain = argv.chain;
    }
    const chainName = chainNames[chain];
    const provider = await connectBlockchain(chainName);

    const address = argv.address;
    const method = argv.method.toLowerCase();
    const privateKey = argv.pk;

    const account = createAccount(address, provider, privateKey);
    if (method === 'getbalance') {
        account.getBalance().then(console.log);
    } else if (method === 'sendvalue') {
        const paramsArg = argv.params;
        let params;
        try {
            params = JSON.parse(paramsArg);
        } catch (err) {
            console.log(err);
        }
        if (params.hasOwnProperty('to') && params.hasOwnProperty('value')) {
            account.sendValue(params.to, params.value).then(console.log);
        } else {
            console.error('params error');
        }
    } else {
        console.error(`unsupported method: ${method}`)
    }
}

module.exports = {
    command: command,
    describe: describe,
    builder: builder,
    handler: handler
};
