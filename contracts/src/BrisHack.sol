// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract BrisHack {
    struct Bounty {
        uint256 id;
        uint256 prize;
        string speciesName;
        string speciesDescription;
        string imageLink;
        uint256 deadline;
        bool isSettled;
        address creator;
    }
    struct Sighting {
        string imageLink;
        string location;
        uint256 timestampSpotted;
        bool isWinner;
        address submitter;
    }
    uint256 public bountyId;
    uint256 public sightingId;
    mapping(uint256 => Bounty) public bounties;
    mapping(uint256 => Sighting) public sightings;
    mapping(uint256 => uint256[]) public bountySightings;

    // Initialize the contract
    constructor() {
        bountyId = 0;
    }

    // Create Bounties with an ID, certain prize, species name, species description, image, deadline, isSettled and creator
    // A bounty is a task for users to submit sightings of a certain species.
    // Bounties should be stored in the contract for reference in submitting sightings.
    // The prize will be distributed later on based on who the winners are.
    // The deadline is the last day to submit sightings.
    // The image is a reference image of the species.
    // When the deadline is met, the bounty creator can choose the winners and distribute the prize inside.
    // TODO: Add an ERC20 Address to allow for the prize to be distributed in a token instead of native currency.
    function createBounty(string memory _speciesName, string memory _speciesDescription, string memory _imageLink, uint256 _deadline) public payable{
        require(_deadline > block.timestamp, "Deadline must be in the future");
        require(msg.value > 0, "Prize must be greater than 0");
        Bounty memory newBounty = Bounty(bountyId, msg.value, _speciesName, _speciesDescription, _imageLink, _deadline, false, msg.sender);
        bounties[bountyId] = newBounty;
        bountyId++;
    }

    // View Bounties
    // Users can view all the bounties that are currently available.
    // The bounties should be stored in a mapping of bountyId to bounty.
    function viewBounties(uint256 start, uint256 count) public view returns (Bounty[] memory) {
        require(start < bountyId, "Start index out of bounds");
        uint256 end = start + count;
        if (end > bountyId) {
            end = bountyId;
        }
        Bounty[] memory _bounties = new Bounty[](end - start);
        for (uint256 i = start; i < end; i++) {
            _bounties[i - start] = bounties[i];
        }
        return _bounties;
    }

    // Submit Sightings for Bounties
    // Users can submit sightings for a certain bounty.
    // The sighting should include image link, location, timestamp spotted, whether it wins, and the address of the submitter.
    // The sighting should be stored in the contract for reference in choosing the winners.
    // The sighting should be stored in a mapping of bountyId to sightings.
    function submitSighting(uint256 _bountyId, string memory _imageLink, string memory _location) public {
        require(bounties[_bountyId].deadline > block.timestamp, "Bounty deadline has passed");
        Sighting memory newSighting = Sighting(_imageLink, _location, block.timestamp, false, msg.sender);
        sightings[sightingId] = newSighting;
        bountySightings[_bountyId].push(sightingId);
        sightingId++;
    }

    // View Sightings for Bounties
    // Users can view all the sightings for a certain bounty.
    // The sightings should be stored in a mapping of bountyId to sightings.
    function viewSightings(uint256 _bountyId) public view returns (Sighting[] memory) {
        uint256[] memory _sightings = bountySightings[_bountyId];
        Sighting[] memory _sightingsData = new Sighting[](_sightings.length);
        for (uint256 i = 0; i < _sightings.length; i++) {
            _sightingsData[i] = sightings[_sightings[i]];
        }
        return _sightingsData;
    }

    // Choose Winners for Bounties
    // The bounty creator can choose the winners of the bounty.
    // Change an attribute in the sightings to be a winner.
    // Then distribute the prize to the winners.
    function chooseWinners(uint256 _bountyId, uint256[] memory _winners) public {
        require(bounties[_bountyId].creator == msg.sender, "Only the creator can choose winners");
        for (uint256 i = 0; i < _winners.length; i++) {
            sightings[_winners[i]].isWinner = true;
        }
        // Distribute prize to winners
        // transfer prize to winners

        // Set bounty to settled
        bounties[_bountyId].isSettled = true;
    }

}