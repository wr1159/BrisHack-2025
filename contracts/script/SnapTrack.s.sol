// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../contracts/src/SnapTrack.sol";

contract DeploySnapTrack is Script {
    function run() external {
        vm.startBroadcast();
        SnapTrack snapTrack = new SnapTrack();
        vm.stopBroadcast();
    }
}
