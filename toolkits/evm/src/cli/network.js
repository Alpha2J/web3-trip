const command = 'network <method>'
const describe = '与evm网络交互';

const builder = yargs => {
    yargs
        .positional('method', {
            describe: 'evm method',
            type: 'string'
        });
}

const handler = argv => {
    const method = argv.method;
    if (method === 'getNetwork') {

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
