import { useAccount, useDisconnect } from 'wagmi'
import { useAuthenticateOAuth, OAUTH_PROVIDERS } from '@zerodev/wallet-react'

function shortenAddress(address) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

export function WalletWidget() {
  const { address, status } = useAccount()
  const { disconnect } = useDisconnect()
  const authenticateOAuth = useAuthenticateOAuth()

  if (status === 'connected' && address) {
    return (
      <div className="wallet-chip">
        <span className="wallet-chip-dot" aria-hidden="true"></span>
        <span>{shortenAddress(address)}</span>
        <button
          type="button"
          className="wallet-chip-logout"
          onClick={() => disconnect()}
          aria-label="Log out"
        >
          ×
        </button>
      </div>
    )
  }

  return (
    <div className="wallet-login">
      <button
        type="button"
        className="btn btn-ghost btn-sm"
        onClick={() => authenticateOAuth.mutate({ provider: OAUTH_PROVIDERS.GOOGLE })}
        disabled={authenticateOAuth.isPending}
      >
        {authenticateOAuth.isPending ? 'Logging in…' : 'Log in'}
      </button>
      {authenticateOAuth.isError && (
        <span className="wallet-login-error">Login failed — try again.</span>
      )}
    </div>
  )
}
