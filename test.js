const { ethers, network } = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-network-helpers");

const compoundABI={
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
}


async function send() {

  const aliceAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
  await helpers.impersonateAccount(aliceAddress);
  const aliceImpersonatedSigner = await ethers.getSigner(aliceAddress);

  const bobAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
  await helpers.impersonateAccount(bobAddress);
  const bobImpersonatedSigner = await ethers.getSigner(bobAddress);
  
  const compoundAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
  const compoundContractAlice = new ethers.Contract(compoundAddress, compoundABI, aliceImpersonatedSigner);
  const compoundContractBob = new ethers.Contract(compoundAddress, compoundABI, BobImpersonatedSigner);

  //[Print] the USDC balance in the Compound USDC contract
  console.log(
    "the USDC balance in the Compound USDC contract: ",
    ethers.utils.formatEther(await signer.getBalance())
  );
  //Alice provides liquidity (1000 USDC) into the Compound USDC contract
  //[Print] the USDC balance in the Compound USDC contract
  //Bob performs some setup … (think about it and try to figure out yourself!)
  //Bob withdraws all the USDC balance
  //[Print] the USDC balance in the Compound USDC contract, this should be 0, or a very small number close to 0
  //[Print] Alice tries to withdraw 1000 USDC, record what happened and print those out
}

send()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
