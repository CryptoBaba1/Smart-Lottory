const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = "250000000000000000" // 0.25 is this the premium in LINK?
const GAS_PRICE_LINK = 1e9 // link per gas, is this the gas lane? // 0.000000001 LINK per gas
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (developmentChains.includes(network.name)) {
        log("Local network detected ... Deploying Mocks.....")
        let args = [BASE_FEE, GAS_PRICE_LINK]
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            args: args,
            log: true,
            // we need to wait if on a live network so we can verify properly
            waitConfirmations: network.config.blockConfirmations || 1,
        })
        console.log(this.arguments)
        log("Mocks Deployed")
        log("-------------------------------------")
    }
}
module.exports.tags = ["all", "mocks"]
