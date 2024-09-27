const config = require('./config.json');

const chainNames = {
    ETH_MAINNET: 'Ethereum Mainnet',
    ETH_SEPOLIA: 'Sepolia',
    BSC_MAINNET: 'BNB Smart Chain Mainnet',
    BSC_TESTNET: 'BNB Smart Chain Testnet',
    ARBITRUM_MAINNET: 'Arbitrum One',
    ARBITRUM_TESTNET: 'Arbitrum Sepolia',
    POLYGON_MAINNET: 'Polygon',
}

function getAccounts(chain) {
    if (!chain) {
        throw new Error('chain is required');
    }

    const chainObj = config[chain];
    return chainObj.accounts;
}

function getRpcUrl(chain) {
    if (!chain) {
        throw new Error('chain is required');
    }
    const chainObj = config[chain];
    return chainObj['rpc_url'];
}

function getUSDTContractAddress(chain) {
    if (!chain) {
        throw new Error('chain is required');
    }

    const chainObj = config[chain];
    const contractsObj = chainObj['contracts'];
    return contractsObj['USDT'];
}

module.exports = {
    chainNames,
    getAccounts,
    getRpcUrl,
    getUSDTContractAddress
};
