# How to use
## for contracts

## for account

## for network

evmcli network --method currentblock
evmcli account --address 0xa81e3856aA3a26a7CA1d078Dc6402Cab17211fc9 --method getbalance --pk privatekey --params '{"chainName":"ETH_SEPOLIA"}'
evmcli contract --address 0xa81e3856aA3a26a7CA1d078Dc6402Cab17211fc9 --name erc20 --method getbalance --params '{"chainName":"ETH_SEPOLIA"}'



1. 需要支持三个子命令，network、account、contract
2. 如果不输入子命令，那么默认情况下显示帮助信息
3. 如果输入了不支持的子命令，显示错误信息
4. 不支持其他进程间的调用

