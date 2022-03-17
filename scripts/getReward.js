// contract etherscan link: https://rinkeby.etherscan.io/address/0x1F8F71673B0712B02680aD981A0D5F4f2cFF854B#tokentxns
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

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
