// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const contractAddress = "0x1F8F71673B0712B02680aD981A0D5F4f2cFF854B";

async function main() {
  //   console.log(BoredAppSigner);
  const stakingContract = await ethers.getContractAt(
    "WhiteListing",
    contractAddress
  );
  const result = await stakingContract.claim([], 6, 1);
  const event = await result.wait();
  console.log(event);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
