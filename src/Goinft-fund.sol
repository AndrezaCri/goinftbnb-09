// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

error NotOwner();

contract GoinftFund {

 mapping(address => uint256) public  addressToAmountFunded;
 address[] public funders;

 address public i_owner;

    constructor() {
        i_owner = msg.sender;
    }

    function fund() public payable {
        require(msg.value  > 0, "Not enough resources");
        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }
        
    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert NotOwner();
        }
        _;
    }

function withdraw() public onlyOwner {
        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        funders = new address[](0);
        payable(msg.sender).transfer(address(this).balance);
    }

    function getFunder(uint256 index) public view returns (address) {
        return funders[index];
    }

}