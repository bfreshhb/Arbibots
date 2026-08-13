import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from './wagmiConfig.js'
import { WalletWidget } from './WalletWidget.jsx'

const queryClient = new QueryClient()

export function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WalletWidget />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
