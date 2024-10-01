const yargs = require('yargs');
const argv = yargs
    .command(require('./network'))
    .command(require('./account'))
    // .locale('zh_CN')
    .demandCommand(1, 'You need at least one command before moving on')
    .help()
    .argv;
