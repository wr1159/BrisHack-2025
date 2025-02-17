// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/SnapTrack.sol";

contract SnapTrackTest is Test {
    SnapTrack public snapTrack;

    function setUp() public {
        snapTrack = new SnapTrack();
        vm.deal(address(snapTrack), 1 ether);
    }

    function testCreateBounty() public {
        uint256 prize = 1000;
        string memory speciesName = "Test Species";
        string memory speciesDescription = "Test Description";
        string memory imageLink = "http://example.com/image.png";
        vm.warp(100000000); // Set block timestamp to 1000 for testing
        uint256 deadline = block.timestamp + 1 days;

        snapTrack.createBounty{value: prize}(speciesName, speciesDescription, imageLink, deadline);

        (uint256 id, uint256 _prize, string memory _speciesName, string memory _speciesDescription, string memory _imageLink, uint256 _deadline, bool isSettled, address creator) = snapTrack.bounties(0);

        assertEq(snapTrack.bountyId(), 1);
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
        snapTrack.createBounty{value: prize}(speciesName, speciesDescription, imageLink, deadline);
    }

    function testCreateBountyWithPastDeadline() public {
        uint256 prize = 1000;
        string memory speciesName = "Test Species";
        string memory speciesDescription = "Test Description";
        string memory imageLink = "Image Link";
        vm.warp(100000000); // Set block timestamp to 1000 for testing
        uint256 deadline = block.timestamp - 1 days;

        vm.expectRevert("Deadline must be in the future");
        snapTrack.createBounty{value: prize}(speciesName, speciesDescription, imageLink, deadline);
    }

    function testViewBounties() public {
        uint256 prize = 1000;
        string memory speciesName = "Test Species";
        string memory speciesDescription = "Test Description";
        string memory imageLink = "http://example.com/image.png";
        uint256 deadline = block.timestamp + 1 days;

        snapTrack.createBounty{value: prize}(speciesName, speciesDescription, imageLink, deadline);

        SnapTrack.Bounty[] memory bounties = snapTrack.viewBounties(0, 1);

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
        snapTrack.createBounty{value: newPrize}(speciesName, speciesDescription, imageLink, deadline);
        SnapTrack.Bounty[] memory newBounties = snapTrack.viewBounties(1, 1);
        assertEq(newBounties[0].prize, newPrize);

    }
     function testSubmitSighting() public {
        snapTrack.createBounty{value: 100}( "Species A", "Description A", "imageLinkA", block.timestamp + 1 days);
        snapTrack.submitSighting(0, "imageLinkSightingA", "Location A");
        (uint256 sightingId, string memory imageLink, string memory location, uint256 timestampSpotted, bool isWinner, address submitter) = snapTrack.sightings(0);
        assertEq(sightingId, 0);
        assertEq(imageLink, "imageLinkSightingA");
        assertEq(location, "Location A");
        assertEq(timestampSpotted, block.timestamp);
        assertEq(isWinner, false);
        assertEq(submitter, address(this));
    }

    function testViewSightings() public {
        snapTrack.createBounty{value: 100}("Species A", "Description A", "imageLinkA", block.timestamp + 1 days);
        snapTrack.submitSighting(0, "imageLinkSightingA", "Location A");
        snapTrack.submitSighting(0, "imageLinkSightingB", "Location B");
        SnapTrack.Sighting[] memory sightings = snapTrack.viewSightings(0);
        assertEq(sightings.length, 2);
        assertEq(sightings[0].imageLink, "imageLinkSightingA");
        assertEq(sightings[1].imageLink, "imageLinkSightingB");
    }

    function testChooseWinners() public {
        address bountyCreator = vm.addr(1);
        address user1 = vm.addr(1);
        vm.deal(bountyCreator, 1 ether);
        vm.prank(bountyCreator);
        snapTrack.createBounty{value: 1000000}("Species A", "Description A", "imageLinkA", block.timestamp + 1 days);
        assertEq(address(snapTrack).balance, 1000000000001000000);
        assertEq(snapTrack.bountyId(), 1);

        vm.startPrank(user1);
        vm.deal(user1, 1 ether);
        snapTrack.submitSighting(0, "imageLinkSightingA", "Location A");
        snapTrack.submitSighting(0, "imageLinkSightingB", "Location B");
        uint256 initialBalance = user1.balance;
        vm.stopPrank();


        uint256[] memory winners = new uint256[](1);
        winners[0] = 1;


        (, uint256 prize, , , , , , ) = snapTrack.bounties(0);
        assertEq(prize, 1000000);
        assertEq(winners.length, 1);

        vm.prank(bountyCreator);
        snapTrack.chooseWinners(0, winners);

        (, , , , bool isWinner, ) = snapTrack.sightings(1);
        assertEq(isWinner, true);

        (, , , , , , bool isSettled, ) = snapTrack.bounties(0);
        assertEq(isSettled, true);

        uint256 expectedBalance = initialBalance + prize / winners.length;
        assertEq(user1.balance, expectedBalance);
    }

}