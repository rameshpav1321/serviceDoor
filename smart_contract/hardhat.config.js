//plugin to build smart contract tests
require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more

// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */

module.exports = {
  solidity: "0.8.0",
  networks: {
    //ropsten network url
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/MLEoLFcxfVKB7lGBwDyGwBZgVwlF-wLF",
      //private key of the account going to be used to deploy the contract
      accounts: ['28c00bb51c0ed296ea5145c735dd770dd13e2fce320bf1e755319da5b815ec2b'],
      gas: 6100000,
      gasPrice: 8000000000
    }
  }
};

/** 
 * command to run to deploy the contract
 * npx hardhat run scripts/deploy.js --network ropsten
**/
