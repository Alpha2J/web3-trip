const ethers = require('ethers');
const {Contract, id} = require("ethers");

const ARB_SEPOLIA_RPC = 'https://arb-sepolia.g.alchemy.com/v2/wdgZeOPEg7mgxO4anXV5Jaq3M17NxtAW';
const BSC_TESTNET_RPC = 'https://bsc-testnet.publicnode.com';

// todo replace me
const BLOCKCHAIN_RPC = ARB_SEPOLIA_RPC;

async function connectBlockchain() {
    return new ethers.JsonRpcProvider(BLOCKCHAIN_RPC);
}

// todo replace me
const VAULT_ADDRESS = '0x34E512956E46De09929532150c41EA3987BB03Fc';
const VAULT_ABI = [
    'function idVaultStateMap(uint256) public view returns (address lpTokenContract, uint256 soldAmount, bool hasTransferred, bool hasSettled)',
    'function idVaultInfoMap(uint256) view returns (uint256 id, address depositToken, uint256 maxVaultCapacity, uint256 minVaultLimit, uint256 saleStartTime, uint256 saleEndTime, uint256 termStartTime, uint256 termEndTime, address organization, address transferSigner)',
    'function getAutoReinvest(uint256 vaultId, address user) view external returns (bool)',
    'function autoReinvest(uint256 vaultId, uint256 investVaultId, address user)',
    'function getStatusById(uint256 vaultId) view returns (string memory status)',
];

async function getIdVaultStateMap(vaultId) {
    const provider = await connectBlockchain();
    const contract = new Contract(VAULT_ADDRESS, VAULT_ABI, provider);
    const idVaultStateMap = await contract.idVaultStateMap(vaultId);
    console.log(idVaultStateMap);
}

(async function () {
    await getIdVaultStateMap(671);
})();