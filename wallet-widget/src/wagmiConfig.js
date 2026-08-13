import { createConfig, http } from 'wagmi'
import { arbitrum } from 'wagmi/chains'
import { zeroDevWallet } from '@zerodev/wallet-react'

// Client-safe project ID from the ZeroDev dashboard (Project settings).
// This is NOT the team API key — never put that here or in any client code.
const ZERODEV_PROJECT_ID = 'f41031b8-39b0-4ff1-94b5-27da8175f372'

export const wagmiConfig = createConfig({
  chains: [arbitrum],
  connectors: [
    zeroDevWallet({
      projectId: ZERODEV_PROJECT_ID,
      chains: [arbitrum],
    }),
  ],
  transports: {
    [arbitrum.id]: http(),
  },
})
