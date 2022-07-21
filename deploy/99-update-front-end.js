const { ethers, network } = require("hardhat")
const { fs } = require("fs")

const FRONT_END_ADDRESSS_FILE = "../nextjs-lottory-frontend-fcc/constants/contractAddress.json"
const FRONT_END_ABI_FILE = "../nextjs-lottory-frontend-fcc/constants/abi.json"

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating the FrontEnd ......")
        updateContractAddress()
        updateAbi()
    }
}

async function updateContractAddress() {
    const raffle = await ethers.getContract("Raffle")
    const currentAddress = JSON.parse(
        fs.readFileSync(
            "/home/sunil/folder/hh-fcc/nextjs-lottory-frontend-fcc/constants/contractAddress.json",
            "utf8"
        )
    )
    const chaindId = network.config.chainId.toString()
    if (chaindId in currentAddress) {
        {
            if (!currentAddress[chaindId].includes(raffle.address))
                currentAddress[chaindId].push(raffle.address)
        }
    }
    {
        currentAddress[chaindId] = [raffle.address]
    }
    fs.writeFileSync(
        "/home/sunil/folder/hh-fcc/nextjs-lottory-frontend-fcc/constants/contractAddress.json",
        JSON.stringify(currentAddress)
    )
}

async function updateAbi() {
    const raffle = await ethers.getContract("Raffle")
    fs.writeFileSync(FRONT_END_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.JSON))
}
module.exports.tags = ["all", "frontend"]
