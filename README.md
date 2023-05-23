# 311551136-bdaf-lab7 
* 1. [Print] the USDC balance in the Compound USDC contract
* 2. Alice provides liquidity (1000 USDC) into the Compound USDC contract
* 3. [Print] the USDC balance in the Compound USDC contract
* 4. Bob performs some setup … (think about it and try to figure out yourself!)
* 5. Bob withdraws all the USDC balance
* 6. [Print] the USDC balance in the Compound USDC contract, this should be 0, or a very small number close to 0
* 7. [Print] Alice tries to withdraw 1000 USDC, record what happened and print those out

## 1. set the enviroment  
going to the folder of the program and running the following instructions in the shell:  
* 1. install or upgrade the package: `npm install`  
* 2. add the following enviroment variable into `.env` file:  
      1. MAINNET_RPC_URL = [your_app_api_url_from_alchemy]   
* 3. make sure the version of node.js up to v16.0.0
## 2. run program  
* 1. begin the mainnet fork on block number 17228670: `npx hardhat node`
* 2. run: `npx hardhat test test.js`  

## 3. reference
https://medium.com/coinmonks/impersonating-accounts-with-hardhat-21212c94dcec
https://hardhat.org/hardhat-network/docs/guides/forking-other-networks
https://docs.compound.finance

## 4. ERROR
there's error with "withdraw(address asset, uint amount)" of compoumd contract.
if i withdraw with the smaller amount of USDC, there's no error. however, when i tried to withdraw larger amount of USDC, the error happen. the following is the error report:
`
Error: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (reason="VM Exception while processing transaction: reverted with an unrecognized custom error (return data: 0x14c5f7b6)", method="estimateGas", transaction={"from":"0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B","to":"0xc3d688B66703497DAA19211EEdff47f25384cdc3","data":"0xf3fef3a3000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000000000000000000000000000000002ab6b6b9ee1e","accessList":null}, error={"stackTrace":[{"type":2,"address":{"type":"Buffer","data":[195,214,136,182,103,3,73,125,170,25,33,30,237,255,71,242,83,132,205,195]}},{"type":18,"address":{"type":"Buffer","data":[195,214,136,182,103,3,73,125,170,25,33,30,237,255,71,242,83,132,205,195]},"message":{"value":{"type":"Buffer","data":[20,197,247,182]},"_selector":"14c5f7b6"},"isInvalidOpcodeError":false}],"data":"0x14c5f7b6"}, code=UNPREDICTABLE_GAS_LIMIT, version=providers/5.7.2)
      at Logger.makeError (node_modules/@ethersproject/logger/src.ts/index.ts:269:28)
      at Logger.throwError (node_modules/@ethersproject/logger/src.ts/index.ts:281:20)
      at checkError (node_modules/@ethersproject/providers/src.ts/json-rpc-provider.ts:78:20)
      at EthersProviderWrapper.<anonymous> (node_modules/@ethersproject/providers/src.ts/json-rpc-provider.ts:642:20)
      at step (node_modules/@ethersproject/providers/lib/json-rpc-provider.js:48:23)
      at Object.throw (node_modules/@ethersproject/providers/lib/json-rpc-provider.js:29:53)
      at rejected (node_modules/@ethersproject/providers/lib/json-rpc-provider.js:21:65)`
