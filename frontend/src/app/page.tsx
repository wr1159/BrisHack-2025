"use client";


import { motion } from 'framer-motion';
import Image from 'next/image';

import RainEffect from '../components/RainEffect';
import AnimalCard from '@/components/AnimalCard';

const wildlifeSpecies = [
  {
    name: 'Scarlet Macaw',
    habitat: 'Canopy Layer',
    description: 'Vibrant tropical parrot with brilliant plumage',
    image: '/images/macaw.jpg',
    link: '/wildlife/macaw'
  },
  {
    name: 'Jaguar',
    habitat: 'Forest Floor',
    description: 'Apex predator of the Amazon rainforest',
    image: '/images/jaguar.jpg',
    link: '/wildlife/jaguar'
  },
  {
    name: 'Poison Dart Frog',
    habitat: 'Understory',
    description: 'Small amphibian with bright warning colors',
    image: '/images/frog.jpg',
    link: '/wildlife/frog'
  },
];

export default function Home() {
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
          <div className="absolute inset-0">
            <Image
              src="/images/jungle-canopy.jpg"
              alt="Rainforest Canopy"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative h-full flex items-center justify-center text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl px-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                Explore the Rainforest
              </h1>
              <p className="text-lg md:text-xl text-foreground/90">
                Discover the world's most biodiverse ecosystem and learn how we can protect it
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-card py-16">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg border border-border"
            >
              <h3 className="text-2xl font-bold text-primary mb-2">50%</h3>
              <p className="text-foreground/80">of Earth's species live in rainforests</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg border border-border"
            >
              <h3 className="text-2xl font-bold text-primary mb-2">30%</h3>
              <p className="text-foreground/80">of global oxygen production</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg border border-border"
            >
              <h3 className="text-2xl font-bold text-primary mb-2">1/5</h3>
              <p className="text-foreground/80">of freshwater sources originate here</p>
            </motion.div>
          </div>
        </section>

        {/* Featured Wildlife */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold text-center mb-12 text-foreground"
            >
              Current Bounties
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {wildlifeSpecies.map((animal, index) => (
                <AnimalCard
                  key={animal.name}
                  {...animal}
                />
              ))}
            </div>
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
                Join Our Conservation Efforts
              </h2>
              <p className="text-foreground/80 mb-8">
                Help us protect these vital ecosystems for future generations
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg"
              >
                Get Involved
              </motion.button>
            </motion.div>
          </div>
        </section>
      </motion.main>
    </div>
  );
}