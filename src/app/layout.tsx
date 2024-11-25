import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import './globals.css'
import { GitHubIcon } from '../components/icons/github'
import { DiscordIcon } from '../components/icons/discord'
import { Metadata } from 'next'
import { getBaseUrl } from '../utils/messages/urls'
import Image from 'next/image'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: 'NodeByte Discord Forums',
    template: '%s | NodeByte Discord Forums',
  },
  description: 'The NodeByte Hub for Hosting Discussions and Community Support!',
  alternates: {
    canonical: getBaseUrl(),
  },
  openGraph: {
    title: {
      default: 'NodeByte Discord Forums',
      template: '%s | Next.js Discord Forum',
    },
    images: "/logo.png",
    description: 'The NodeByte Hub for Hosting Discussions and Community Support!',
    type: 'website',
    url: getBaseUrl(),
    siteName: 'NodeByte Discord Forums',
  },
  twitter: {
    card: 'summary',
    title: 'NodeByte Discord Forums',
    description: 'The NodeByte Hub for Hosting Discussions and Community Support!',
    images: '/banner.png'
  },
}

type RootLayoutProps = { children: ReactNode }

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.className} dark`}>
      <body className="bg-[#111827] text-slate-900 dark:text-white" suppressHydrationWarning>
        <header className="border-b border-neutral-700 bg-gradient-to-tl from-gray-900 via-dark_gray to-black">
          <div className="container max-w-7xl flex mx-auto px-4 py-6 justify-between items-center">
            <h1 aria-hidden="true" className="sr-only">
              NodeByte Hosting
            </h1>

            <Link
              href="/"
              className="hover:opacity-75 text-white hover:no-underline transition-all duration-200 inline-flex items-center space-x-2"
            >
              <Image
                alt="NodeByte Forum Logo"
                src="/logo.png"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold tracking-tighter">
                Discord Forums
              </span>
            </Link>

            <div className="flex space-x-5">
              <Link
                href="https://discord.gg/nodebyte"
                target="_blank"
                rel="noopener"
                aria-label="Discord Server Invite"
                className="hover:opacity-75 text-white transition-all duration-200"
              >
                <DiscordIcon size={7} />
              </Link>

              <Link
                href="https://github.com/NodeByteHosting/discord-forums"
                target="_blank"
                rel="noopener"
                aria-label="Github Repository"
                className="hover:opacity-75 text-white transition-all duration-200"
              >
                <GitHubIcon size={7} />
              </Link>
            </div>
          </div>
        </header>

        {children}

        <Analytics />
      </body>
    </html>
  )
}