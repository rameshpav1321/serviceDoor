const main = async() => {
  // We get the contract to deploy
  //generate the instance of the contract
  const Services = await hre.ethers.getContractFactory("Services");

  //running the constructor
  const services = await Services.deploy(100, 18);

  await services.deployed();

  console.log("Services deployed to:", services.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();