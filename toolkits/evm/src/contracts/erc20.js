const {Contract, ethers} = require('ethers');

const ABI = [
    'function name() external view returns (string memory)',
    'function symbol() external view returns (string memory)',
    'function decimals() external view returns (uint8)',
    'function totalSupply() external view returns (uint256)',
    'function balanceOf(address account) external view returns (uint256)',
    'function transfer(address to, uint256 amount) external returns (bool)',
    'function allowance(address owner, address spender) external view returns (uint256)',
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function transferFrom(address from, address to, uint256 amount) external returns (bool)',
    'function mint(address account, uint256 amount) external',
    'function burn(address account, uint256 amount) external'
];

async function name() {
    return this.contract.name();
}

async function symbol() {
    return this.contract.symbol();
}

async function decimals() {
    return this.contract.decimals();
}

async function transfer(to, amount) {
    return this.contract.transfer(to, amount);
}

// function setSigner(privateKey) {
//     this.signer = new ethers.Wallet(privateKey, this.provider);
//     this.contract = new Contract(this.contractAddress, ABI, this.signer);
// }

function ERC20(contractAddress, provider, privateKey) {
    this.contractAddress = contractAddress;
    this.provider = provider;
    if (privateKey) {
        this.signer = new ethers.Wallet(privateKey, this.provider);
    }

    this.contract = new Contract(contractAddress, ABI, this.signer ? this.signer : this.provider);
}

ERC20.prototype.name = name;
ERC20.prototype.symbol = symbol;
ERC20.prototype.decimals = decimals;
ERC20.prototype.transfer = transfer;

function createERC20(contractAddress, provider, privateKey) {
    return new ERC20(contractAddress, provider, privateKey);
}

module.exports = {
    createERC20
}
