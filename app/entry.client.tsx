import { RemixBrowser } from '@remix-run/react'
import { hydrate } from 'react-dom'
import { hydrateRoot } from 'react-dom/client'

// @ts-ignore
if (window.Cypress) {
  hydrate(<RemixBrowser />, document)
} else {
  hydrateRoot(document, <RemixBrowser />)
}
