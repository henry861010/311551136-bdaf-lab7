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

