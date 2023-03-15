// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;


// Define the Pipeline contract
contract PipelineLeakageDetection {
    address public owner;
    uint256 public deploymentTime;
    uint256 public deviceId;
    uint256 public pressure;
    uint256 public temperature;

    event PressureDropAlert(uint256 psi);
    event LeakageDetected();

    constructor(uint256 initialPressure, uint256 initialTemperature) {
        owner = msg.sender;
        deploymentTime = block.timestamp;
        deviceId = block.number;
        pressure = initialPressure;
        temperature = initialTemperature;
    }

    function updatePressure(uint256 newPressure) public {
        uint256 previousPressure = pressure;
        pressure = newPressure;

        if (previousPressure - pressure >= 1000) {
            emit PressureDropAlert(pressure);
        } else if (previousPressure - pressure >= 700) {
            emit PressureDropAlert(pressure);
        } else if (previousPressure - pressure >= 500) {
            emit PressureDropAlert(pressure);
        }
        
        if (detectLeakage()) {
            emit LeakageDetected();
        }
    }

    function detectLeakage() public view returns (bool) {
        // If the pressure drops by more than 1000 psi, there is a leakage
        return pressure < 1000;
    }
}



