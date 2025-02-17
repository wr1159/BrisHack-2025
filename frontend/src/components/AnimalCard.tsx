import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatEther } from "viem";

interface AnimalCardProps {
    name: string;
    prize: bigint;
    description: string;
    image: string;
    link: string;
}

export default function AnimalCard({
    name,
    prize,
    description,
    image,
    link,
}: AnimalCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border) / 0.5)",
            }}
            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
            <Link href={link}>
                <div className="relative h-64 w-full overflow-hidden group">
                    <Image
                        src={image}
                        alt={`Learn more about ${name}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            </Link>
            <div className="p-4" style={{ color: "hsl(var(--foreground))" }}>
                <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: "hsl(var(--primary))" }}
                >
                    {name}
                </h3>
                <p
                    className="text-sm mb-2"
                    style={{ color: "hsl(var(--secondary-foreground))" }}
                >
                    {description}
                </p>
                <p
                    className="text-sm mb-2"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                >
                    {formatEther(prize)} ETH Prize Pool
                </p>
                <Link
                    href={link}
                    className="mt-3 inline-block underline"
                    style={{ color: "hsl(var(--primary))" }}
                >
                    Learn More →
                </Link>
            </div>
        </motion.div>
    );
}
