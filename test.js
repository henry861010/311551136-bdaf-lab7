const { ethers, network } = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-network-helpers");

const compoundABI = [
{"inputs":[{"internalType":"address","name":"_logic","type":"address"},
{"internalType":"address","name":"admin_","type":"address"},
{"internalType":"bytes","name":"_data","type":"bytes"}],"stateMutability":"payable","type":"constructor"},
{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},
{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"admin_","type":"address"}],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"implementation_","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},
{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},
{"stateMutability":"payable","type":"receive"}
];

const USDCAPI = [
{"constant":false,"inputs":[{"name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newImplementation","type":"address"},
{"name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},
{"constant":true,"inputs":[],"name":"implementation","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},
{"inputs":[{"name":"_implementation","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},
{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"previousAdmin","type":"address"},
{"indexed":false,"name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},
{"anonymous":false,"inputs":[{"indexed":false,"name":"implementation","type":"address"}],"name":"Upgraded","type":"event"}
];

const WETHAPI = [
{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"guy","type":"address"},
{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"src","type":"address"},
{"name":"dst","type":"address"},
{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"dst","type":"address"},
{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},
{"constant":true,"inputs":[{"name":"","type":"address"},
{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},
{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},
{"indexed":true,"name":"guy","type":"address"},
{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},
{"indexed":true,"name":"dst","type":"address"},
{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},
{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},
{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},
{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}];


async function send() {
  const USDCAddress = "0xc3d688B66703497DAA19211EEdff47f25384cdc3";
  const compoundAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
  const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  
  const godAddress = "0xFcb19e6a322b27c06842A71e8c725399f049AE3a";  //the owner of the USDC
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
  const compoundContractBob = new ethers.Contract(compoundAddress, compoundABI, BobImpersonatedSigner);
  const WETHContractBob = new ethers.Contract(WETHAddress, WETHABI, BobImpersonatedSigner);
  
  

  //[Print] the USDC balance in the Compound USDC contract
  console.log(
    "the USDC balance in the Compound USDC contract: ",
    ethers.utils.formatEther(await USDCContractgod.balanceOf(compoundAddress));
  );
  
  //Alice provides liquidity (1000 USDC) into the Compound USDC contract
  console.log("Alice provides liquidity (1000 USDC) into the Compound USDC contract");
  await USDCContractGod.mint(aliceAddress, 1000);   //mint 1000usdc foe alice
  await compoundContractAlice.supply(usdcAddress, 1000);  //alice supply 1000usdc to compound contract
  
  //[Print] the USDC balance in the Compound USDC contract
  console.log(
    "the USDC balance in the Compound USDC contract: ",
    ethers.utils.formatEther(await USDCContractgod.balanceOf(compoundAddress));
  );
  
  //Bob performs some setup … (think about it and try to figure out yourself!)
  const totalBalance = ethers.utils.formatEther(await USDCContractgod.balanceOf(compoundAddress));
  let necessaryColleteral = 1000;  //how to know the necessary of the colleteral!!!#######################################################################################
  await Contract.provider.send("hardhat_setBalance", [bobImpersonatedSigner.address, necessaryColleteral]); //necessaryColleteral should be string, modify!!! ################
  await WETHContractBob.deposit(necessaryColleteral);  //exchange the ethers to WETH
  await compoundContractBob.supply(WETHAddress, necessaryColleteral);
  
  //Bob withdraws all the USDC balance
  console.log("Alice provides liquidity (1000 USDC) into the Compound USDC contract");
  await compoundContractAlice.withdraw(USDCAddress, totalBalance);
  
  //[Print] the USDC balance in the Compound USDC contract, this should be 0, or a very small number close to 0
  console.log(
    "the USDC balance in the Compound USDC contract(should be 0, or a very small number close to 0): ",
    ethers.utils.formatEther(await USDCContractgod.balanceOf(compoundAddress));
  );
  
  //[Print] Alice tries to withdraw 1000 USDC, record what happened and print those out
}

send()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
