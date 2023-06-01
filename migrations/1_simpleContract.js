var simpleContract = artifacts.require("./simpleContract.sol");

module.exports = function (deployer) {
    deployer.deploy(simpleContract);
};