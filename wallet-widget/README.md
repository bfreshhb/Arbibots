# Wallet widget (ZeroDev embedded wallet)

Small React app that renders a "Log in" button in the site header. Login
uses [ZeroDev Wallet](https://docs.zerodev.app/) (`@zerodev/wallet-react`)
with Google OAuth — no seed phrase, no browser extension. ZeroDev creates
and manages the wallet behind the login; once logged in, the header shows
the wallet's address and a logout button. Currently identity-only: it
doesn't send transactions.

This is a separate Vite project so the rest of the site can stay a
plain, no-build static site. It builds down to two plain files that get
committed into the main site:

```
js/wallet-widget.js       the whole widget (React, wagmi, viem, ZeroDev SDK — bundled)
js/reflect-metadata.js    a decorator-metadata polyfill one of ZeroDev's dependencies needs
```

## Rebuilding after a change

```bash
cd wallet-widget
npm install
npm run build
```

That writes both files above directly into the main site's `js/`
folder — commit them alongside your source changes.

## Configuration

The ZeroDev **Project ID** (client-safe, fine to commit) lives in
`src/wagmiConfig.js`. Never put the ZeroDev **team API key** (the one
from `api.zerodev.com`, used to manage your account/projects) anywhere
in this folder or in any file the browser loads — it's a management
credential, not a client key, and this whole project ships to the
browser as-is.

## Known gaps / things to verify on a real deploy

- Built and smoke-tested locally (renders, connector initializes, no
  console errors) but the actual Google OAuth round trip couldn't be
  tested end-to-end from the sandbox this was built in — outbound
  requests to ZeroDev's API were network-blocked there. Test the full
  login flow once this is deployed somewhere with normal network access.
- Chain is set to Arbitrum (`wagmi/chains` → `arbitrum`) in
  `wagmiConfig.js`. Confirm Arbitrum is enabled for this project in the
  ZeroDev dashboard.
- Wallet mode defaults to ZeroDev's `'7702'` (EIP-7702-delegated EOA).
  Fine for identity-only; revisit if this grows into sending
  transactions.
