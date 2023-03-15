const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LeakageDetection", function() {
  let pipeline;
  let owner;

  beforeEach(async function() {
    [owner] = await ethers.getSigners();

    const Pipeline = await ethers.getContractFactory("LeakageDetection");
    pipeline = await Pipeline.deploy(5000, 25); // initial pressure of 5000 psi and temperature of 25 degrees Celsius
    await pipeline.deployed();
  });

  it("should set the correct initial values", async function() {
    expect(await pipeline.owner()).to.equal(owner.address);
    expect(await pipeline.pressure()).to.equal(5000);
    expect(await pipeline.temperature()).to.equal(25);
  });

  it("should emit a PressureDropAlert event when the pressure drops by 1000 psi or more", async function() {
    const previousPressure = await pipeline.pressure();
    await pipeline.updatePressure(previousPressure - 1001);
    const events = await pipeline.queryFilter("PressureDropAlert");
    expect(events.length).to.equal(1);
    expect(events[0].args.psi).to.equal(previousPressure - 1001);
  });

  it("should emit a LeakageDetected event when there is a leakage", async function() {
    await pipeline.updatePressure(500); // this should trigger a leakage
    const events = await pipeline.queryFilter("LeakageDetected");
    expect(events.length).to.equal(1);
  });
});