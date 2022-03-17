// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const tokenAddress = "0x6cB219BA5Ed20bFFe1c5be27381DCEA19BcFc768";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const [owner] = await ethers.getSigners();
  const WhiteList = await hre.ethers.getContractFactory("WhiteListing");
  const whitelist = await WhiteList.deploy(tokenAddress);

  await whitelist.deployed();

  console.log("Greeter deployed to:", whitelist.address);

  const transactionHash = await owner.sendTransaction({
    to: whitelist.address,
    value: ethers.utils.parseEther("0.09"), // Sends exactly 1.0 ether
  });
  console.log(transactionHash);
  console.log(await whitelist.getBalance());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
