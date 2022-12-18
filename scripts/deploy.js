const hre = require("hardhat");

async function main() {
  const JoyToken = await hre.ethers.getContractFactory("JoyToken");
  const joyToken = await JoyToken.deploy(
    "Joy Token",
    "JOY",
    "500000000000000000000"
  );

  await joyToken.deployed();

  console.log(`Contract deployed at: ${joyToken.address}`);
}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});

// Acc 0
// 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
