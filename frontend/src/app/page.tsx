"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import RainEffect from "../components/RainEffect";
import AnimalCard from "@/components/AnimalCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { snapTrackAbi, snapTrackAddress } from "@/lib/calls";
import { useReadContract } from "wagmi";

// const wildlifeSpecies = [
//     {
//         name: "Scarlet Macaw",
//         habitat: "Canopy Layer",
//         description: "Vibrant tropical parrot with brilliant plumage",
//         image: "/images/macaw.jpg",
//         link: "/wildlife/macaw",
//     },
//     {
//         name: "Scottish Wildcat",
//         habitat: "Forest Floor",
//         description: "Apex predator of the Amazon rainforest",
//         image: "/images/5125.jpg",
//         link: "/wildlife/jaguar",
//     },
//     {
//         name: "Poison Dart Frog",
//         habitat: "Understory",
//         description: "Small amphibian with bright warning colors",
//         image: "/images/frog.jpg",
//         link: "/wildlife/frog",
//     },
// ];

export default function Home() {
    const { scrollY } = useScroll(); // Track scroll position
    interface Bounty {
        id: bigint;
        prize: bigint;
        speciesName: string;
        speciesDescription: string;
        imageLink: string;
    }

    const [bounties, setBounties] = useState<Bounty[]>([]); // Store fetched bounties

    // Fetch bounties from the contract
    const { data, error, isLoading } = useReadContract({
        address: snapTrackAddress,
        abi: snapTrackAbi,
        functionName: "viewBounties",
        args: [BigInt(2), BigInt(10)], // Fetch 2nd to 12th bounties
    });
    useEffect(() => {
        if (data) {
            setBounties([...data]);
        }
    }, [data]);

    // Move image from left (-200px) to right (200px) as user scrolls from 0px to 1000px
    const x = useTransform(scrollY, [0, 1000], [-200, 200]);

    return (
        <div className="relative min-h-screen">
            <RainEffect />

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative z-10"
            >
                {/* Hero Section */}
                <section className="relative h-[60vh] w-full">
                    {/* Moving PNG Image */}
                    <motion.div
                        style={{ x }} // Moves image left to right on scroll
                        className="absolute top-40 left-0 w-40 h-10"
                    >
                        <Image
                            src="/images/tiger.png" // Replace with your PNG file
                            alt="Moving Image"
                            width={1050}
                            height={1050}
                        />
                    </motion.div>

                    <div className="relative h-full flex items-center justify-center text-center">
                        <motion.div
                            initial={{ y: 0, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl px-4"
                        >
                            <h1 className="text-4xl md:text-7xl font-bold text-primary mb-6">
                                SnapTrack
                            </h1>
                            <p className="text-lg md:text-xl font-bold text-foreground/90">
                                Get paid saving the planet!
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 ">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="p-6 rounded-lg border border-border bg-background/50 "
                        >
                            <h3 className="text-2xl font-bold text-foreground/80 mb-2">
                                80%
                            </h3>
                            <p className="text-foreground/80">
                                of people are more likely to engage in
                                conservation efforts when they see compelling
                                images or videos of endangered species in their
                                natural habitat.
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="p-6 rounded-lg border border-border bg-background/50 "
                        >
                            <h3 className="text-2xl font-bold text-foreground/80 mb-2">
                                48%
                            </h3>
                            <p className="text-foreground/80">
                                of species are facing population decline through
                                a survey of 71,000 species.
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="p-6 rounded-lg border border-border bg-background/50 "
                        >
                            <h3 className="text-2xl font-bold text-foreground/80 mb-2">
                                $423 billion
                            </h3>
                            <p className="text-foreground/80">
                                of costs incurred due to Invasive species
                                globally in damages, management efforts, and
                                lost agricultural productivity.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Featured Wildlife */}
                <section className="py-16" id="wildlife">
                    <div className="container mx-auto px-4">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-3xl font-bold text-center mb-12 text-foreground"
                        >
                            Current Bounties
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {isLoading ? (
                                <p>Loading bounties...</p>
                            ) : error ? (
                                <p>Error loading bounties</p>
                            ) : (
                                bounties.map((bounty) => (
                                    <AnimalCard
                                        key={bounty.id}
                                        prize={bounty.prize}
                                        name={bounty.speciesName}
                                        description={bounty.speciesDescription}
                                        image={bounty.imageLink}
                                        link={`/bounties/${bounty.id}`}
                                    />
                                ))
                            )}
                        </div>
                        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {wildlifeSpecies.map((animal) => (
                                <AnimalCard key={animal.name} {...animal} />
                            ))}
                        </div> */}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-primary/10 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <motion.div
                            initial={{ scale: 0.95 }}
                            whileInView={{ scale: 1 }}
                            className="max-w-2xl mx-auto"
                        >
                            <h2 className="text-3xl font-bold text-foreground mb-4">
                                Place A Bounty
                            </h2>
                            <p className="text-foreground/160 mb-8">
                                Help us protect these vital ecosystems for
                                future generations
                            </p>
                            <Link href="/create-bounty">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-primary text-primary-foreground px-8 py-3 rounded-lg"
                                >
                                    Get Involved
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </motion.main>
        </div>
    );
}
