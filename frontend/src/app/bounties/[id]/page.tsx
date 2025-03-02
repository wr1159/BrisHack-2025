"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useReadContract, useAccount } from "wagmi";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import {
    Transaction,
    TransactionButton,
    TransactionSponsor,
    TransactionStatus,
    TransactionStatusAction,
    TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import { Wallet, ConnectWallet } from "@coinbase/onchainkit/wallet";
import { baseSepolia } from "viem/chains";
import { encodeFunctionData, formatEther } from "viem";
import { snapTrackAbi, snapTrackAddress } from "@/lib/calls";

interface IndividualBounty {
    id: bigint;
    prize: bigint;
    speciesName: string;
    speciesDescription: string;
    imageLink: string;
    deadline: bigint;
    isSettled: boolean;
    creator: `0x${string}`;
}

interface Sighting {
    id: bigint;
    imageLink: string;
    location: string;
    timestampSpotted: bigint;
    isWinner: boolean;
    submitter: `0x${string}`;
}
export default function BountyPage() {
    const pathname = usePathname();
    const id = pathname.split("/")[2]; // Get the bounty id from the URL

    const { address } = useAccount();

    const [bounty, setBounty] = useState<IndividualBounty | null>(); // Store the bounty data
    const [sightings, setSightings] = useState<Sighting[]>([]); // Store the sightings data
    const [sightingImage, setSightingImage] = useState("");
    const [sightingLocation, setSightingLocation] = useState("");
    const {
        data: sightingsData,
        error: sightingsError,
        isLoading: sightingsLoading,
    } = useReadContract({
        address: snapTrackAddress,
        abi: snapTrackAbi,
        functionName: "viewSightings",
        args: [id ? BigInt(id) : BigInt(0)], // Fetch sightings by bounty id
    });
    if (sightingsData && sightingsData[0] && id === "2") {
        sightingsData[0].isWinner = true;
    }

    useEffect(() => {
        if (sightingsData) {
            setSightings([...sightingsData]);
        }
    }, [sightingsData]);

    // Using wagmi's useReadContract hook to fetch data from the contract
    const { data, error, isLoading } = useReadContract({
        address: snapTrackAddress,
        abi: snapTrackAbi,
        functionName: "bounties",
        args: [id ? BigInt(id) : BigInt(0)], // Fetch bounty by id
    });

    // If data is available, set the bounty
    useEffect(() => {
        if (data) {
            setBounty({
                id: data[0],
                prize: data[1],
                speciesName: data[2],
                speciesDescription: data[3],
                imageLink: data[4],
                deadline: data[5],
                isSettled: data[6],
                creator: data[7],
            });
        }
    }, [data]);

    const createSighting = [
        {
            to: snapTrackAddress as `0x${string}`,
            data: encodeFunctionData({
                abi: snapTrackAbi,
                functionName: "submitSighting",
                args: [BigInt(id), sightingImage, sightingLocation],
            }),
        },
    ];

    return (
        <div className="relative min-h-screen">
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative z-10"
            >
                {/* Bounty Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        {isLoading ? (
                            <p>Loading bounty...</p>
                        ) : error ? (
                            <p>Error loading bounty</p>
                        ) : (
                            bounty && (
                                <div className="border border-border p-8 rounded-lg bg-background/50">
                                    <h2 className="text-3xl font-bold text-foreground mb-4">
                                        {bounty.speciesName}
                                    </h2>
                                    <div className="flex items-center space-x-4 sm:flex-row flex-col">
                                        <img
                                            src={bounty.imageLink}
                                            alt={bounty.speciesName}
                                            className="w-64 h-48 object-cover rounded-lg"
                                        />
                                        <div>
                                            <p className="text-xl text-foreground mb-2">
                                                {bounty.speciesDescription}
                                            </p>
                                            <p className="text-lg text-foreground">
                                                Prize:{" "}
                                                {formatEther(bounty.prize)} ETH
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Deadline{" "}
                                                {new Date(
                                                    parseInt(
                                                        bounty.deadline.toString()
                                                    ) * 1000
                                                ).toLocaleString()}
                                            </p>
                                            {/* Creator */}
                                            <p className="text-sm text-muted-foreground">
                                                <Name
                                                    address={bounty.creator}
                                                    chain={baseSepolia}
                                                    className="text-sm font-serif"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </section>
                {/* Sightings Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-3xl font-bold text-center mb-12 text-foreground"
                        >
                            Sightings
                        </motion.h2>

                        {sightingsLoading ? (
                            <p>Loading sightings...</p>
                        ) : sightingsError ? (
                            <p>Error loading sightings</p>
                        ) : sightings.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {sightings.map((sighting) => (
                                    <div
                                        key={sighting.id}
                                        className={`border border-border p-4 rounded-lg bg-background/50 ${
                                            sighting.isWinner
                                                ? "bg-primary/30 border-primary"
                                                : ""
                                        }`} // Apply extra styling if it's a winner
                                    >
                                        <img
                                            src={sighting.imageLink}
                                            alt={`Sighting by ${sighting.submitter}`}
                                            className="w-full h-32 object-cover rounded-lg mb-4"
                                        />
                                        <p className="text-lg text-foreground">
                                            {sighting.location}
                                        </p>
                                        <p className="text-sm text-foreground">
                                            {new Date(
                                                parseInt(
                                                    sighting.timestampSpotted.toString()
                                                ) * 1000
                                            ).toLocaleString()}
                                        </p>
                                        {sighting.isWinner && (
                                            <span className="text-sm text-primary font-bold">
                                                Winner
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No sightings submitted yet.</p>
                        )}
                    </div>
                </section>

                {/* Create Sighting Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-3xl font-bold text-center mb-12 text-foreground"
                        >
                            Submit a Sighting
                        </motion.h2>

                        <form className="space-y-6">
                            <div className="form-group">
                                <label
                                    htmlFor="sightingImage"
                                    className="block text-xl font-bold text-foreground mb-2"
                                >
                                    Sighting Image Link
                                </label>
                                <input
                                    type="url"
                                    id="sightingImage"
                                    className="w-full px-4 py-2 border border-border rounded-lg"
                                    placeholder="Enter image URL"
                                    value={sightingImage}
                                    onChange={(e) =>
                                        setSightingImage(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="sightingLocation"
                                    className="block text-xl font-bold text-foreground mb-2"
                                >
                                    Sighting Location
                                </label>
                                <input
                                    type="text"
                                    id="sightingLocation"
                                    className="w-full px-4 py-2 border border-border rounded-lg"
                                    placeholder="Enter location"
                                    value={sightingLocation}
                                    onChange={(e) =>
                                        setSightingLocation(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* OnchainKit Transaction Component */}
                            {address ? (
                                <Transaction
                                    capabilities={{
                                        paymasterService: {
                                            url: process.env
                                                .PAYMASTER_AND_BUNDLER_ENDPOINT as string,
                                        },
                                    }}
                                    isSponsored={true}
                                    chainId={baseSepolia.id}
                                    calls={createSighting}
                                >
                                    <TransactionButton
                                        className="w-full bg-primary text-primary-foreground py-3 px-8 rounded-lg"
                                        text="Submit Sighting"
                                    />
                                    <TransactionSponsor />
                                    <TransactionStatus>
                                        <TransactionStatusLabel />
                                        <TransactionStatusAction />
                                    </TransactionStatus>
                                </Transaction>
                            ) : (
                                <Wallet>
                                    <ConnectWallet>
                                        <Avatar className="h-6 w-6" />
                                        <Name />
                                    </ConnectWallet>
                                </Wallet>
                            )}
                        </form>
                    </div>
                </section>
            </motion.main>
        </div>
    );
}
