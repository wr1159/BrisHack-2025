"use client";

import type { ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { baseSepolia } from "wagmi/chains"; // add baseSepolia for testing
import { WagmiProvider, createConfig, http } from "wagmi";
import { coinbaseWallet } from "wagmi/connectors";

const wagmiConfig = createConfig({
    chains: [baseSepolia],
    connectors: [
        coinbaseWallet({
            appName: "onchainkit",
        }),
    ],
    ssr: true,
    transports: {
        [baseSepolia.id]: http(),
    },
});

export function Providers(props: { children: ReactNode }) {
    return (
        <OnchainKitProvider
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            chain={baseSepolia} // add baseSepolia for testing
        >
            <WagmiProvider config={wagmiConfig}>{props.children}</WagmiProvider>
        </OnchainKitProvider>
    );
}
