const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-network-helpers");
const BigNumber = require('bignumber.js');

const WETHABI = [
    'function balanceOf(address account) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function withdraw(uint256 wad)',
    'function deposit()',
];
const USDCAPI = [
    'function balanceOf(address account) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function withdraw(uint256 wad)',
    'function transfer(address receiver, uint256)',
];
const compoundABI = [
    'function supply(address asset, uint amount)',
    'function withdraw(address asset, uint amount)',
    'function balanceOf(address account) view returns (uint256)',
    'function collateralBalanceOf(address account, address asset) external view returns (uint128)',
];



describe("Compound Simulation", function () {
    it("should provide liquidity ", async function () {
	const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  	const compoundAddress = "0xc3d688B66703497DAA19211EEdff47f25384cdc3";
  	const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  
  	const godAddress = "0x0A59649758aa4d66E25f08Dd01271e891fe52199";  //the owner of the USDC
  	await helpers.impersonateAccount(godAddress);
  	const godImpersonatedSigner = await ethers.getSigner(godAddress);
  	const USDCContractGod = new ethers.Contract(USDCAddress, USDCAPI, godImpersonatedSigner);

  	const aliceAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
  	await helpers.impersonateAccount(aliceAddress);
  	const aliceImpersonatedSigner = await ethers.getSigner(aliceAddress);
  	const compoundContractAlice = new ethers.Contract(compoundAddress, compoundABI, aliceImpersonatedSigner);
  	const USDCContractAlice = new ethers.Contract(USDCAddress, USDCAPI, aliceImpersonatedSigner);

  	const bobAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
  	await helpers.impersonateAccount(bobAddress);
  	const bobImpersonatedSigner = await ethers.getSigner(bobAddress);
  	const compoundContractBob = new ethers.Contract(compoundAddress, compoundABI, bobImpersonatedSigner);
  	const WETHContractBob = new ethers.Contract(WETHAddress, WETHABI, bobImpersonatedSigner);
	
	//[Print] the USDC balance in the Compound USDC contract
  	console.log("[1]the USDC balance in the Compound USDC contract: ", await USDCContractGod.balanceOf(compoundAddress)/(10**6));
  
  	//Alice provides liquidity (1000 USDC) into the Compound USDC contract
  	await network.provider.send("hardhat_setBalance", [
    	   godAddress,
          "0x10000000000000000000000000000000",
  	]);
  	await USDCContractGod.transfer(aliceAddress, 1000*10**6); 
  	await USDCContractAlice.approve(compoundAddress, 1000*10**6); 
  	await compoundContractAlice.supply(USDCAddress, 1000*10**6);  //alice supply 1000usdc to compound contract
  	console.log("[2]Alice provides liquidity (1000 USDC) into the Compound USDC contract");
  
  	//[Print] the USDC balance in the Compound USDC contract
  	console.log(
           "[3]the USDC balance in the Compound USDC contract: ",
    	    await USDCContractGod.balanceOf(compoundAddress)/(10**6)
  	);
  
  	//Bob performs some setup … (think about it and try to figure out yourself!)
  	const totalBalance = await USDCContractGod.balanceOf(compoundAddress);
  	await network.provider.send("hardhat_setBalance", [ bobAddress, "0x100000000000000000000000000000000000000000000000000000000000000000000000000000000000000", ]); 
  	await WETHContractBob.deposit();  //exchange the ethers to WETH
  	const amountToSave = await WETHContractBob.balanceOf(bobAddress);
  	await WETHContractBob.approve(compoundAddress, amountToSave);
  	await compoundContractBob.supply(WETHAddress, amountToSave);
console.log("test1");s
  	await compoundContractBob.withdraw(USDCAddress, totalBalance.tOString());  //await compoundContractBob.withdrawTo(WETHAddress, USDCAddress, "46964238052894");
console.log("test2");
  	console.log("Bob withdraws all the USDC balance");


  	//[Print] the USDC balance in the Compound USDC contract, this should be 0, or a very small number close to 0
  	console.log("[5]the USDC balance in the Compound USDC contract(should be 0, or a very small number close to 0): ", await USDCContractGod.balanceOf(compoundAddress)/(10**6));
	console.log("******WETH: ",await WETHContractBob.balanceOf(compoundAddress)/(10**6));
  
  	//[Print] Alice tries to withdraw 1000 USDC, record what happened and print those out
    });



});

