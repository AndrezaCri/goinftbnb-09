// SPDX-License-Identifier: MITG
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {GoinftFund} from "../src/Goinft-fund.sol";

contract GoinftFundScript is Script {
    GoinftFund public goinftfund;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        goinftfund = new GoinftFund();

        vm.stopBroadcast();
    }
}