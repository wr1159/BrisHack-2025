// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/BrisHack.sol";

contract BrisHackTest is Test {
    BrisHack public brisHack;

    function setUp() public {
        brisHack = new BrisHack();
    }

    function testCreateBounty() public {
        uint256 prize = 1000;
        string memory speciesName = "Test Species";
        string memory speciesDescription = "Test Description";
        string memory imageLink = "http://example.com/image.png";
        vm.warp(100000000); // Set block timestamp to 1000 for testing
        uint256 deadline = block.timestamp + 1 days;

        brisHack.createBounty(prize, speciesName, speciesDescription, imageLink, deadline);

        (uint256 id, uint256 _prize, string memory _speciesName, string memory _speciesDescription, string memory _imageLink, uint256 _deadline, bool isSettled, address creator) = brisHack.bounties(0);

        assertEq(brisHack.bountyId(), 1);
        assertEq(id, 0);
        assertEq(_prize, prize);
        assertEq(_speciesName, speciesName);
        assertEq(_speciesDescription, speciesDescription);
        assertEq(_imageLink, imageLink);
        assertEq(_deadline, deadline);
        assertEq(isSettled, false);
        assertEq(creator, address(this));
    }

    function testCreateBountyWithZeroPrize() public {
        uint256 prize = 0;
        string memory speciesName = "Test Species";
        string memory speciesDescription = "Test Description";
        string memory imageLink = "http://example.com/image.png";
        uint256 deadline = block.timestamp + 1 days;

        vm.expectRevert("Prize must be greater than 0");
        brisHack.createBounty(prize, speciesName, speciesDescription, imageLink, deadline);
    }

    function testCreateBountyWithPastDeadline() public {
        uint256 prize = 1000;
        string memory speciesName = "Test Species";
        string memory speciesDescription = "Test Description";
        string memory imageLink = "Image Link";
        vm.warp(100000000); // Set block timestamp to 1000 for testing
        uint256 deadline = block.timestamp - 1 days;

        vm.expectRevert("Deadline must be in the future");
        brisHack.createBounty(prize, speciesName, speciesDescription, imageLink, deadline);
    }

    function testViewBounties() public {
        uint256 prize = 1000;
        string memory speciesName = "Test Species";
        string memory speciesDescription = "Test Description";
        string memory imageLink = "http://example.com/image.png";
        uint256 deadline = block.timestamp + 1 days;

        brisHack.createBounty(prize, speciesName, speciesDescription, imageLink, deadline);

        BrisHack.Bounty[] memory bounties = brisHack.viewBounties(0, 1);

        assertEq(bounties.length, 1);
        assertEq(bounties[0].id, 0);
        assertEq(bounties[0].prize, prize);
        assertEq(bounties[0].speciesName, speciesName);
        assertEq(bounties[0].speciesDescription, speciesDescription);
        assertEq(bounties[0].imageLink, imageLink);
        assertEq(bounties[0].deadline, deadline);
        assertEq(bounties[0].isSettled, false);
        assertEq(bounties[0].creator, address(this));

        uint256 newPrize = 100;
        brisHack.createBounty(newPrize, speciesName, speciesDescription, imageLink, deadline);
        BrisHack.Bounty[] memory newBounties = brisHack.viewBounties(1, 1);
        assertEq(newBounties[0].prize, newPrize);

    }

}