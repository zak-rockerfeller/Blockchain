const Migrations = artifacts.require("LeakageDetection");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
