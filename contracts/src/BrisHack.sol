// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

Contract BrisHack {
    // Create Bounties with an ID, certain prize, species name, species description, image, deadline, isSettled and creator
    // A bounty is a task for users to submit sightings of a certain species.
    // Bounties should be stored in the contract for reference in submitting sightings.
    // The prize will be distributed later on based on who the winners are.
    // The deadline is the last day to submit sightings.
    // The image is a reference image of the species.
    // When the deadline is met, the bounty creator can choose the winners and distribute the prize inside.
    // FUTURE WORK: Add an ERC20 Address to allow for the prize to be distributed in a token instead of native currency.

    // View Bounties
    // Users can view all the bounties that are currently available.
    // The bounties should be stored in a mapping of bountyId to bounty.

    // Submit Sightings for Bounties
    // Users can submit sightings for a certain bounty.
    // The sighting should include image link, location, timestamp spotted, whether it wins, and the address of the submitter.
    // The sighting should be stored in the contract for reference in choosing the winners.
    // The sighting should be stored in a mapping of bountyId to sightings.

    // View Sightings for Bounties
    // Users can view all the sightings for a certain bounty.
    // The sightings should be stored in a mapping of bountyId to sightings.

    // Choose Winners for Bounties
    // The bounty creator can choose the winners of the bounty.
    // Change an attribute in the sightings to be a winner.
    // Then distribute the prize to the winners.

}