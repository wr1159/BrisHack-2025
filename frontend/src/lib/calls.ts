export const snapTrackAddress = "0x4805C6f0fA8e135417efdFA8D87dAfaf4C5E2a84";
export const snapTrackAbi = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "bounties",
        outputs: [
            { internalType: "uint256", name: "id", type: "uint256" },
            { internalType: "uint256", name: "prize", type: "uint256" },
            { internalType: "string", name: "speciesName", type: "string" },
            {
                internalType: "string",
                name: "speciesDescription",
                type: "string",
            },
            { internalType: "string", name: "imageLink", type: "string" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
            { internalType: "bool", name: "isSettled", type: "bool" },
            { internalType: "address", name: "creator", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "bountyId",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "", type: "uint256" },
            { internalType: "uint256", name: "", type: "uint256" },
        ],
        name: "bountySightings",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "_bountyId", type: "uint256" },
            { internalType: "uint256[]", name: "_winners", type: "uint256[]" },
        ],
        name: "chooseWinners",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "string", name: "_speciesName", type: "string" },
            {
                internalType: "string",
                name: "_speciesDescription",
                type: "string",
            },
            { internalType: "string", name: "_imageLink", type: "string" },
            { internalType: "uint256", name: "_deadline", type: "uint256" },
        ],
        name: "createBounty",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "sightingId",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "sightings",
        outputs: [
            { internalType: "uint256", name: "id", type: "uint256" },
            { internalType: "string", name: "imageLink", type: "string" },
            { internalType: "string", name: "location", type: "string" },
            {
                internalType: "uint256",
                name: "timestampSpotted",
                type: "uint256",
            },
            { internalType: "bool", name: "isWinner", type: "bool" },
            { internalType: "address", name: "submitter", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "_bountyId", type: "uint256" },
            { internalType: "string", name: "_imageLink", type: "string" },
            { internalType: "string", name: "_location", type: "string" },
        ],
        name: "submitSighting",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "start", type: "uint256" },
            { internalType: "uint256", name: "count", type: "uint256" },
        ],
        name: "viewBounties",
        outputs: [
            {
                components: [
                    { internalType: "uint256", name: "id", type: "uint256" },
                    { internalType: "uint256", name: "prize", type: "uint256" },
                    {
                        internalType: "string",
                        name: "speciesName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "speciesDescription",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "imageLink",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "deadline",
                        type: "uint256",
                    },
                    { internalType: "bool", name: "isSettled", type: "bool" },
                    {
                        internalType: "address",
                        name: "creator",
                        type: "address",
                    },
                ],
                internalType: "struct SnapTrack.Bounty[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "_bountyId", type: "uint256" },
        ],
        name: "viewSightings",
        outputs: [
            {
                components: [
                    { internalType: "uint256", name: "id", type: "uint256" },
                    {
                        internalType: "string",
                        name: "imageLink",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "location",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "timestampSpotted",
                        type: "uint256",
                    },
                    { internalType: "bool", name: "isWinner", type: "bool" },
                    {
                        internalType: "address",
                        name: "submitter",
                        type: "address",
                    },
                ],
                internalType: "struct SnapTrack.Sighting[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
] as const;
