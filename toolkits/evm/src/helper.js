const ethers = require('ethers');

function privateKeyToAddress(privateKey) {
    let wallet = new ethers.Wallet(privateKey);
    return wallet.address;
}

function randomPrivateKey() {
    const randomWallet = ethers.Wallet.createRandom();
    return randomWallet.privateKey;
}

async function signMessage(privateKey, msg) {
    const signer = new ethers.Wallet(privateKey);
    return signer.signMessage(msg);
}

function randomMnemonic(wordLength) {
    const phrase = randomPhrase(wordLength);
    return ethers.Mnemonic.fromPhrase(phrase);
}

// 12, 15, 18, 21 or 24
// 助记词单词数量	熵的比特数	熵的字节数	校验位数	总比特数（熵 + 校验）
// 12 个单词	128 位	16 字节	4 位	132 位
// 15 个单词	160 位	20 字节	5 位	165 位
// 18 个单词	192 位	24 字节	6 位	198 位
// 21 个单词	224 位	28 字节	7 位	231 位
// 24 个单词	256 位	32 字节	8 位	264 位
function randomPhrase(wordLength) {
    // default is 12 words
    let byteLength = 16;

    switch (wordLength) {
        case 12:
            byteLength = 16;
            break;
        case 15:
            byteLength = 20;
            break;
        case 18:
            byteLength = 24;
            break;
        case 21:
            byteLength = 28;
            break;
        case 24:
            byteLength = 32;
            break;
    }

    return ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(byteLength));
}

function walletFromPhrase(phrase, path) {
    const wallets = walletsFromPhrase(phrase, path, path);
    return wallets[0];
}

function walletsFromPhrase(phrase, pathBegin, pathEnd) {
    const basePath = "44'/60'/0'/0"; // or "m/44'/60'/0'/0"
    const mnemonic = ethers.Mnemonic.fromPhrase(phrase);
    const baseWallet = ethers.HDNodeWallet.fromMnemonic(mnemonic, basePath);

    const result = [];
    for (let i = pathBegin; i <= pathEnd; i++) {
        result.push(baseWallet.derivePath(i + ''))
    }

    return result;
}

function isValidPhrase(phrase) {
    return ethers.Mnemonic.isValidMnemonic(phrase);
}

function isValidWord(word, locale) {
    let wordlist = ethers.wordlists.en;
    if (locale) {
        wordlist = ethers.wordlists[locale];
    }

    // for (let i = 0; i < 2048; i++) {
    //     if (wordlist.getWord(i) === word) {
    //         return true;
    //     }
    // }
    return wordlist.getWordIndex(word) >= 0;
}

function allWords(locale) {
    let wordlist = ethers.wordlists.en;
    if (locale) {
        wordlist = ethers.wordlists[locale];
    }

    return wordlist._decodeWords();
}

function toWei(amount) {
    return ethers.parseEther(amount);
}

function toUnit(amount, decimals) {
    return ethers.parseUnits(amount, decimals);
}

function fromWei(amount) {
    return ethers.formatEther(amount);
}

function fromUnit(amount, decimals) {
    return ethers.formatUnits(amount, decimals);
}

module.exports = {
    privateKeyToAddress,
    randomPrivateKey,
    signMessage,
    randomMnemonic,
    randomPhrase,
    walletFromPhrase,
    walletsFromPhrase,
    isValidPhrase,
    isValidWord,
    allWords,
    toWei,
    toUnit,
    fromWei,
    fromUnit
}
