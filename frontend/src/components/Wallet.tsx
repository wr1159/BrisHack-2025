import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { Address, Avatar, Name, Identity } from "@coinbase/onchainkit/identity";
// import { color } from "@coinbase/onchainkit/theme";

export function WalletComponents() {
    return (
        <div className="flex justify-end text-foreground hover:text-primary transtion-colors">
            <Wallet>
                <ConnectWallet className="bg-primary hover:scale-105 transition-transform hover:bg-primary">
                    <Avatar className="h-6 w-6" />
                    <Name className="font-serif" />
                </ConnectWallet>
                <WalletDropdown className="z-20">
                    <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                        <Avatar />
                        <Name />
                        <Address />
                    </Identity>
                    <WalletDropdownDisconnect />
                </WalletDropdown>
            </Wallet>
        </div>
    );
}
