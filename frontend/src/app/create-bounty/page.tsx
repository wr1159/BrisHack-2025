"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
import { useAccount } from "wagmi";
import { baseSepolia } from "viem/chains";
import { snapTrackAbi, snapTrackAddress } from "@/lib/calls";
import { encodeFunctionData, parseEther } from "viem";

export default function CreateBounty() {
    const { address } = useAccount();

    const [speciesName, setSpeciesName] = useState("");
    const [speciesDescription, setSpeciesDescription] = useState("");
    const [prize, setPrize] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [deadline, setDeadline] = useState("");

    const createBounty = [
        {
            to: snapTrackAddress as `0x${string}`,
            data: encodeFunctionData({
                abi: snapTrackAbi,
                functionName: "createBounty",
                args: [
                    speciesName,
                    speciesDescription,
                    imageLink,
                    BigInt(deadline),
                ],
            }),
            value: parseEther(prize || "0.02"),
        },
    ];

    return (
        <div className="relative min-h-screen">
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative z-10"
            >
                {/* Hero Section */}
                <section className="relative h-[60vh] w-full">
                    <div className="relative h-full flex items-center justify-center text-center">
                        <motion.div
                            initial={{ y: 0, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl px-4"
                        >
                            <h1 className="text-4xl md:text-7xl font-bold text-primary mb-6">
                                Create a Bounty
                            </h1>
                            <p className="text-lg md:text-xl font-bold text-foreground/90">
                                Help us protect endangered species by offering
                                rewards for sightings.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Form Section */}
                <section>
                    <div className="container mx-auto px-4 max-w-xl">
                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <div className="form-group">
                                <label
                                    htmlFor="speciesName"
                                    className="block text-xl font-bold text-foreground mb-2"
                                >
                                    Species Name
                                </label>
                                <input
                                    type="text"
                                    id="speciesName"
                                    className="w-full px-4 py-2 border border-border rounded-lg"
                                    placeholder="Enter species name"
                                    value={speciesName}
                                    onChange={(e) =>
                                        setSpeciesName(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="speciesDescription"
                                    className="block text-xl font-bold text-foreground mb-2"
                                >
                                    Species Description
                                </label>
                                <textarea
                                    id="speciesDescription"
                                    className="w-full px-4 py-2 border border-border rounded-lg"
                                    placeholder="Describe the species"
                                    rows={4}
                                    value={speciesDescription}
                                    onChange={(e) =>
                                        setSpeciesDescription(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="imageLink"
                                    className="block text-xl font-bold text-foreground mb-2"
                                >
                                    Species Image Link
                                </label>
                                <input
                                    type="url"
                                    id="imageLink"
                                    className="w-full px-4 py-2 border border-border rounded-lg"
                                    placeholder="Enter image URL"
                                    value={imageLink}
                                    onChange={(e) =>
                                        setImageLink(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="prize"
                                    className="block text-xl font-bold text-foreground mb-2"
                                >
                                    Prize
                                </label>
                                <input
                                    id="deadline"
                                    className="w-full px-4 py-2 border border-border rounded-lg"
                                    placeholder="Enter prize amount"
                                    value={prize}
                                    onChange={(e) => setPrize(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="deadline"
                                    className="block text-xl font-bold text-foreground mb-2"
                                >
                                    Deadline (Unix Timestamp)
                                </label>
                                <input
                                    type="number"
                                    id="deadline"
                                    className="w-full px-4 py-2 border border-border rounded-lg"
                                    placeholder="Enter deadline (in Unix timestamp)"
                                    value={deadline}
                                    onChange={(e) =>
                                        setDeadline(e.target.value)
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
                                    calls={createBounty}
                                >
                                    <TransactionButton
                                        className="w-full bg-primary text-primary-foreground py-3 px-8 rounded-lg"
                                        text="Create Bounty"
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
                        </motion.form>
                    </div>
                </section>
            </motion.main>
        </div>
    );
}
