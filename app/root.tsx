import type { LinksFunction, MetaFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import tailwindStylesheetUrl from './styles/tailwind.css'

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap',
    },
    { rel: 'stylesheet', href: tailwindStylesheetUrl },
    // { rel: 'manifest', href: '/site.webmanifest' },
    // { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    // { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    // { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Willian Fernandes',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
